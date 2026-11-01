import { useId } from 'react'

// Curved "horizon" top edge for a section, echoing the planet rim in the hero:
// a gentle arc in the section's own colour rising into the section above, with
// a crisp magenta rim (brightest in the middle) and a soft glow along it.
// Place it as the first child of a `relative` section.

// Peaks at the top centre and meets the section's top edge at both sides.
const ARC = 'M0 100 Q500 -100 1000 100'

function RimGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.12" stopColor="#D7E2EA" stopOpacity="0" />
      <stop offset="0.32" stopColor="#D7E2EA" stopOpacity="0.4" />
      <stop offset="0.45" stopColor="#D13BC4" />
      <stop offset="0.5" stopColor="#F07BE6" />
      <stop offset="0.55" stopColor="#D13BC4" />
      <stop offset="0.68" stopColor="#D7E2EA" stopOpacity="0.4" />
      <stop offset="0.88" stopColor="#D7E2EA" stopOpacity="0" />
    </linearGradient>
  )
}

export default function HorizonEdge({ color }: { color: string }) {
  const id = useId().replace(/:/g, '')
  const svg = 'absolute inset-0 h-full w-full overflow-visible'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-10 -translate-y-full sm:h-14 md:h-16">
      {/* Soft glow: a thick, blurred copy of the rim */}
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className={svg} style={{ filter: 'blur(10px)', opacity: 0.8 }}>
        <defs>
          <RimGradient id={`g-${id}`} />
        </defs>
        <path d={ARC} fill="none" stroke={`url(#g-${id})`} strokeWidth="10" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* The arc in the section's colour, with a crisp rim on top */}
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className={svg}>
        <defs>
          <RimGradient id={`r-${id}`} />
        </defs>
        <path d={`${ARC} Z`} fill={color} />
        <path d={ARC} fill="none" stroke={`url(#r-${id})`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
