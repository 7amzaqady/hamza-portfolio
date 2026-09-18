import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export type TextSegment = {
  text: string
  className?: string
}

type Props = {
  segments: TextSegment[]
  className?: string
  wrapperClassName?: string
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  wrapperClassName = 'inline-flex flex-wrap justify-center',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className ?? '' })),
  )

  return (
    <div ref={ref} className={`${wrapperClassName} ${className}`.trim()}>
      {words.map((item, i) => (
        <span key={`${item.word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block pr-[0.28em] ${item.className}`.trim()}
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{
              delay: i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
