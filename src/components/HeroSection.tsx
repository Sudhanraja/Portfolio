import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import FadeIn from './FadeIn'
import HeroHorizon from './HeroHorizon'
import Lightfall from './Lightfall/Lightfall'
import RevealHeading from './RevealHeading'
import { HERO_TAGLINE, SHORT_NAME } from '../data/portfolio'

export default function HeroSection() {
  // The big name leans a few degrees toward the mouse, in 3D.
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 70, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-1, 1], [4, -4]), { stiffness: 70, damping: 18 })
  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduce])

  return (
    <section id="home" className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <HeroHorizon className="absolute inset-0 z-0" />
      {/* Streaks of light in the site's magenta/violet palette, falling from a
          soft violet glow at the top of the hero. */}
      <Lightfall
        className="pointer-events-none !absolute inset-0 z-0"
        // Fade the streaks out toward the bottom so they don't end in a hard line.
        style={{
          maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
        }}
        colors={['#D13BC4', '#7621B0', '#F07BE6', '#B600A8']}
        backgroundColor="#7621B0"
        speed={0.3}
        streakCount={2}
        streakWidth={0.8}
        twinkle={0.3}
        backgroundGlow={0.1}
        headGlow={0.6}
        bloom={0.35}
        mouseInteraction
        holdToWarp
        intro
      />
      {/* Space for the fixed navbar */}
      <div className="h-20 shrink-0 sm:h-24" />

      <div className="relative z-10 overflow-hidden">
        <motion.div style={{ rotateX, rotateY, transformPerspective: 1000 }}>
        <RevealHeading
          as="h1"
          onMount
          delay={0.25}
          text={`Hi, i'm ${SHORT_NAME}`}
          letterClass="hero-heading"
          className="mt-6 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-[0.04em] text-[11.5vw] sm:mt-4 md:-mt-5"
        />
        </motion.div>
      </div>

      {/* Tagline as a centred subtitle under the name */}
      <FadeIn
        as="p"
        delay={0.9}
        y={20}
        className="relative z-10 mx-auto mt-4 max-w-[90%] px-6 text-center font-light uppercase leading-relaxed tracking-[0.18em] text-[#D7E2EA]/75 [text-wrap:balance] sm:mt-6 sm:max-w-2xl"
        style={{ fontSize: 'clamp(0.75rem, 1.25vw, 1.1rem)' }}
      >
        {HERO_TAGLINE}
      </FadeIn>

    </section>
  )
}
