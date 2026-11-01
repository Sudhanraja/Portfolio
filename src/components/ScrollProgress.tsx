import { motion, useScroll, useSpring } from 'framer-motion'

// Thin magenta-to-violet bar along the top edge that fills as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #7621B0, #D13BC4 60%, #FFB27A)', boxShadow: '0 0 12px rgba(209,59,196,0.7)' }}
    />
  )
}
