import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import RevealHeading from './RevealHeading'
import HeadingLine from './HeadingLine'
import HorizonEdge from './HorizonEdge'
import { EMAIL, SOCIALS, FORMSPREE_ENDPOINT, RESUME_URL, RESUME_DOWNLOAD_NAME, NAME } from '../data/portfolio'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Form fields rise in one after another.
const fieldIn = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }

const field =
  'w-full rounded-2xl border-2 border-[#D7E2EA]/30 bg-transparent px-5 py-4 font-light text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 outline-none transition-colors focus:border-[#B600A8]'

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  // First name of the sender, for the success card.
  const [sender, setSender] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setSender(String(new FormData(form).get('name') ?? '').trim().split(/\s+/)[0])
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative z-30 bg-[#0C0C0C] px-5 pb-24 pt-20 2xl:pb-10 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
      <HorizonEdge color="#0C0C0C" />
      <RevealHeading
        text="Contact"
        className="text-center font-black uppercase leading-none tracking-[0.04em]"
        letterClass="hero-heading"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />
      <HeadingLine className="mb-6 mt-6 sm:mt-8" />
      <FadeIn as="p" delay={0.1} className="mx-auto mb-16 max-w-xl text-center font-light uppercase tracking-wide text-[#D7E2EA] sm:mb-20" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)' }}>
        Open to software, backend and AI engineer roles.
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <FadeIn className="flex flex-col gap-8">
          <a href={`mailto:${EMAIL}`} className="break-all font-medium text-[#D7E2EA] transition-opacity hover:opacity-70" style={{ fontSize: 'clamp(1.2rem, 2.6vw, 2.2rem)' }}>
            {EMAIL}
          </a>
          <ul className="flex flex-col">
            {SOCIALS.filter((s) => s.label !== 'Email').map((s) => (
              <li key={s.label} style={{ borderTop: '1px solid rgba(215, 226, 234, 0.15)' }}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5 text-[#D7E2EA]">
                  <span className="font-medium uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-2">{s.label}</span>
                  <span className="flex items-center gap-2 font-light opacity-70 transition-opacity group-hover:opacity-100">
                    {s.handle}
                    <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#E06BD6]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Magnet padding={60} strength={4} className="w-fit">
          <a
            href={RESUME_URL}
            download={RESUME_DOWNLOAD_NAME}
            className="inline-flex w-fit items-center gap-3 rounded-full border-2 border-[#D7E2EA] px-8 py-3 font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
          >
            <Download size={18} aria-hidden="true" /> Resume
          </a>
          </Magnet>
        </FadeIn>

        <div className="relative">
        <motion.form
          onSubmit={onSubmit}
          aria-hidden={status === 'sent'}
          className={`flex flex-col gap-4 transition-opacity duration-300 ${status === 'sent' ? 'pointer-events-none opacity-0' : ''}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <label className="sr-only" htmlFor="name">Name</label>
          <motion.div variants={fieldIn}><input id="name" name="name" required placeholder="Your name" className={field} /></motion.div>
          <label className="sr-only" htmlFor="email">Email</label>
          <motion.div variants={fieldIn}><input id="email" name="email" type="email" required placeholder="Your email" className={field} /></motion.div>
          <label className="sr-only" htmlFor="message">Message</label>
          <motion.div variants={fieldIn}><textarea id="message" name="message" required rows={5} placeholder="Tell me about the role or project" className={`${field} resize-none`} /></motion.div>
          <motion.div variants={fieldIn} className="mt-2">
          <Magnet padding={50} strength={6} className="block">
          <button
            type="submit"
            disabled={status === 'sending'}
            // Magenta-to-violet like the rest of the accents; a shine sweeps across on hover.
            className="group relative w-full overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-[#B600A8] to-[#7621B0] px-10 py-4 font-semibold uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(182,0,168,0.7)] transition-shadow duration-300 hover:shadow-[0_14px_40px_-8px_rgba(182,0,168,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E06BD6] disabled:opacity-60"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
            />
            <span className="relative">{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
          </button>
          </Magnet>
          </motion.div>
          <p role="status" className="min-h-[1.5rem] text-center font-light text-[#D7E2EA]">
            {status === 'error' && 'Something went wrong. Please email me directly.'}
          </p>
        </motion.form>

        {/* Success card: takes the form's place once the message is sent. */}
        <AnimatePresence>
          {status === 'sent' && (
            <motion.div
              role="status"
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[2rem] border-2 border-[#B600A8]/50 bg-[radial-gradient(ellipse_at_50%_30%,rgba(209,59,196,0.22),rgba(118,33,176,0.08)_55%,transparent_80%)] px-6 text-center shadow-[0_20px_60px_-20px_rgba(182,0,168,0.6)]"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.svg
                viewBox="0 0 52 52"
                className="h-20 w-20 drop-shadow-[0_0_18px_rgba(209,59,196,0.7)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="sent-check" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F07BE6" />
                    <stop offset="100%" stopColor="#7621B0" />
                  </linearGradient>
                </defs>
                <circle cx="26" cy="26" r="24" fill="url(#sent-check)" />
                <motion.path
                  d="M15 27 L23 35 L38 19"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.45, ease: 'easeOut' }}
                />
              </motion.svg>
              <h3 className="font-black uppercase tracking-widest text-[#D7E2EA]" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}>
                Message sent!
              </h3>
              <p className="max-w-sm font-light leading-relaxed text-[#D7E2EA]/75">
                Thanks{sender ? `, ${sender}` : ''}! Your message reached my inbox. I’ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="rounded-full border-2 border-[#D7E2EA]/40 px-7 py-2.5 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:border-[#E06BD6] hover:text-white"
              >
                Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-wrap justify-between gap-4 border-t border-[#D7E2EA]/15 pt-8 text-sm font-light uppercase tracking-wider text-[#D7E2EA]/60">
        <span>© {new Date().getFullYear()} {NAME}</span>
        <a href="#home" className="group transition-opacity hover:opacity-100">
          Back to top <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </footer>
    </section>
  )
}
