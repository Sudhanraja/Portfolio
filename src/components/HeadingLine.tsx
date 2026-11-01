import { motion } from 'framer-motion'

// Magenta-to-violet line under a section heading, fading out at both ends.
// It draws out from the centre when scrolled into view. `className` sets the
// spacing around it.
export default function HeadingLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`mx-auto h-[3px] w-[min(70%,760px)] rounded-full bg-[linear-gradient(90deg,transparent,#7621B0_20%,#D13BC4_50%,#7621B0_80%,transparent)] ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
