import { motion } from 'framer-motion'
import { BriefcaseBusiness, FileText, FolderGit2, Github, House, Linkedin, Mail, Sparkles, UserRound } from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import Dock from './Dock/Dock'
import { RESUME_URL, SOCIALS } from '../data/portfolio'

// Site navigation as a macOS-style magnifying dock fixed to the top of the
// screen. Section icons scroll to their section and the one in view gets a
// dot; after a divider come GitHub, LinkedIn and the resume.

const SECTIONS: { id: string; label: string; Icon: ComponentType<{ size?: string | number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'about', label: 'About', Icon: UserRound },
  { id: 'skills', label: 'Skills', Icon: Sparkles },
  { id: 'projects', label: 'Projects', Icon: FolderGit2 },
  { id: 'experience', label: 'Experience', Icon: BriefcaseBusiness },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

const glyph = (Icon: ComponentType<{ size?: string | number; strokeWidth?: number }>) => <Icon size="1em" strokeWidth={1.8} />
const link = (label: string) => SOCIALS.find((s) => s.label === label)?.href ?? '#'

// Tracks which section is in the middle of the viewport.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}

const ids = SECTIONS.map((s) => s.id)

export default function Navbar() {
  const active = useActiveSection(ids)

  const items = [
    ...SECTIONS.map(({ id, label, Icon }) => ({
      icon: glyph(Icon),
      label,
      active: active === id,
      onClick: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    { separator: true as const },
    { icon: glyph(Github), label: 'GitHub', onClick: () => window.open(link('GitHub'), '_blank', 'noopener') },
    { icon: glyph(Linkedin), label: 'LinkedIn', onClick: () => window.open(link('LinkedIn'), '_blank', 'noopener') },
    { icon: glyph(FileText), label: 'Resume', onClick: () => window.open(RESUME_URL, '_blank', 'noopener') },
  ]

  return (
    // The strip is tall enough for icons to grow downward; only the dock itself takes clicks.
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[120px] [&_.dock]:pointer-events-auto"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Dock
        items={items}
        position="top"
        theme="dark"
        baseItemSize={46}
        magnification={66}
        panelHeight={62}
        accentColor="#D13BC4"
        style={{
          // Site palette: near-solid black panel (so it looks the same over the
          // white sections as over the dark ones), dark tiles, silver icons.
          ['--dock-panel' as string]: 'rgba(12, 12, 12, 0.94)',
          ['--dock-panel-edge' as string]: 'rgba(215, 226, 234, 0.16)',
          ['--dock-panel-shadow' as string]: '0 18px 40px -16px rgba(0, 0, 0, 0.55), 0 4px 14px -6px rgba(0, 0, 0, 0.35)',
          ['--dock-tile' as string]: 'linear-gradient(180deg, #24222b 0%, #16151b 100%)',
          ['--dock-ink' as string]: '#D7E2EA',
          ['--dock-dot' as string]: '#E06BD6',
          ['--dock-label' as string]: '#16151b',
        }}
      />
    </motion.header>
  )
}
