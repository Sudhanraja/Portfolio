import { useEffect, useId, useRef, useState } from 'react'

// Friendly robot mascot for the AI assistant, drawn in SVG in the site
// palette. Its eyes follow the mouse and it blinks every few seconds.
// variant "full" shows head and shoulders; "head" is for small spots like the
// chat button. With `wave`, the full robot raises its right hand and waves.

// A humanoid robot arm hanging from the shoulder at (34, 180): glossy white
// silver armour plates over dark exposed mechanics, like an industrial humanoid
// robot: an armoured shoulder with a glowing bolt, a ribbed upper arm with a
// piston, a gear elbow, a plated forearm and a skeletal hand with silver tips (palm, four two-segment fingers and a
// thumb). `waving` raises it from the shoulder and rocks the hand at the
// wrist. `mirrored` flips it to the other side of the body.
const FINGERS = [
  { x: 28.6, angle: 9, tip: 3.6 },
  { x: 32.2, angle: 3, tip: 4.8 },
  { x: 35.8, angle: -3, tip: 5.2 },
  { x: 39.4, angle: -9, tip: 4.4 },
]

function Arm({ shell, glow, waving = false, mirrored = false }: { shell: string; glow: string; waving?: boolean; mirrored?: boolean }) {
  const metal = { fill: shell, stroke: '#b3bec8', strokeWidth: 0.7 }
  const joint = '#2b2e35'
  return (
    <g transform={mirrored ? 'translate(200 0) scale(-1 1)' : undefined}>
      <g className={waving ? 'mascot-wave' : undefined}>
        {/* Shoulder: mechanics under a curved armour plate with a glowing bolt */}
        <circle cx="34" cy="187" r="10" fill={joint} />
        <path d="M18 186 Q17 174 27 170 L41 170 Q51 174 50 186 L46 190 L22 190 Z" fill={shell} stroke="#9aa5af" strokeWidth="0.8" />
        <path d="M22 183 Q23.5 175.5 30 173" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="34" cy="181" r="3.2" fill="#1c1a24" stroke="#9aa5af" strokeWidth="0.8" />
        <circle cx="34" cy="181" r="1.6" fill="#D13BC4" filter={glow} />
        {/* Upper arm: dark ribbed core, an outer side plate and a piston rod */}
        <rect x="28" y="189" width="12" height="12" rx="2" fill={joint} />
        {[192, 195, 198].map((y) => (
          <line key={y} x1="28.6" y1={y} x2="39.4" y2={y} stroke="#4a505a" strokeWidth="0.8" />
        ))}
        <path d="M22.5 190 L28.5 190 L29 200.5 L24.5 200.5 Q22 196 22.5 190 Z" fill={shell} stroke="#9aa5af" strokeWidth="0.7" />
        <line x1="37.6" y1="190" x2="37.6" y2="200" stroke="#9aa5af" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="36.2" y="189.2" width="2.8" height="2.2" rx="0.6" fill="#c4cdd5" />
        {/* Elbow: dark toothed gear with a silver hub and a glowing centre */}
        <circle cx="34" cy="204" r="7.6" fill="none" stroke={joint} strokeWidth="3" strokeDasharray="2.2 1.4" />
        <circle cx="34" cy="204" r="5.4" fill={joint} />
        <circle cx="34" cy="204" r="3.4" fill="#9aa5af" stroke="#6b737d" strokeWidth="0.6" />
        <circle cx="34" cy="204" r="1.4" fill="#D13BC4" filter={glow} />
        {/* Forearm: long tapered armour plate, dark mechanics showing on the inner side */}
        <rect x="26" y="208" width="16" height="15" rx="3" fill={joint} />
        <path d="M23.5 210 Q24 207 27 207 L39 207 Q41.5 207.5 41 210.5 L38.5 221 Q38 222.5 36.5 222.5 L28.5 222.5 Q26.5 222.5 26 220.5 Z" fill={shell} stroke="#9aa5af" strokeWidth="0.7" />
        <path d="M25.6 211 L27.4 220" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" strokeLinecap="round" />
        {/* Wrist: dark mechanism with a small bolt */}
        <rect x="29.5" y="221.5" width="9" height="6" rx="1.5" fill={joint} />
        <circle cx="34" cy="224.5" r="1.3" fill="#9aa5af" />
        <g className={waving ? 'mascot-hand' : undefined}>
          <g transform="translate(34 227) scale(1.25) translate(-34 -222)">
          {/* Fingers: dark skeletal segment, then a silver fingertip */}
          {FINGERS.map((f) => (
            <g key={f.x} transform={`rotate(${f.angle} ${f.x} 233)`}>
              <rect x={f.x - 1.4} y="233.6" width="2.8" height="4.6" rx="1.2" fill={joint} stroke="#4a505a" strokeWidth="0.5" />
              <rect x={f.x - 1.6} y="238.8" width="3.2" height={f.tip} rx="1.6" {...metal} />
            </g>
          ))}
          {/* Thumb */}
          <g transform="rotate(-50 41 226)">
            <rect x="39.8" y="226" width="2.8" height="4.6" rx="1.2" fill={joint} stroke="#4a505a" strokeWidth="0.5" />
            <rect x="39.6" y="231.2" width="3.2" height="4" rx="1.6" {...metal} />
          </g>
          {/* Palm */}
          <path d="M29 223 h10 q2.2 0 2.4 2 l0.6 6.5 q0.2 2 -1.8 2 h-12.4 q-2 0 -1.8 -2 l0.6 -6.5 q0.2 -2 2.4 -2 z" fill={joint} stroke="#4a505a" strokeWidth="0.6" />
          <rect x="29.5" y="224" width="9" height="6" rx="2" {...metal} />
          </g>
        </g>
      </g>
    </g>
  )
}

