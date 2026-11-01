import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Minimal "horizon" backdrop for the hero: the rim of a dark planet rising at
// the bottom, lit by a thin silver-to-magenta edge, a sunrise point with a
// light flare, and a slowly breathing violet glow. On page load two comets of
// light race in from the left and right along the rim; the centre stays dark
// until they meet, then bursts and stays lit.

const ease = [0.22, 1, 0.36, 1] as const

// Size of the planet: wide enough that only a gentle arc shows.
const PLANET = 'max(230vw, 170vh)'
// Where the top of the arc sits, from the top of the hero.
const HORIZON = '66%'
const HORIZON_FRAC = 0.66

// Comet timing (ms): race in, then burst. Plays once per page load.
const TRAVEL = 1500
const BURST = 700
const TAIL = 150 // comet length in px

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Two light comets that follow the curved rim from the screen edges to the
// sunrise point, then a sparkle burst where they meet (once). `onArrive` fires
// as they meet, so the centre can light up. Positions are worked
// out from the planet's real size so the comets sit exactly on the rim.
function RimComets({ onArrive }: { onArrive: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return onArrive()
    const host = hostRef.current
    const left = leftRef.current
    const right = rightRef.current
    const burst = burstRef.current
    if (!host || !left || !right || !burst) return
    let raf = 0
    let arrived = false
    const start = performance.now() + 1800 // wait for the horizon to rise in

    const frame = (now: number) => {
      const w = host.clientWidth
      const h = host.clientHeight
      // Planet radius: half of max(230vw, 170vh).
      const R = Math.max(2.3 * window.innerWidth, 1.7 * window.innerHeight) / 2
      const cx = w / 2
      const top = h * HORIZON_FRAC
      const elapsed = now - start
      const t = elapsed < 0 ? -1 : elapsed
      if (t >= TRAVEL + BURST) {
        // Done: hide everything and stop the loop.
        left.style.opacity = right.style.opacity = burst.style.opacity = '0'
        return
      }
      raf = requestAnimationFrame(frame)
      if (t >= TRAVEL && !arrived) {
        arrived = true
        onArrive()
      }

      if (t >= 0 && t < TRAVEL) {
        const p = easeInOut(t / TRAVEL)
        const dx = (1 - p) * (w / 2 + TAIL) // distance from centre
        const dy = R - Math.sqrt(Math.max(R * R - dx * dx, 0)) // drop along the arc
        const angle = Math.atan2(dx, Math.sqrt(Math.max(R * R - dx * dx, 1))) // rim slope
        const opacity = Math.min(1, p * 2.2)
        left.style.opacity = right.style.opacity = String(opacity)
        // Heads sit on the rim; tails trail back toward the edges.
        left.style.transform = `translate(${cx - dx - TAIL}px, ${top + dy - 1.5}px) rotate(${-angle}rad)`
        right.style.transform = `translate(${cx + dx}px, ${top + dy - 1.5}px) rotate(${angle}rad)`
      } else {
        left.style.opacity = right.style.opacity = '0'
      }

      if (t >= TRAVEL && t < TRAVEL + BURST) {
        const b = (t - TRAVEL) / BURST
        burst.style.opacity = String(1 - b)
        burst.style.transform = `translate(${cx}px, ${top}px) translate(-50%, -50%) scale(${0.4 + b * 1.8})`
      } else {
        burst.style.opacity = '0'
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reduce, onArrive])

  const comet = 'absolute left-0 top-0 h-[3px] rounded-full opacity-0 will-change-transform'
  return (
    <div ref={hostRef} className="absolute inset-0">
      <div
        ref={leftRef}
        className={comet}
        style={{
          width: TAIL,
          transformOrigin: '100% 50%',
          background: 'linear-gradient(90deg, transparent, rgba(209,59,196,0.6) 55%, #fff)',
          boxShadow: '0 0 12px 2px rgba(224,107,214,0.8)',
        }}
      />
      <div
        ref={rightRef}
        className={comet}
        style={{
          width: TAIL,
          transformOrigin: '0% 50%',
          background: 'linear-gradient(270deg, transparent, rgba(209,59,196,0.6) 55%, #fff)',
          boxShadow: '0 0 12px 2px rgba(224,107,214,0.8)',
        }}
      />
      {/* Sparkle burst where the comets meet */}
      <div ref={burstRef} className="absolute left-0 top-0 opacity-0 will-change-transform">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full blur-md" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(224,107,214,0.6) 35%, transparent 70%)' }} />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-40 -translate-x-1/2 -translate-y-1/2" style={{ background: 'linear-gradient(90deg, transparent, #fff, transparent)' }} />
          <div className="absolute left-1/2 top-1/2 h-16 w-[2px] -translate-x-1/2 -translate-y-1/2" style={{ background: 'linear-gradient(180deg, transparent, #fff, transparent)' }} />
        </div>
      </div>
    </div>
  )
}

export default function HeroHorizon({ className = '' }: { className?: string }) {
  // The sunrise glow, flare and bright middle of the rim stay dim until the
  // comets meet, then light up.
  const [lit, setLit] = useState(false)
  const light = (dim: number) => ({ opacity: lit ? 1 : dim, transition: 'opacity 0.9s ease-out' })
  const onArrive = useRef(() => setLit(true)).current

  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {/* Faint dot grid, fading out from the centre */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(215,226,234,0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 75%)',
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.2, ease }}
      >
        {/* Glow above the horizon */}
        <div className="absolute inset-0" style={light(0.25)}>
        <div
          // Centred on the horizon; the planet (drawn after it) hides the lower half.
          className="horizon-breathe absolute left-1/2 h-[80vh] w-[110vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            top: HORIZON,
            background:
              'radial-gradient(ellipse 45% 50% at 50% 50%, rgba(182,0,168,0.28), rgba(118,33,176,0.12) 45%, transparent 72%)',
          }}
        />
        </div>

        {/* The planet */}
        <div
          className="absolute left-1/2 aspect-square -translate-x-1/2 rounded-full"
          style={{
            top: HORIZON,
            width: PLANET,
            background: 'radial-gradient(ellipse 40% 12% at 50% 0%, rgba(209,59,196,0.16), transparent), #0C0C0C',
            boxShadow: '0 -20px 90px -50px rgba(182,0,168,0.45)',
          }}
        >
          {/* Thin lit rim: a horizontal gradient masked down to a 1.5px ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              ...light(0.3),
              background:
                'linear-gradient(90deg, transparent 22%, rgba(215,226,234,0.35) 36%, #D13BC4 47%, #FFFFFF 50%, #D13BC4 53%, rgba(215,226,234,0.35) 64%, transparent 78%)',
              maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
              WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
            }}
          />
        </div>

        {/* Melt the planet into the page so there's no hard edge where the hero ends */}
        <div
          className="absolute inset-x-0 bottom-0 h-[34%]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(12,12,12,0.85) 65%, #0C0C0C)' }}
        />

        {/* Sunrise point and flare where the rim peaks */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: HORIZON, ...light(0) }}>
          <div
            className="horizon-flare h-px w-[44vw]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-3 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
            style={{ background: 'rgba(255,214,246,0.9)' }}
          />
        </div>

        <RimComets onArrive={onArrive} />
      </motion.div>
    </div>
  )
}
