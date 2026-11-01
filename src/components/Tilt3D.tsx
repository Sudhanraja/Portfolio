import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'

// Wraps a card so it tilts toward the pointer in 3D, with a soft glare that
// follows the cursor. Settles back flat when the pointer leaves. Pass the
// card's border radius in `className` so the glare matches its corners.
export default function Tilt3D({
  children,
  max = 6,
  glare = true,
  className = '',
  style,
}: {
  children: ReactNode
  max?: number
  glare?: boolean
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 160, damping: 20 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, [0, 1], [0, 100])
  const gy = useTransform(py, [0, 1], [0, 100])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 55%)`
  const glareOpacity = useSpring(0, spring)

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || e.pointerType === 'touch') return
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    glareOpacity.set(1)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={reduce ? undefined : onMove}
      onPointerLeave={reduce ? undefined : onLeave}
      className={`relative ${className}`}
      style={reduce ? style : { ...style, rotateX, rotateY, transformPerspective: 1200 }}
    >
      {children}
      {glare && !reduce && (
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glareBg, opacity: glareOpacity }} />
      )}
    </motion.div>
  )
}