export default function RobotMascot({
  variant = 'full',
  wave = false,
  className = '',
}: {
  variant?: 'full' | 'head'
  wave?: boolean
  className?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height * 0.4)
      const d = Math.hypot(dx, dy) || 1
      const reach = Math.min(1, d / 300)
      setLook({ x: (dx / d) * 7 * reach, y: (dy / d) * 5 * reach })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const full = variant === 'full'
  const g = (name: string) => `${name}-${id}`

  return (
    <svg ref={ref} viewBox={full ? '0 0 200 258' : '18 6 164 154'} className={`block overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={g('shell')} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#dfe6ec" />
          <stop offset="1" stopColor="#9aa5af" />
        </linearGradient>
        <linearGradient id={g('visor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1424" />
          <stop offset="1" stopColor="#07070b" />
        </linearGradient>
        <radialGradient id={g('eye')} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#ffe1fb" />
          <stop offset="0.45" stopColor="#F07BE6" />
          <stop offset="1" stopColor="#9B3BD6" />
        </radialGradient>
        <filter id={g('glow')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {full && (
        <g>
          {/* Arms: the robot's right arm (viewer's left) is the one that waves */}
          <Arm shell={`url(#${g('shell')})`} glow={`url(#${g('glow')})`} waving={wave} />
          <Arm shell={`url(#${g('shell')})`} glow={`url(#${g('glow')})`} mirrored />
          {/* Body */}
          <path d="M44 258 V196 a36 36 0 0 1 36 -36 h40 a36 36 0 0 1 36 36 V258 Z" fill={`url(#${g('shell')})`} />
          <path d="M60 176 a26 22 0 0 1 30 -12" stroke="#fff" strokeOpacity="0.7" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Chest emblem */}
          <g filter={`url(#${g('glow')})`}>
            <text x="100" y="205" textAnchor="middle" fontSize="20" fontWeight="800" fill="#E06BD6">
              {'</>'}
            </text>
          </g>
          {/* Neck with a glowing ring */}
          <rect x="82" y="146" width="36" height="16" rx="6" fill="#16141c" />
          <rect x="82" y="152" width="36" height="3" rx="1.5" fill="#D13BC4" filter={`url(#${g('glow')})`} />
        </g>
      )}

      {/* Antenna */}
      <line x1="100" y1="38" x2="100" y2="16" stroke="#c4cdd5" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="13" r="7" fill="#D13BC4" className="mascot-antenna" filter={`url(#${g('glow')})`} />

      {/* Ear pods */}
      <circle cx="30" cy="94" r="15" fill="#16141c" stroke="#7621B0" strokeWidth="3" />
      <circle cx="170" cy="94" r="15" fill="#16141c" stroke="#7621B0" strokeWidth="3" />

      {/* Head shell and highlight */}
      <rect x="32" y="36" width="136" height="116" rx="50" fill={`url(#${g('shell')})`} />
      <ellipse cx="72" cy="56" rx="26" ry="10" fill="#fff" opacity="0.75" transform="rotate(-18 72 56)" />

      {/* Visor */}
      <rect x="48" y="66" width="104" height="64" rx="30" fill={`url(#${g('visor')})`} stroke="#2c2836" strokeWidth="2" />
      <path d="M62 74 h56" stroke="#fff" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" />

      {/* Eyes: follow the mouse, blink every few seconds */}
      <g transform={`translate(${look.x} ${look.y})`} style={{ transition: 'transform 120ms ease-out' }}>
        <g className="mascot-blink" filter={`url(#${g('glow')})`}>
          <ellipse cx="80" cy="98" rx="10" ry="13" fill={`url(#${g('eye')})`} />
          <ellipse cx="120" cy="98" rx="10" ry="13" fill={`url(#${g('eye')})`} />
          <circle cx="83" cy="93" r="3" fill="#fff" />
          <circle cx="123" cy="93" r="3" fill="#fff" />
        </g>
      </g>
      {/* Cheeks */}
      <ellipse cx="62" cy="118" rx="7" ry="4" fill="#F07BE6" opacity="0.45" />
      <ellipse cx="138" cy="118" rx="7" ry="4" fill="#F07BE6" opacity="0.45" />
    </svg>
  )
}
