/*
 * ─── DESIGN PLAN · "Terminal Signal" ────────────────────────────────────────
 *
 * A software/AI engineer's portfolio built around the environment we actually
 * work in — a dark editor and a terminal — not a generic SaaS or the common
 * AI-default cream/terracotta look (which this deliberately avoids).
 *
 * COLOR   Deep-slate surfaces (#0d1117) with a teal SIGNAL accent (#4fd1c5 dark
 *         / #0e8f83 light) and a lime secondary (#a3e635 / #5a8f10) for the
 *         terminal + code accents. Cool off-white (#f7f9fb) in light mode —
 *         never cream. Full token set + light/dark mapping live in index.css.
 *
 * TYPE    Playfair Display → name + section titles only.  Inter → all body/UI.
 *         JetBrains Mono → tech tags, dates, section indices, and the terminal.
 *
 * LAYOUT  Single-page scroll: Hero (human intro + terminal) → About →
 *         Experience → Projects (deep-dive) → Skills → Contact.
 *
 * SIGNATURE  A live typed terminal in the hero (see components/Terminal.jsx):
 *            a truthful session — whoami / focus / a mock curl to the FinPilot
 *            API returning JSON — reflecting real work, not decoration.
 *            Reduced-motion users get the finished session instantly.
 * ────────────────────────────────────────────────────────────────────────────
 */
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
