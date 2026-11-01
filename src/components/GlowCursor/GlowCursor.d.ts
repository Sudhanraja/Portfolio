import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'

export type GlowCursorProps = {
  color?: string
  secondaryColor?: string
  intensity?: number
  trailWidth?: number
  linger?: number
  glow?: number
  hotspot?: number
  followSpeed?: number
  grain?: number
  clickBurst?: boolean
  quality?: 'low' | 'medium' | 'high'
  theme?: 'dark' | 'light'
  blendMode?: string
  maxDevicePixelRatio?: number
  enabled?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'children' | 'className' | 'style'>

declare const GlowCursor: FC<GlowCursorProps>
export default GlowCursor
