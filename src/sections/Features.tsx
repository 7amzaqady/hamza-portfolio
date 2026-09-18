import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import canvasPoster from '../assets/canvas-poster.jpg'
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle'

const FEATURES_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

const STORYBOARD_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85'

const CRITIQUES_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85'

const CAPSULE_ICON =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85'

const EASE = [0.22, 1, 0.36, 1] as const

type InfoCard = {
  number: string
  title: string
  icon: string
  items: string[]
}

const INFO_CARDS: InfoCard[] = [
  {
    number: '01',
    title: 'Project Storyboard.',
    icon: STORYBOARD_ICON,
    items: [
      'Build cinematic shot possibility using spatial frameworks',
      'Shot continuity for editorial',
      'Timeline overlay with maps',
      'Match stills to shot purposes',
    ],
  },
  {
    number: '02',
    title: 'Smart Critiques.',
    icon: CRITIQUES_ICON,
    items: [
      'Instant analysis of cuts, tones, and pacing',
      'Surface creative notes and themes automatically',
      'Syncs with Premiere, Frame.io, DaVinci & more',
    ],
  },
  {
    number: '03',
    title: 'Immersion Capsule.',
    icon: CAPSULE_ICON,
    items: [
      'Silences non-urgent calls and alerts anytime',
      'Ambient soundscapes: film scores, rain, desert, cafe',
      'Syncs with calendars & watchfaces',
    ],
  },
]

function FeatureCard({
  children,
  index,
  inView,
}: {
  children: ReactNode
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="h-full min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function InfoFeatureCard({ card }: { card: InfoCard }) {
  return (
    <div className="flex h-full flex-col bg-[#212121] p-5 sm:p-6">
      <img
        src={card.icon}
        alt=""
        className="mb-6 h-10 w-10 rounded object-cover sm:h-12 sm:w-12"
      />

      <div className="mb-5 flex items-start justify-between gap-3">
        <h3 className="text-lg font-normal text-primary sm:text-xl">{card.title}</h3>
        <span className="shrink-0 text-xs text-gray-500 sm:text-sm">{card.number}</span>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
            <span className="text-xs leading-snug text-gray-400 sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="#about"
        className="mt-6 inline-flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-70"
      >
        Learn more
        <ArrowRight className="h-4 w-4" style={{ transform: 'rotate(-45deg)' }} />
      </a>
    </div>
  )
}

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative min-h-screen bg-black px-4 py-16 md:px-6 md:py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex max-w-3xl flex-col sm:mb-14 md:mb-16">
          <WordsPullUpMultiStyle
            wrapperClassName="inline-flex flex-wrap justify-start"
            className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[
              {
                text: 'Studio-grade workflows for visionary creators.',
                className: 'text-primary',
              },
            ]}
          />
          <WordsPullUpMultiStyle
            wrapperClassName="inline-flex flex-wrap justify-start"
            className="mt-1 text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[
              {
                text: 'Built for pure vision. Powered by art.',
                className: 'text-gray-500',
              },
            ]}
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4"
        >
          <FeatureCard index={0} inView={inView}>
            <div className="relative h-full min-h-[320px] overflow-hidden bg-[#212121] lg:min-h-0">
              <img
                src={canvasPoster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={FEATURES_VIDEO}
                poster={canvasPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p
                className="absolute bottom-5 left-5 right-5 text-lg sm:text-xl"
                style={{ color: '#E1E0CC' }}
              >
                Your creative canvas.
              </p>
            </div>
          </FeatureCard>

          {INFO_CARDS.map((card, i) => (
            <FeatureCard key={card.number} index={i + 1} inView={inView}>
              <InfoFeatureCard card={card} />
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
