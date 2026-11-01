import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import RevealHeading from './RevealHeading'
import HeadingLine from './HeadingLine'
import Tilt3D from './Tilt3D'
import HorizonEdge from './HorizonEdge'
import ProjectSlides from './ProjectSlides'
import { LiveProjectButton } from './Buttons'
import { PROJECTS } from '../data/portfolio'

type Project = (typeof PROJECTS)[number]

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  onOpen: () => void
}) {
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const link = project.demo || project.repo

  // Stacking cards: each card pins below the dock (24px lower than the one
  // before) and the next slides up over it. A card taller than the window pins
  // only once its bottom is in view, so every part of every card is seen.
  const wrapRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(96 + index * 24)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setTop(Math.min(96 + index * 24, window.innerHeight - el.offsetHeight - 16))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [index])

  return (
    <div ref={wrapRef} className="sticky mb-[12vh] last:mb-0" style={{ top }}>
      {/* The card tilts toward the pointer in 3D */}
      <Tilt3D max={5} className={`w-full ${radius}`}>
      <motion.article
        className={`relative w-full ${radius} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
        style={{ scale, transformOrigin: 'top center' }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">{project.category}</span>
              <h3 className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2.4rem)' }}>
                {project.title}
              </h3>
              <p className="max-w-md font-light text-[#D7E2EA]/70" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
                {project.tagline} · {project.tech.join(' · ')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.images.length > 0 && (
              <button
                type="button"
                onClick={onOpen}
                className="inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#0C0C0C] transition-opacity duration-200 hover:opacity-85 sm:px-10 sm:py-3.5 sm:text-base"
              >
                View Images
              </button>
            )}
            {link && <LiveProjectButton href={link}>{project.demo ? 'Live Project' : 'View Code'}</LiveProjectButton>}
          </div>
        </div>

        <div className="grid gap-6 border-t border-[#D7E2EA]/15 px-2 pt-6 text-[#D7E2EA] md:grid-cols-2 md:gap-10 md:pt-8">
          <div className="flex flex-col gap-5">
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">The Problem</h4>
              <p className="font-light leading-relaxed text-[#D7E2EA]/80" style={{ fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)' }}>
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">What It Does</h4>
              <p className="font-light leading-relaxed text-[#D7E2EA]/80" style={{ fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)' }}>
                {project.description}
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">Highlights</h4>
            {/* Highlights slide in one by one as the card arrives */}
            <motion.ul
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            >
              {project.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="flex gap-3 font-light leading-relaxed text-[#D7E2EA]/80"
                  style={{ fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)' }}
                >
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E06BD6] shadow-[0_0_8px_rgba(224,107,214,0.9)]" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.article>
      </Tilt3D>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openProject = openIndex === null ? null : PROJECTS[openIndex]

  return (
    <section id="projects" className="relative z-10 bg-[#0C0C0C] px-5 pb-20 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
      <HorizonEdge color="#0C0C0C" />
      <RevealHeading
        text="Projects"
        className="text-center font-black uppercase leading-none tracking-[0.04em]"
        letterClass="hero-heading"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />
      <HeadingLine className="mb-12 mt-6 sm:mb-16 sm:mt-8 md:mb-20" />
      <div ref={containerRef} className="mx-auto max-w-6xl">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} total={PROJECTS.length} progress={scrollYProgress} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>
      {createPortal(
        <AnimatePresence>
          {openProject && <ProjectSlides key={openProject.title} title={openProject.title} slides={openProject.images} onClose={() => setOpenIndex(null)} />}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
