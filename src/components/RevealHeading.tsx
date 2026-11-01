import { motion, type Variants } from 'framer-motion'
import type { CSSProperties, ElementType } from 'react'

// Big section heading that reveals letter by letter: each letter flips up into
// place in 3D (hinged at its base), staggered left to right. Plays when scrolled into
// view, or on mount with `onMount` (for the hero). `letterClass` is applied to
// every letter (e.g. the gradient `hero-heading`, which must sit on the
// letters themselves because they're transformed individually).

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.035, delayChildren: delay } }),
}

const letter: Variants = {
  hidden: { rotateX: -95, y: '35%', opacity: 0 },
  show: { rotateX: 0, y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function RevealHeading({
  text,
  as = 'h2',
  className = '',
  letterClass = '',
  accentWords = [],
  style,
  delay = 0,
  onMount = false,
}: {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  letterClass?: string
  /** Words drawn in the accent gradient instead of `letterClass` (e.g. "me"). */
  accentWords?: string[]
  style?: CSSProperties
  delay?: number
  onMount?: boolean
}) {
  const Tag = (as === 'h1' ? motion.h1 : motion.h2) as ElementType
  const words = text.split(' ')
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } }

  return (
    <Tag className={className} style={style} aria-label={text} initial="hidden" custom={delay} variants={container} {...trigger}>
      {words.map((word, wi) => {
        const accent = accentWords.some((w) => w.toLowerCase() === word.toLowerCase())
        return (
        // Each word is a mask so its letters rise from below the baseline.
        <span key={wi} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              variants={letter}
              className={`inline-block ${accent ? 'accent-heading' : letterClass}`}
              style={{ transformPerspective: 700, transformOrigin: '50% 100%' }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
        )
      })}
    </Tag>
  )
}
