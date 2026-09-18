import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import heroPoster from '../assets/hero-poster.jpg'
import WordsPullUp from '../components/WordsPullUp'

const NAV_ITEMS = [
  { label: 'Our story', href: '#about' },
  { label: 'Collective', href: '#features' },
  { label: 'Workshops', href: '#features' },
  { label: 'Programs', href: '#features' },
  { label: 'Inquiries', href: '#about' },
] as const

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true })

  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <img
          src={heroPoster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E1E0CC'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          ref={contentRef}
          className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 sm:px-8 sm:pb-8 md:px-10 md:pb-10 lg:px-12 lg:pb-12"
        >
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <WordsPullUp
                text="Prisma"
                showAsterisk
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-start gap-5 md:col-span-4 md:gap-6 md:pb-2">
              <motion.p
                className="max-w-md text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and
                storytellers bound not by place, status or labels but by passion
                and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:pl-6 sm:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              >
                Join the lab
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
