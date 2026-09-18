import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../hooks";
import { useLang } from "../i18n/useLang";

type Variant = "default" | "link" | "view" | "drag";

const SIZES: Record<Variant, number> = {
  default: 26,
  link: 54,
  view: 92,
  drag: 76,
};

export default function Cursor() {
  const { isAr } = useLang();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const magnetic = useRef<HTMLElement | null>(null);
  const variantRef = useRef<Variant>("default");

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const magnet = target.closest<HTMLElement>("[data-magnetic]");
      const previous = magnetic.current;
      if (previous && previous !== magnet) previous.style.transform = "";
      magnetic.current = magnet;

      if (magnet) {
        setVariant("default");
        return;
      }

      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setVariant((labelled.dataset.cursor as Variant) ?? "default");
        return;
      }

      setVariant(target.closest("a, button, input, textarea") ? "link" : "default");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer, visible]);

  useEffect(() => {
    if (!finePointer) return;
    let raf = 0;

    const loop = () => {
      const ringEl = ringRef.current;
      const dotEl = dotRef.current;
      const magnet = magnetic.current;

      // Magnetic elements pull the ring over them and shift themselves slightly.
      const target = { ...pointer.current };
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        target.x = rect.left + rect.width / 2;
        target.y = rect.top + rect.height / 2;
        const dx = (pointer.current.x - target.x) * 0.22;
        const dy = (pointer.current.y - target.y) * 0.22;
        magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      ring.current.x += (target.x - ring.current.x) * (magnet ? 0.35 : 0.18);
      ring.current.y += (target.y - ring.current.y) * (magnet ? 0.35 : 0.18);

      if (ringEl) {
        const size = magnet ? magnet.getBoundingClientRect().width + 22 : SIZES[variantRef.current];
        ringEl.style.width = `${size}px`;
        ringEl.style.height = `${size}px`;
        ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [finePointer]);

  useEffect(() => {
    // Release any element the magnet left behind.
    return () => {
      if (magnetic.current) magnetic.current.style.transform = "";
    };
  }, []);

  if (!finePointer) return null;

  const label = variant === "view" ? (isAr ? "افتح" : "Open") : isAr ? "سحب" : "Drag";

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-ink/45 backdrop-blur-[1px]"
        style={{
          width: SIZES.default,
          height: SIZES.default,
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === "view" || variant === "drag"
              ? "color-mix(in oklab, var(--color-accent) 92%, transparent)"
              : "transparent",
          borderColor:
            variant === "view" || variant === "drag"
              ? "transparent"
              : "color-mix(in oklab, var(--color-ink) 45%, transparent)",
          transition:
            "width .45s var(--ease-expo), height .45s var(--ease-expo), background-color .3s ease, opacity .3s ease, border-color .3s ease",
        }}
      >
        <span
          className="text-[10px] font-medium tracking-[0.14em] text-bg uppercase"
          style={{ opacity: variant === "view" || variant === "drag" ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ opacity: visible && variant !== "view" ? 1 : 0, transition: "opacity .25s ease" }}
      />
    </div>
  );
}
