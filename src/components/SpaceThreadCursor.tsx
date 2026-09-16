import { useEffect, useRef } from "react";

export default function SpaceThreadCursor({
  trail = 26,
  mode = "medium",
}: {
  trail?: number;
  mode?: "light" | "medium" | "strong";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect reduced motion -> disable
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      canvas.style.display = "none";
      return;
    }

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const cfgs = {
      light: { t: 0.35, w: 1.4, blur: 10, a: 0.88 },
      medium: { t: 0.48, w: 1.9, blur: 15, a: 0.95 },
      strong: { t: 0.58, w: 2.6, blur: 22, a: 1 },
    };
    const cfg = cfgs[mode];

    let points: { x: number; y: number }[] = [];
    for (let i = 0; i < trail; i++) points.push({ x: w / 2, y: h / 2 });

    let mx = w / 2,
      my = h / 2,
      pmx = w / 2,
      pmy = h / 2,
      vx = 0,
      vy = 0;

    const onMove = (e: MouseEvent) => {
      pmx = mx;
      pmy = my;
      mx = e.clientX;
      my = e.clientY;
      vx = mx - pmx;
      vy = my - pmy;
    };
    window.addEventListener("mousemove", onMove);

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      dec: number;
      r: number;
    }[] = [];

    let raf = 0;
    let alive = true;

    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);

      points[0].x += (mx - points[0].x) * cfg.t;
      points[0].y += (my - points[0].y) * cfg.t;
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * cfg.t * 0.92;
        points[i].y += (points[i - 1].y - points[i].y) * cfg.t * 0.92;
      }

      const speed = Math.hypot(vx, vy);
      vx *= 0.92;
      vy *= 0.92;

      if (speed > 1.2 && mode !== "light" && Math.random() > 0.4) {
        particles.push({
          x: points[0].x,
          y: points[0].y,
          vx: (Math.random() - 0.5) * speed * 0.12,
          vy: (Math.random() - 0.5) * speed * 0.12,
          life: 1,
          dec: 0.018 + Math.random() * 0.015,
          r: 0.9 + Math.random() * 1.3,
        });
      }

      ctx.clearRect(0, 0, w, h);

      // glow
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = cfg.blur * 1.4;
      ctx.shadowColor = "rgba(137,170,204,0.55)";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const p = points[i],
          n = points[i + 1];
        ctx.quadraticCurveTo(p.x, p.y, (p.x + n.x) / 2, (p.y + n.y) / 2);
      }
      const g1 = ctx.createLinearGradient(
        points[0].x,
        points[0].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );
      g1.addColorStop(0, "rgba(137,170,204,0)");
      g1.addColorStop(0.15, "rgba(137,170,204,0.55)");
      g1.addColorStop(0.5, "rgba(78,133,191,0.35)");
      g1.addColorStop(1, "rgba(78,133,191,0)");
      ctx.strokeStyle = g1;
      ctx.lineWidth = cfg.w * 3.1;
      ctx.globalAlpha = cfg.a * 0.28;
      ctx.stroke();
      ctx.restore();

      // main
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = cfg.blur;
      ctx.shadowColor = "rgba(137,170,204,0.85)";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const p = points[i],
          n = points[i + 1];
        ctx.quadraticCurveTo(p.x, p.y, (p.x + n.x) / 2, (p.y + n.y) / 2);
      }
      const g = ctx.createLinearGradient(
        points[0].x,
        points[0].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );
      g.addColorStop(0, "rgba(255,255,255,0.97)");
      g.addColorStop(0.18, "rgba(137,170,204,1)");
      g.addColorStop(0.55, "rgba(137,170,204,0.8)");
      g.addColorStop(1, "rgba(78,133,191,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = cfg.w;
      ctx.globalAlpha = cfg.a;
      ctx.stroke();

      // head
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, mode === "strong" ? 3.2 : 2.3, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.shadowBlur = 11;
      ctx.shadowColor = "rgba(137,170,204,0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 0.95, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      // particles
      ctx.save();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.dec;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(137,170,204,1)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(137,170,204,0.7)";
        ctx.fill();
      }
      ctx.restore();
    };
    loop();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [trail, mode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        display: "block",
      }}
      className="space-thread-canvas"
    />
  );
}
