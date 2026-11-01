/*
 * "3D Creator" layout adapted for Sudhanraja S.
 * Dark #0C0C0C ground, Kanit type, gradient headings, a horizon hero,
 * scroll-revealed About copy, white "Skills" sheet, sticky stacking project
 * cards, then Experience and Contact sheets. All copy lives in data/portfolio.ts.
 */
import { MotionConfig } from 'framer-motion'
import ChatWidget from './components/ChatWidget'
import ScrollProgress from './components/ScrollProgress'
import GlowCursor from './components/GlowCursor/GlowCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    // reducedMotion="user": visitors who turn on reduced motion get fades only, no movement.
    <MotionConfig reducedMotion="user">
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <ChatWidget />
      {/* Glowing cursor trail over the whole page; clicks pass straight through. */}
      <GlowCursor
        // Site accent palette: magenta fading to violet, as on the Contact button
        color="#D13BC4"
        secondaryColor="#7621B0"
        intensity={1.3}
        trailWidth={3}
        linger={1.4}
        glow={1.2}
        clickBurst
        theme="dark"
        style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}
      />
    </main>
    </MotionConfig>
  )
}
