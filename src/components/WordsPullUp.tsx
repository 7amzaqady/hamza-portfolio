import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { CSSProperties } from 'react'

type Props = {
  text: string
  className?: string
  showAsterisk?: boolean
  style?: CSSProperties
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  style,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <h1 ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block overflow-hidden ${showAsterisk && i === words.length - 1 ? 'pr-[0.28em]' : ''}`}
        >
          <motion.span
            className="relative inline-block"
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{
              delay: i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] font-normal leading-none">
                *
              </span>
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
