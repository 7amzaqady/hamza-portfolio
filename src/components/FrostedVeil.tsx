import { useEffect, useRef } from "react";

type Veil = {
  count: number; // panel count
  blur: number; // blur width
  displacement: number; // per-slat displacement
  glow: number; // seam glow strength
};

type Props = {
  background?: string; // #000000
  baseColor?: string; // #000D16
  accentColor?: string; // #FFBF00
  highlight?: string; // #FFFFFF
  hover?: number; // 0-400
  grain?: number; // 0-200
  vignette?: number; // 0-200
  veil?: Veil;
  speed?: number; // 0-200
  opacity?: number;
};

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function FrostedVeil({
  background = "#000000",
  baseColor = "#000D16",
  accentColor = "#FFBF00",
  highlight = "#FFFFFF",
  hover = 200,
  grain = 100,
  vignette = 100,
  veil = { count: 18, blur: 14, displacement: 28, glow: 18 },
  speed = 100,
  opacity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vertSrc = `
      attribute vec2 a_position;
      void main(){ gl_Position = vec4(a_position,0.0,1.0); }
    `;

    const fragSrc = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_pointer; // 0..1, y flipped already
      uniform float u_time;
      uniform vec3 u_background;
      uniform vec3 u_base;
      uniform vec3 u_accent;
      uniform vec3 u_highlight;
      uniform float u_hover;
      uniform float u_grain;
      uniform float u_vignette;
      uniform float u_speed;
      uniform vec3 u_veil; // x=count, y=blur, z=displacement
      uniform float u_glow;

      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
      }
      float hash1(float p){
        return fract(sin(p*127.1)*43758.5453);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        float a = hash(i);
        float b = hash(i+vec2(1.0,0.0));
        float c = hash(i+vec2(0.0,1.0));
        float d = hash(i+vec2(1.0,1.0));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        vec2 p2 = p;
        for(int i=0;i<5;i++){
          v += a * noise(p2);
          p2 *= 2.03;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 frag = gl_FragCoord.xy;
        vec2 res = u_resolution;
        vec2 uv = frag / res;

        // time drift (slow)
        float t = u_time * u_speed * 0.0009;

        // vertical Gaussian falloff - brightness pools mid-canvas
        float yFall = exp(-pow((uv.y - 0.52)*2.45, 2.0));
        // horizontal also slight
        float xFall = 1.0 - pow(abs(uv.x-0.5)*1.15, 1.8) * 0.22;

        // slat calc
        float count = max(1.0, u_veil.x);
        float slatW = res.x / count;
        float slatId = floor(frag.x / slatW);
        float slatXF = fract(frag.x / slatW); // 0..1 within slat

        // per-slat lateral offset (discontinuity at every seam)
        float displ = u_veil.z * 1.9;
        // hash per slat for random offset
        float off = (hash1(slatId*1.37) - 0.5) * displ;
        // also time based drift of offset slowly
        // off += sin(slatId*0.7 + t*0.3)*2.0;

        // sample position for light field with offset
        vec2 p = vec2(frag.x + off, frag.y) / res;
        // drift light field slowly
        p += vec2(t*0.06, t*0.02);

        // light field: two fbm layers
        float n1 = fbm(p * 2.6);
        float n2 = fbm(p * 4.8 + vec2(1.3, 0.7));
        // combine
        float light = n1*0.58 + n2*0.42;
        // add domain warp for more organic
        // light = fbm(p*2.4 + vec2(light*0.6));

        light *= yFall * xFall;
        // shape light to have cores
        light = pow(light, 0.92);
        // boost
        light = smoothstep(0.18, 0.92, light);

        // base color mix
        vec3 col = mix(u_base, u_accent, smoothstep(0.32, 0.72, light));
        col = mix(col, u_highlight, smoothstep(0.74, 0.96, light) * pow(light,1.2));

        // five-tap horizontal blur per panel (approximate frost diffusion)
        // we fake blur by sampling neighboring light values with offset within slat
        // to keep single pass, we approximate blur amount as mix with neighbor light
        float blurW = u_veil.y * 0.0009; // blur width normalized
        // compute blurred light via weighted samples along x within slat (clamped to slat bounds)
        // we approximate by mixing with a blurred version of light using nearby fbm
        // instead of texture fetch, we re-evaluate fbm at offset positions
        // 5 taps: -2,-1,0,1,2
        vec2 p1 = vec2(frag.x + off - 2.0*blurW*res.x, frag.y)/res + vec2(t*0.06, t*0.02);
        vec2 p2 = vec2(frag.x + off - 1.0*blurW*res.x, frag.y)/res + vec2(t*0.06, t*0.02);
        vec2 p3 = p;
        vec2 p4 = vec2(frag.x + off + 1.0*blurW*res.x, frag.y)/res + vec2(t*0.06, t*0.02);
        vec2 p5 = vec2(frag.x + off + 2.0*blurW*res.x, frag.y)/res + vec2(t*0.06, t*0.02);
        float l1 = fbm(p1*2.6)*0.58 + fbm(p1*4.8+vec2(1.3,0.7))*0.42;
        float l2 = fbm(p2*2.6)*0.58 + fbm(p2*4.8+vec2(1.3,0.7))*0.42;
        float l3 = light;
        float l4 = fbm(p4*2.6)*0.58 + fbm(p4*4.8+vec2(1.3,0.7))*0.42;
        float l5 = fbm(p5*2.6)*0.58 + fbm(p5*4.8+vec2(1.3,0.7))*0.42;
        // apply falloff to each
        l1 *= yFall * xFall; l2 *= yFall * xFall; l4 *= yFall * xFall; l5 *= yFall * xFall;
        l1 = smoothstep(0.18,0.92,pow(l1,0.92));
        l2 = smoothstep(0.18,0.92,pow(l2,0.92));
        l4 = smoothstep(0.18,0.92,pow(l4,0.92));
        l5 = smoothstep(0.18,0.92,pow(l5,0.92));
        float lightBlur = l1*0.10 + l2*0.24 + l3*0.32 + l4*0.24 + l5*0.10;
        vec3 colBlur = mix(u_base, u_accent, smoothstep(0.32,0.72, lightBlur));
        colBlur = mix(colBlur, u_highlight, smoothstep(0.74,0.96, lightBlur)*pow(lightBlur,1.2));

        // pointer clear circle - wipes frost revealing sharp light
        vec2 pointerPx = u_pointer * res;
        // pointer is 0..1 with y 0 bottom? we passed y flipped to 0 bottom, need to convert
        float pd = distance(frag, pointerPx);
        float hoverR = max(1.0, u_hover * 0.85);
        // soft clear: inner sharp, outer soft
        float clear = 1.0 - smoothstep(hoverR*0.55, hoverR*1.05, pd);
        // eased: clear is 0 outside, 1 inside
        // mix frost (blurred) and sharp
        vec3 colFrost = colBlur;
        vec3 colSharp = col;
        vec3 colMixed = mix(colFrost, colSharp, clear * 0.92);

        // slat boundaries: exponential edge glow + darkening toward seam
        float edge = min(slatXF, 1.0 - slatXF); // 0 at seam, 0.5 center
        float seamGlow = exp(-edge * 28.0) * (u_glow * 0.055);
        float seamDark = exp(-edge * 44.0) * 0.38;
        colMixed += seamGlow * u_accent * (0.9 + light*0.6);
        colMixed -= seamDark * (1.0 - clear*0.5);

        // grain - fine flickering noise
        float g = (hash(frag*0.47 + t*1.7) - 0.5) * 2.0;
        colMixed += g * (u_grain * 0.0011);

        // vignette
        vec2 vUv = uv - 0.5;
        vUv *= vec2(1.45, 1.05);
        float vig = dot(vUv, vUv);
        vig = 1.0 - smoothstep(0.35, 1.25, vig) * (u_vignette * 0.0085);
        colMixed *= vig;
        // fade to background at corners
        colMixed = mix(u_background, colMixed, vig);

        // final alpha: premultiplied, but we are opaque background - output opaque
        // For transparent canvas we would use alpha = max channel, but here we want opaque.
        // We keep canvas opaque with background, so alpha 1
        gl_FragColor = vec4(colMixed, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("shader");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error(log || "compile fail");
      }
      return s;
    };

    let program: WebGLProgram | null = null;
    try {
      const vs = compile(gl.VERTEX_SHADER, vertSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      program = gl.createProgram();
      if (!program) throw new Error("program");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "link");
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    } catch (e) {
      console.error("[FrostedVeil] shader", e);
      canvas.style.display = "none";
      return;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uBg = gl.getUniformLocation(program, "u_background");
    const uBase = gl.getUniformLocation(program, "u_base");
    const uAccent = gl.getUniformLocation(program, "u_accent");
    const uHighlight = gl.getUniformLocation(program, "u_highlight");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uGrain = gl.getUniformLocation(program, "u_grain");
    const uVignette = gl.getUniformLocation(program, "u_vignette");
    const uVeil = gl.getUniformLocation(program, "u_veil");
    const uGlow = gl.getUniformLocation(program, "u_glow");
    const uSpeed = gl.getUniformLocation(program, "u_speed");

    const bgRgb = hexToRgb(background);
    const baseRgb = hexToRgb(baseColor);
    const accentRgb = hexToRgb(accentColor);
    const hlRgb = hexToRgb(highlight);

    gl.uniform3f(uBg, bgRgb[0] / 255, bgRgb[1] / 255, bgRgb[2] / 255);
    gl.uniform3f(uBase, baseRgb[0] / 255, baseRgb[1] / 255, baseRgb[2] / 255);
    gl.uniform3f(uAccent, accentRgb[0] / 255, accentRgb[1] / 255, accentRgb[2] / 255);
    gl.uniform3f(uHighlight, hlRgb[0] / 255, hlRgb[1] / 255, hlRgb[2] / 255);
    gl.uniform1f(uHover, hover);
    gl.uniform1f(uGrain, grain);
    gl.uniform1f(uVignette, vignette);
    gl.uniform3f(uVeil, veil.count, veil.blur, veil.displacement);
    gl.uniform1f(uGlow, veil.glow);
    gl.uniform1f(uSpeed, speed);

    let w = window.innerWidth,
      h = window.innerHeight,
      dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer with easing and recentering on leave
    let mx = 0.5,
      my = 0.5,
      ex = 0.5,
      ey = 0.5;
    let hasPointer = false;

    const onMove = (e: PointerEvent) => {
      hasPointer = true;
      mx = e.clientX / w;
      my = 1 - e.clientY / h; // flip to GL 0 bottom
    };
    const onLeave = () => {
      hasPointer = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let running = true;
    let last = performance.now();
    let t = 0;

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1 / 15);
      last = now;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      t += dt * (reduced ? 4 : 60);

      // ease pointer toward target, or toward center when no pointer
      const targetX = hasPointer ? mx : 0.5;
      const targetY = hasPointer ? my : 0.5;
      ex += (targetX - ex) * 0.07;
      ey += (targetY - ey) * 0.07;

      gl.uniform2f(uPointer, ex, ey);
      gl.uniform1f(uTime, t);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const onVis = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        // @ts-ignore
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, [
    background,
    baseColor,
    accentColor,
    highlight,
    hover,
    grain,
    vignette,
    veil.count,
    veil.blur,
    veil.displacement,
    veil.glow,
    speed,
    opacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        display: "block",
        background,
      }}
    />
  );
}
