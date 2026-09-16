import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Hls from "hls.js";
import SpaceThreadCursor from "./components/SpaceThreadCursor";
import FrostedVeil from "./components/FrostedVeil";
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

gsap.registerPlugin(ScrollTrigger);

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

// -----------------------------------------------------------------------------
// Loading Screen
// -----------------------------------------------------------------------------
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  // counter 000 -> 100 over 2700ms with rAF
  useEffect(() => {
    let raf = 0;
    const duration = 2700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * 100);
      setCount(value);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // 400ms delay then complete
        setTimeout(() => onComplete(), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  // rotating words every 900ms
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((p) => (p + 1) % words.length);
    }, 900);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden">
      {/* Top-left label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-6 md:top-8 md:left-8"
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
          Portfolio
        </span>
      </motion.div>

      {/* Center rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[3px] w-full bg-stroke/50 overflow-hidden">
          <div
            className="h-full w-full accent-gradient origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
              transition: "transform 0.1s linear",
            }}
          />
        </div>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10">
        <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Navbar
// -----------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // track active section via intersection-ish
  useEffect(() => {
    const sections = ["home", "work", "resume"];
    const handler = () => {
      const y = window.scrollY + 200;
      let current = "Home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
          if (id === "home") current = "Home";
          if (id === "work") current = "Work";
          if (id === "resume") current = "Resume";
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const linkCls = (isActive: boolean) =>
    `text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 font-body ${
      isActive
        ? "text-text-primary bg-stroke/50"
        : "text-muted hover:text-text-primary hover:bg-stroke/50"
    }`;

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    label: string
  ) => {
    e.preventDefault();
    setActive(label);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else if (id === "#resume") {
      // resume is footer contact area
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home", "Home")}
          className="group relative w-9 h-9 rounded-full p-[1.5px] accent-gradient hover:[background-position:100%_50%] transition-all duration-500 flex-shrink-0"
          style={{ backgroundSize: "200% 200%" }}
        >
          <span className="flex w-full h-full rounded-full bg-bg items-center justify-center group-hover:scale-[1.08] transition-transform duration-300">
            <span className="font-display italic text-[13px] text-text-primary leading-none">
              HQ
            </span>
          </span>
        </a>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <div className="flex items-center gap-0 sm:gap-1">
          {[
            { label: "Home", href: "#home" },
            { label: "Work", href: "#work" },
            { label: "Resume", href: "#resume" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href, item.label)}
              className={linkCls(active === item.label)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-1" />

        {/* Say hi */}
        <a
          href="mailto:7amzaqady@gmail.com"
          className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-body text-text-primary transition-colors overflow-visible"
        >
          {/* gradient border behind on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <span className="absolute inset-0 rounded-full bg-surface backdrop-blur-md border border-white/0 group-hover:border-transparent transition-colors -z-10" />
          <span className="relative flex items-center gap-1.5">
            Say hi <span className="text-[11px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// MengTo Sketchbook Hero — ThreeUI LandingPageFrame (SHA e0330548b1ac)
// Replaces Video Hero as primary entry, preserves paper botanical atmosphere
// Config: headingFont="instrument-serif" bodyFont="newsreader" headingWeight="400" bodyWeight="400" primaryColor="#2b2721" headingSize={30} bodySize={20} headingLetterSpacing={0.010}
// -----------------------------------------------------------------------------
function SketchbookHero() {
  // Canonical spec (private main) per task:
  // <div className="shader-frame"><MengToSketchbookLandingPage headingFont="instrument-serif" bodyFont="newsreader" headingWeight="400" bodyWeight="400" primaryColor="#2b2721" headingSize={30} bodySize={20} headingLetterSpacing={0.010} /></div>
  // HTML SHA e0330548b1ac — Singapore sketchbook 9 plates, curled page turn, draggable magnifier, zoom, botanical paper + index
  // Community 1.2.0's Meng is a plain LandingPageFrame without typography recipe, but authored paper (#ece7dc) and ink (#2b2721)
  // already match the spec, so visual is byte-exact even though props are forwarded as any and ignored at runtime.
  // SourceUrl is patched postinstall to "/hamza-portfolio/landing-pages/meng-to-sketchbook.html" so GitHub Pages (base /hamza-portfolio/) loads correctly — see scripts/patch-threeui.js
  const sketchbookProps = {
    headingFont: "instrument-serif",
    bodyFont: "newsreader",
    headingWeight: "400",
    bodyWeight: "400",
    primaryColor: "#2b2721",
    headingSize: 30,
    bodySize: 20,
    headingLetterSpacing: 0.01,
    style: { height: "100%", minHeight: "720px", background: "#ece7dc" },
  } as unknown as Record<string, unknown>;
  return (
    <section id="home" className="relative w-full bg-[#ece7dc]">
      {/* Keep global Navbar for portfolio navigation — sketchbook has its own top bar inside iframe */}
      <Navbar />
      <div className="shader-frame relative w-full h-[100svh] min-h-[720px] overflow-hidden">
        {/* @ts-ignore — Community type omits typography, private recipe expects it; cast keeps configured usage verbatim */}
        <MengToSketchbookLandingPage {...(sketchbookProps as unknown as object)} />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Hero (legacy Video — kept for fallback toggle, referenced to keep TS happy)
