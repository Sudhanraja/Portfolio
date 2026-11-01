import type { CSSProperties, FC } from 'react'

export type LightfallProps = {
  colors?: string[]
  backgroundColor?: string
  speed?: number
  streakCount?: number
  streakWidth?: number
  streakLength?: number
  density?: number
  twinkle?: number
  glow?: number
  backgroundGlow?: number
  headGlow?: number
  depth?: number
  bloom?: number
  zoom?: number
  opacity?: number
  mouseInteraction?: boolean
  mouseStrength?: number
  mouseRadius?: number
  mouseDampening?: number
  lens?: number
  holdToWarp?: boolean
  intro?: boolean
  fade?: number
  lightMode?: boolean
  mixBlendMode?: CSSProperties['mixBlendMode']
  paused?: boolean
  dpr?: number
  className?: string
  style?: CSSProperties
}

declare const Lightfall: FC<LightfallProps>
export default Lightfall
