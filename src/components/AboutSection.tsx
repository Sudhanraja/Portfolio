import AnimatedText from './AnimatedText'
import FadeIn from './FadeIn'
import RevealHeading from './RevealHeading'
import ProfileCard from './ProfileCard/ProfileCard'
import { ABOUT_TEXT, NAME, PROFILE_CARD_PHOTO } from '../data/portfolio'

export default function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10">
      {/* Profile card on the left from laptop width; stacked above the text otherwise */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
        <FadeIn x={-60} y={0} duration={0.9} className="w-full max-w-[300px] shrink-0 sm:max-w-[340px] lg:w-[340px]">
          <ProfileCard
            name={NAME}
            title="Software Engineer"
            handle="Sudhanraja"
            status="Open to roles"
            contactText="Contact"
            avatarUrl={PROFILE_CARD_PHOTO}
            backdropColor="#120a18"
            className="profile-card--about"
            holo={0.8}
            glare={0.5}
            tiltStrength={12}
            parallax={8}
            radius={16}
            enableTilt
            intro
            showUserInfo
            theme="dark"
            onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </FadeIn>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <RevealHeading
            text="About me"
            className="text-center font-black uppercase leading-none tracking-[0.04em]"
            letterClass="hero-heading"
            accentWords={['me']}
            style={{ fontSize: 'clamp(3rem, 9vw, 150px)' }}
          />
          <AnimatedText
            text={ABOUT_TEXT}
            className="max-w-[600px] text-center font-normal leading-[1.75] tracking-[-0.005em] text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontFamily: "'Inter Variable', system-ui, sans-serif" }}
          />
        </div>
      </div>
    </section>
  )
}