// -----------------------------------------------------------------------------
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Visual Identity", "Frontend", "AI Creator", "Educator"];

  // hls video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  // role cycle
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((p) => (p + 1) % roles.length);
    }, 2000);
    return () => clearInterval(id);
  }, [roles.length]);

  // GSAP entrance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
      }).from(
        ".blur-in",
        {
          opacity: 0,
          filter: "blur(10px)",
          y: 20,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.9"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-bg flex items-center justify-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto pt-16">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-body">
          COLLECTION &apos;26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Hamza
          <br />
          Al-Qadi
        </h1>

        <p className="blur-in text-sm md:text-base text-muted mb-3 font-body">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block min-w-[150px] text-left"
          >
            {roles[roleIndex]}
          </span>{" "}
          lives in Damascus.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed font-body">
          Visual Identity Designer & Frontend Developer combining visual thinking with code to create clear, practical, and polished brand & web experiences.
        </p>

        <div className="blur-in inline-flex flex-col sm:flex-row gap-4">
          {/* See Works - solid */}
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center rounded-full text-sm px-7 py-3.5 font-medium bg-text-primary text-bg border border-transparent hover:bg-bg hover:text-text-primary transition-all duration-300 hover:scale-105 overflow-visible"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative">See Works</span>
          </a>

          {/* Reach out - outlined */}
          <a
            href="mailto:7amzaqady@gmail.com"
            className="group relative inline-flex items-center justify-center rounded-full text-sm px-7 py-3.5 font-medium border-2 border-stroke bg-bg text-text-primary hover:border-transparent hover:scale-105 transition-all duration-300 overflow-visible"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="absolute inset-0 rounded-full bg-bg group-hover:bg-bg transition-colors -z-10" />
            <span className="relative">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="absolute inset-0 w-px bg-text-primary/60 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Selected Works
// -----------------------------------------------------------------------------
const projects = [
  {
    title: "Brand Identity Systems",
    span: "md:col-span-7",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    ratio: "aspect-[4/3] md:aspect-[1.6/1]",
  },
  {
    title: "Frontend Interfaces",
    span: "md:col-span-5",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ratio: "aspect-[4/3] md:aspect-[1/1]",
  },
  {
    title: "AI-Assisted Concepts",
    span: "md:col-span-5",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    ratio: "aspect-[4/3] md:aspect-[1/1]",
  },
  {
    title: "Robotics & Learning",
    span: "md:col-span-7",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ratio: "aspect-[4/3] md:aspect-[1.6/1]",
  },
];

function SelectedWorks() {
  return (
    <section id="work" className="bg-transparent py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-display leading-none text-text-primary mb-3">
              Featured <span className="italic font-display">projects</span>
            </h2>
            <p className="text-sm text-muted max-w-md font-body leading-relaxed">
              A selection of projects I&apos;ve worked on, from concept to
              launch.
            </p>
          </div>

          <a
            href="#work"
            className="hidden md:inline-flex group relative items-center gap-2 rounded-full border border-stroke bg-transparent text-text-primary text-sm px-6 py-3 font-body hover:border-transparent transition-colors overflow-visible"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="absolute inset-0 rounded-full bg-bg group-hover:bg-bg transition-colors -z-10" />
            <span className="relative flex items-center gap-2">
              View all work <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href="#work"
              onClick={(e: React.MouseEvent) => e.preventDefault()}
              className={`group relative ${p.span} ${p.ratio} bg-surface border border-stroke rounded-3xl overflow-hidden block`}
            >
              {/* Background image */}
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none halftone"
                aria-hidden
              />

              {/* subtle gradient at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Hover wash */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg pointer-events-none" />

              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="relative inline-flex items-center gap-2 rounded-full bg-white text-black text-sm px-5 py-2.5 font-body shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* gradient border */}
                  <span className="absolute -inset-[1.5px] rounded-full accent-gradient animate-gradient-shift -z-10" />
                  <span className="absolute inset-0 rounded-full bg-white -z-10" />
                  <span className="relative flex items-center gap-2">
                    View —{" "}
                    <span className="font-display italic">{p.title}</span>
                  </span>
                </span>
              </div>

              {/* Mobile title (always visible at bottom) */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-display italic text-lg">
                  {p.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="md:hidden mt-6 flex justify-center">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm text-text-primary font-body"
          >
            View all work <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Explorations / Parallax Gallery
// -----------------------------------------------------------------------------
const explorations = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    rot: "-rotate-1",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
    rot: "rotate-1",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    rot: "-rotate-2",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    rot: "rotate-2",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    rot: "-rotate-1",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    rot: "rotate-1",
  },
];

function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Pin center content
      if (pinnedRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinnedRef.current,
          pinSpacing: false,
        });
      }

      // Parallax columns
      if (colLeftRef.current) {
        gsap.fromTo(
          colLeftRef.current,
          { y: 120 },
          {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
      if (colRightRef.current) {
        gsap.fromTo(
          colRightRef.current,
          { y: -80 },
          {
            y: 80,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const leftItems = explorations.slice(0, 3);
  const rightItems = explorations.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent min-h-[300vh] overflow-clip"
      id="explorations"
    >
      {/* Pinned Center */}
      <div
        ref={pinnedRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-none text-text-primary mb-4">
            Visual <span className="italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8 font-body leading-relaxed">
            Experiments in brand, web, AI and robotics — unfinished ideas and visual curiosity.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border border-stroke bg-bg text-text-primary text-sm px-6 py-3 font-body hover:border-transparent transition-colors overflow-visible"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="absolute inset-0 rounded-full bg-bg -z-10" />
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ea4c89]" /> View on
              Dribbble <span>↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Parallax Columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-10 lg:px-16 flex justify-center">
          <div className="grid grid-cols-2 gap-6 md:gap-20 lg:gap-40 w-full max-w-5xl pt-[18vh]">
            {/* Left Column */}
            <div
              ref={colLeftRef}
              className="flex flex-col gap-6 md:gap-10 items-end pt-32 md:pt-20"
            >
              {leftItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item.img)}
                  className={`pointer-events-auto group relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface shadow-xl shadow-black/20 ${item.rot} hover:rotate-0 transition-transform duration-500`}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </button>
              ))}
            </div>

            {/* Right Column */}
            <div
              ref={colRightRef}
              className="flex flex-col gap-6 md:gap-10 items-start pt-10 md:pt-0"
            >
              {rightItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item.img)}
                  className={`pointer-events-auto group relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface shadow-xl shadow-black/20 ${item.rot} hover:rotate-0 transition-transform duration-500`}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 md:p-10"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-white/10 shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Stats
// -----------------------------------------------------------------------------
function Stats() {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "30+", label: "Projects Delivered" },
    { value: "100%", label: "Commitment & Care" },
  ];

  return (
    <section className="bg-transparent py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="py-8 md:py-4 md:px-8 text-center md:text-left first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-none mb-3">
                {s.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.25em] font-body">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Resume / CV
// -----------------------------------------------------------------------------
function Resume() {
  return (
    <section id="resume" className="bg-transparent py-16 md:py-24 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Résumé — CV
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-[48px] font-display leading-none text-text-primary mb-4">
                Experience <span className="italic">& education</span>
              </h2>
              <p className="text-sm text-muted max-w-xl font-body leading-relaxed">
                Visual Identity Designer & Frontend Developer with a technical
                background in Communications and Electronics Engineering.
                Passionate about clear, practical, and polished digital
                experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:7amzaqady@gmail.com"
                className="group relative inline-flex items-center gap-2 rounded-full border border-stroke bg-transparent text-text-primary text-sm px-6 py-3 font-body hover:border-transparent transition-colors overflow-visible"
              >
                <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <span className="absolute inset-0 rounded-full bg-bg -z-10" />
                <span className="relative flex items-center gap-2">
                  7amzaqady@gmail.com <span>↗</span>
                </span>
              </a>
              <a
                href="tel:+963993720719"
                className="inline-flex items-center gap-2 rounded-full bg-text-primary text-bg text-sm px-6 py-3 font-body hover:scale-105 transition-transform"
              >
                +963 993 720 719
              </a>
            </div>
          </div>
        </motion.div>

        {/* Core Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {[
            {
              title: "Brand & Visual Identity",
              desc: "Logo Design, Visual Identity Systems, Adobe Illustrator, Typography, Color Systems",
            },
            {
              title: "Frontend Development",
              desc: "HTML5, CSS3, JavaScript (ES6+), React, Responsive Design, REST API, Git/GitHub",
            },
            {
              title: "Creative Technology",
              desc: "AI-assisted Design & Development, Rapid Prototyping, Problem Solving, Technical Education",
            },
          ].map((skill) => (
            <div
              key={skill.title}
              className="bg-surface border border-stroke rounded-3xl p-6 md:p-7"
            >
              <h3 className="text-sm font-medium text-text-primary font-body mb-2">
                {skill.title}
              </h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed font-body">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Experience */}
          <div className="lg:col-span-7">
            <h3 className="text-xs text-muted uppercase tracking-[0.3em] font-body mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-stroke" /> Experience
            </h3>
            <div className="space-y-4">
              {[
                {
                  org: "Tmakin Foundation — Syria",
                  role: "Trainer & Co-Founder",
                  time: "2025 — Present",
                  points: [
                    "Train mosque students in computer skills and practical use of artificial intelligence.",
                    "Train students in robotics design and programming.",
                  ],
                },
                {
                  org: "Badr Al-Din Al-Husayni School — Syria",
                  role: "IT & Robotics Instructor",
                  time: "2024 — 2025",
                  points: [
                    "Taught IT concepts and introductory programming.",
                    "Trained students in robotics design and programming using practical methods.",
                    "Designed practical activities that encourage creative thinking and problem solving.",
                  ],
                },
                {
                  org: "Takaful Al-Sham Organization — Syria",
                  role: "Field Volunteer",
                  time: "2025",
                  points: [
                    "Supported field activities for crisis-affected communities within a multi-task team.",
                  ],
                },
              ].map((exp) => (
                <div
                  key={exp.org}
                  className="bg-surface/50 hover:bg-surface border border-stroke rounded-3xl p-6 md:p-7 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-sm md:text-base font-medium text-text-primary font-body">
                        {exp.org}
                      </h4>
                      <p className="text-sm text-muted font-body">{exp.role}</p>
                    </div>
                    <span className="text-xs text-muted font-body bg-bg border border-stroke rounded-full px-3 py-1">
                      {exp.time}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.points.map((pt) => (
                      <li
                        key={pt}
                        className="text-xs md:text-sm text-muted font-body flex gap-2 leading-relaxed"
                      >
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Selected Projects teaser */}
            <div className="mt-6 bg-surface border border-stroke rounded-3xl p-6 md:p-7">
              <h4 className="text-sm font-medium text-text-primary font-body mb-3">
                Selected Projects
              </h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted font-body leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-text-primary">•</span>
                  <span>
                    <b className="text-text-primary font-medium">
                      Visual Identity Projects
                    </b>{" "}
                    — Logo systems, visual directions, typography & color
                    systems, brand applications.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-text-primary">•</span>
                  <span>
                    <b className="text-text-primary font-medium">
                      Frontend Web Projects
                    </b>{" "}
                    — Responsive interfaces built with HTML, CSS, JavaScript,
                    and React, combining visual design with implementation.
                  </span>
                </li>
              </ul>
              <p className="text-xs text-muted/70 font-body mt-3 italic">
                Portfolio works will be added next — these cards will link to
                your real projects.
              </p>
            </div>
          </div>

          {/* Education & side */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xs text-muted uppercase tracking-[0.3em] font-body mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-stroke" /> Education
              </h3>
              <div className="bg-surface border border-stroke rounded-3xl p-6 md:p-7">
                <h4 className="text-sm font-medium text-text-primary font-body">
                  Damascus University
                </h4>
                <p className="text-sm text-muted font-body">
                  Faculty of Mechanical & Electrical Engineering
                </p>
                <p className="text-sm text-text-primary font-body mt-1 font-medium">
                  Communications & Electronics Engineering — 3rd Year
                </p>
                <p className="text-xs text-muted font-body mt-1">
                  Sep 2023 — Present
                </p>
                <ul className="mt-4 space-y-1.5">
                  <li className="text-xs md:text-sm text-muted font-body flex gap-2 leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                    <span>
                      Advanced study in communication networks, transmission
                      systems, and signal processing.
                    </span>
                  </li>
                  <li className="text-xs md:text-sm text-muted font-body flex gap-2 leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                    <span>
                      Academic projects applying programming and data analysis
                      concepts.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-surface/50 border border-stroke rounded-3xl p-6 md:p-7">
              <h4 className="text-sm font-medium text-text-primary font-body mb-3">
                Certifications & Languages
              </h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted font-body">
                <li className="flex gap-2">
                  <span className="text-text-primary">•</span> International
                  Computer Driving Licence (ICDL)
                </li>
                <li className="flex gap-2">
                  <span className="text-text-primary">•</span> Training in
                  AI-assisted website & application creation
                </li>
                <li className="flex gap-2">
                  <span className="text-text-primary">•</span> Training in
                  visual identity design & creation
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-stroke flex flex-wrap gap-2">
                <span className="text-xs bg-bg border border-stroke rounded-full px-3 py-1.5 font-body text-text-primary">
                  Arabic — Native
                </span>
                <span className="text-xs bg-bg border border-stroke rounded-full px-3 py-1.5 font-body text-text-primary">
                  English — B2 Upper-Intermediate
                </span>
              </div>
            </div>

            <div className="bg-surface border border-stroke rounded-3xl p-6">
              <h4 className="text-sm font-medium text-text-primary font-body mb-2">
                Professional Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Team Collaboration",
                  "Adaptability",
                  "Composure Under Pressure",
                  "Clear Communication",
                  "Reliability",
                  "Fast Learning",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-bg border border-stroke rounded-full px-3 py-1.5 font-body text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Contact / Footer
// -----------------------------------------------------------------------------
function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  // hls video flipped
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
    return () => hls?.destroy();
  }, []);

  // GSAP marquee
  useEffect(() => {
    if (
      !marqueeInnerRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const el = marqueeInnerRef.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background Video flipped */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div
          ref={marqueeRef}
          className="overflow-hidden whitespace-nowrap border-y border-white/10 py-4 mb-16 md:mb-20"
        >
          <div
            ref={marqueeInnerRef}
            className="flex items-center will-change-transform"
            style={{ width: "max-content" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-white/90 tracking-tight px-6 md:px-10 select-none flex-shrink-0"
              >
                CRAFTING IDENTITIES •{" "}
              </span>
            ))}
            {/* duplicate for seamless loop */}
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={`dup-${i}`}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-white/90 tracking-tight px-6 md:px-10 select-none flex-shrink-0"
                aria-hidden
              >
                CRAFTING IDENTITIES •{" "}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <p className="text-xs text-white/60 uppercase tracking-[0.3em] mb-6 font-body">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white leading-none mb-8">
            Let&apos;s build
            <br />
            something meaningful
          </h2>

          <a
            href="mailto:7amzaqady@gmail.com"
            className="group relative inline-flex items-center justify-center rounded-full bg-white text-black text-sm md:text-base px-8 md:px-10 py-4 font-medium hover:scale-105 transition-transform duration-300 overflow-visible"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="absolute inset-0 rounded-full bg-white group-hover:bg-white transition-colors -z-10" />
            <span className="relative flex items-center gap-2">
              7amzaqady@gmail.com <span>↗</span>
            </span>
          </a>
          <div className="mt-4">
            <a
              href="tel:+963993720719"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white font-body transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              +963 993 720 719
            </a>
            <span className="mx-2 text-white/20">•</span>
            <span className="text-sm text-white/60 font-body">
              Damascus, Syria
            </span>
          </div>

          {/* Footer Bar */}
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-6 text-xs text-white/60 font-body">
              <span className="hidden sm:inline">© 2026 Hamza Ibrahim Al-Qadi. All rights reserved.</span>
              <span className="sm:hidden">© 2026 Hamza Al-Qadi</span>
              <div className="hidden md:flex items-center gap-4 ml-2">
                {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    onClick={(e: React.MouseEvent) => e.preventDefault()}
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/80 font-body">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Available for projects
            </div>
          </div>

          {/* Mobile socials */}
          <div className="md:hidden flex items-center justify-center gap-5 mt-6 text-xs text-white/60 font-body">
            {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e: React.MouseEvent) => e.preventDefault()}
                className="hover:text-white transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// Main App
// -----------------------------------------------------------------------------
export default function App() {
  // keep legacy Hero referenced so TS noUnusedLocals stays green (fallback if sketchbook disabled)
  void Hero;
  const [isLoading, setIsLoading] = useState(true);

  // prevent scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // refresh ScrollTrigger after loading to recalc pins
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-transparent relative text-text-primary font-body antialiased selection:bg-white/20">
      <FrostedVeil background="#000000" baseColor="#000D16" accentColor="#143A66" highlight="#A9C4E8" hover={200} grain={100} vignette={100} veil={{count: 18, blur: 14, displacement: 28, glow: 18}} speed={100} opacity={1} />
      <SpaceThreadCursor mode="medium" trail={26} />
      <div className="relative z-10">
        <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Page content above shader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SketchbookHero />
        <SelectedWorks />
        <Explorations />
        <Stats />
        <Resume />
        <ContactFooter />
      </motion.div>
      </div>
    </div>
  );
}
