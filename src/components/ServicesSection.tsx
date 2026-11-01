import { motion, type Variants } from 'framer-motion'
import RevealHeading from './RevealHeading'
import HorizonEdge from './HorizonEdge'
import HeadingLine from './HeadingLine'
import { EXPERTISE, SKILLS } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// One expertise row folds up into view in 3D; the divider draws in from the
// left, the number slides in, then the title and description rise.
const row: Variants = {
  hidden: { rotateX: 35, opacity: 0, y: 40 },
  show: { rotateX: 0, opacity: 1, y: 0, transition: { duration: 0.8, ease, staggerChildren: 0.08 } },
}
const line: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease } } }
const num: Variants = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }
const rise: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }

// Skill tags pop in one after another.
const tags: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.025 } } }
const tag: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
}

export default function ServicesSection() {
  return (
    <section id="skills" className="relative z-[5] bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <HorizonEdge color="#FFFFFF" />
      <RevealHeading
        text="Skills"
        className="text-center font-black uppercase leading-none tracking-[0.04em] text-[#0C0C0C]"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />
      <HeadingLine className="mb-16 mt-6 sm:mb-20 sm:mt-8 md:mb-28" />

      <ul className="mx-auto max-w-5xl">
        {EXPERTISE.map((item, i) => (
          <motion.li
            key={item.name}
            className="relative flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{ transformPerspective: 1100, transformOrigin: '50% 0%' }}
            variants={row}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {i > 0 && <motion.span aria-hidden="true" variants={line} className="absolute inset-x-0 top-0 h-px origin-left bg-[#0C0C0C]/15" />}
            <motion.span variants={num} className="w-[1.3em] shrink-0 font-black leading-none tabular-nums text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(i + 1).padStart(2, '0')}
            </motion.span>
            <div className="flex flex-col gap-2 text-[#0C0C0C]">
              <motion.h3 variants={rise} className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {item.name}
              </motion.h3>
              <motion.p variants={rise} className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                {item.description}
              </motion.p>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.ul
        className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-2 sm:mt-20"
        variants={tags}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {[...new Set(SKILLS.flatMap((g) => g.items))].map((s) => (
          <motion.li
            key={s}
            variants={tag}
            whileHover={{ y: -3 }}
            className="cursor-default rounded-full border border-[#0C0C0C]/20 px-4 py-1.5 text-sm font-medium uppercase tracking-wider text-[#0C0C0C]/80 transition-[border-color,box-shadow,color] duration-200 hover:border-[#B600A8]/60 hover:text-[#0C0C0C] hover:shadow-[0_6px_18px_-6px_rgba(182,0,168,0.45)]"
          >
            {s}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
