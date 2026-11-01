import { motion } from 'framer-motion'
import type { ElementType, ReactNode, CSSProperties } from 'react'
import { useMemo } from 'react'

type FadeInProps = {
  children?: ReactNode
  as?: ElementType
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: CSSProperties
  [key: string]: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<ElementType, any>()

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  ...rest
}: FadeInProps) {
  const Component = useMemo(() => {
    if (!cache.has(as)) cache.set(as, motion.create(as as never))
    return cache.get(as)!
  }, [as])

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
