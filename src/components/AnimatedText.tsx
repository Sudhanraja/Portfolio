import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

// Character-by-character scroll reveal: each char fades 0.2 → 1 as the
// paragraph scrolls from 80% to 20% of the viewport.
export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const words = text.split(' ')
  const total = text.length
  let index = 0

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const chars = (word + (wi < words.length - 1 ? ' ' : '')).split('')
        return (
          <span key={wi} className="inline-block whitespace-pre" aria-hidden="true">
            {chars.map((c, ci) => {
              const start = index / total
              const end = start + 1 / total
              index++
              return <Char key={ci} char={c} progress={scrollYProgress} range={[start, end]} />
            })}
          </span>
        )
      })}
    </p>
  )
}
