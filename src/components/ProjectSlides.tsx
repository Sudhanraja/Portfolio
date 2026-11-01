import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import FlexCarousel from './FlexCarousel/FlexCarousel'

type Slide = { src: string; caption: string }

export default function ProjectSlides({ title, slides, onClose }: { title: string; slides: Slide[]; onClose: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const items = slides.map((s) => ({ src: s.src, title: s.caption, alt: `${title} — ${s.caption}` }))

  useEffect(() => {
    // The carousel handles arrow keys itself once focused.
    stageRef.current?.querySelector<HTMLElement>('.flex-carousel')?.focus()

    const onKey = (e: KeyboardEvent) => {
      // The carousel prevents default when Escape only closes a zoomed slide.
      if (e.key === 'Escape' && !e.defaultPrevented) onClose()
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 px-4 py-6 backdrop-blur-sm sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="mx-auto mb-2 flex w-full max-w-6xl items-center justify-between text-[#D7E2EA]" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-lg font-medium uppercase sm:text-2xl">{title}</h3>
          <p className="text-sm font-light text-[#D7E2EA]/60">Drag, scroll or use ← → · click a slide to zoom</p>
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="rounded-full border-2 border-[#D7E2EA] p-2 transition-colors hover:bg-[#D7E2EA]/10">
          <X size={22} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center">
        <div
          ref={stageRef}
          className="text-[#D7E2EA]"
          style={{ width: '100%', height: '80vh', maxHeight: '100%', position: 'relative' }}
          onClick={(e) => e.stopPropagation()}
        >
          <FlexCarousel className="!shadow-none" items={items} preset="liquid" intro="rise" cardHeight={0.68} gap={16} squeeze={0.2} focusOnClick captions />
        </div>
      </div>
    </motion.div>
  )
}
