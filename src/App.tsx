import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Hls from 'hls.js'
import './App.css'

const roles = [
  'Visual Identity Designer',
  'Frontend Developer',
  'Creative Technologist',
]

const TEMP_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = TEMP_HLS
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })
      hls.loadSource(TEMP_HLS)
      hls.attachMedia(video)
    }

    const markReady = () => setReady(true)
    video.addEventListener('canplay', markReady, { once: true })

    const fallback = window.setTimeout(markReady, 2800)

    return () => {
      window.clearTimeout(fallback)
      video.removeEventListener('canplay', markReady)
      hls?.destroy()
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 2400)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!ready || !rootRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.loader', {
        autoAlpha: 0,
        duration: 0.65,
        pointerEvents: 'none',
      })
        .from('.nav-inner', { y: -22, autoAlpha: 0, duration: 0.75 }, '-=0.2')
        .from('.hero-kicker', { y: 18, autoAlpha: 0, duration: 0.55 }, '-=0.35')
        .from(
          '.hero-title-line > span',
          {
            yPercent: 115,
            rotate: 2,
            duration: 1,
            stagger: 0.08,
          },
          '-=0.25',
        )
        .from('.hero-meta', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.scroll-cue', { autoAlpha: 0, duration: 0.6 }, '-=0.25')
    }, rootRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <div ref={rootRef} className="site-shell">
      <div className="loader" aria-hidden={ready}>
        <div className="loader-mark">HQ</div>
        <div className="loader-line" />
        <span>Portfolio / 2026</span>
      </div>

      <nav className="navbar" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Hamza Al-Qadi — home">
            H<span>Q</span>
          </a>

          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="availability" href="mailto:7amzaqady@gmail.com">
            <span className="availability-dot" />
            Available for work
          </a>
        </div>
      </nav>

      <main>
        <section id="top" className="hero-section">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          <div className="hero-wash" />
          <div className="hero-grain" />

          <div className="hero-content">
            <div className="hero-kicker">
              <span>Damascus / Syria</span>
              <span className="kicker-rule" />
              <span>Selected portfolio</span>
            </div>

            <h1 className="hero-title" aria-label="Hamza Ibrahim Al-Qadi">
              <span className="hero-title-line">
                <span>HAMZA</span>
              </span>
              <span className="hero-title-line serif-line">
                <span>AL-QADI</span>
              </span>
            </h1>

            <div className="hero-meta">
              <p className="hero-intro">
                I build visual identities and digital experiences where design,
                code, and motion meet.
              </p>

              <div className="role-block" aria-live="polite">
                <span className="role-label">Currently</span>
                <span key={roles[roleIndex]} className="role-value">
                  {roles[roleIndex]}
                </span>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#work">
            <span>Scroll to explore</span>
            <span className="scroll-line" />
          </a>
        </section>

        <section id="work" className="placeholder-section">
          <span>01 / Selected work</span>
          <h2>Projects come next.</h2>
        </section>

        <section id="about" className="placeholder-section compact">
          <span>02 / About</span>
          <h2>Visual identity × frontend development.</h2>
        </section>

        <section id="contact" className="placeholder-section compact">
          <span>03 / Contact</span>
          <a href="mailto:7amzaqady@gmail.com">7amzaqady@gmail.com</a>
        </section>
      </main>
    </div>
  )
}

export default App
