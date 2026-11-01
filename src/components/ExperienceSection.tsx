import { motion, useScroll, useSpring, type Variants } from 'framer-motion'
import { useRef } from 'react'
import RevealHeading from './RevealHeading'
import HeadingLine from './HeadingLine'
import HorizonEdge from './HorizonEdge'
import { EXPERIENCE } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const
const job: Variants = {
  hidden: { rotateY: -28, opacity: 0, x: -30 },
  show: { rotateY: 0, opacity: 1, x: 0, transition: { duration: 0.9, ease, staggerChildren: 0.08 } },
}
const rise: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }
const point: Variants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } }
const dot: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 18 } },
}

export default function ExperienceSection() {
  const listRef = useRef<HTMLUListElement>(null)
  // The timeline fills with colour as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="experience" className="relative z-20 bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <HorizonEdge color="#FFFFFF" />
      <RevealHeading
        text="Experience"
        className="text-center font-black uppercase leading-none tracking-[0.04em] text-[#0C0C0C]"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />
      <HeadingLine className="mb-16 mt-6 sm:mb-20 sm:mt-8 md:mb-28" />

      <ul ref={listRef} className="relative mx-auto max-w-5xl pl-8 md:pl-14">
        {/* Timeline track and its scroll-driven fill */}
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-[2px] rounded-full bg-[#0C0C0C]/10 md:left-[11px]" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-0 w-[2px] origin-top rounded-full md:left-[11px]"
          style={{ scaleY: fill, background: 'linear-gradient(180deg, #7621B0, #D13BC4 60%, #FFB27A)' }}
        />

        {EXPERIENCE.map((item, i) => (
          <motion.li
            key={item.company}
            className="relative grid gap-4 py-10 text-[#0C0C0C] md:grid-cols-[1fr_2fr] md:gap-12 md:py-14"
            // Swings in from the left like a door opening
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.12)', transformPerspective: 1300, transformOrigin: '0% 50%' }}
            variants={job}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Timeline dot with a soft pulse */}
            <motion.span
              aria-hidden="true"
              variants={dot}
              className="absolute -left-8 top-12 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#B600A8] bg-white md:-left-14 md:top-16 md:h-6 md:w-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#B600A8] md:h-2 md:w-2" />
              <span className="absolute inset-0 animate-ping rounded-full border border-[#B600A8]/50" style={{ animationDuration: '2.4s' }} />
            </motion.span>

            <div className="flex flex-col gap-1">
              <motion.span variants={rise} className="text-sm font-light uppercase tracking-widest opacity-60">
                {item.period}
              </motion.span>
              <motion.h3 variants={rise} className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.1rem)' }}>
                {item.role}
              </motion.h3>
              <motion.span variants={rise} className="font-light uppercase tracking-wide opacity-80">
                {item.company} · {item.location}
              </motion.span>
            </div>
            <ul className="flex flex-col gap-3">
              {item.points.map((pt) => (
                <motion.li key={pt} variants={point} className="font-light leading-relaxed opacity-70" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
