import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'

type LetterProps = {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

function AnimatedLetter({ char, index, total, progress }: LetterProps) {
  const charProgress = index / total
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  )

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

type Props = {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = '' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = Array.from(text)

  return (
    <p ref={ref} className={`whitespace-pre-wrap ${className}`.trim()}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  )
}
