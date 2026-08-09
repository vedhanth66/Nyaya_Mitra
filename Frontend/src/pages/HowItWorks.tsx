import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Eye,
  FileCheck,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { BrandMark } from "@/components/visual/BrandMark";
import { HolographicCourt } from "@/components/visual/HolographicCourt";

const pipelineSteps = [
  {
    step: "01",
    tag: "INPUT LAYER",
    title: "Build a reliable record",
    description: "Scanned prison registers, FIR copies, remand notes, and custody logs are normalized into a structured, reviewable case record.",
    icon: FileCheck,
  },
  {
    step: "02",
    tag: "DOCUMENT VISION",
    title: "Find critical facts",
    description: "The document intelligence layer extracts arrest dates, charged sections, sentence lengths, and prior bail information from legal records.",
    icon: Eye,
  },
  {
    step: "03",
    tag: "RULE ENGINE",
    title: "Apply the statute exactly",
    description: "Deterministic legal threshold calculations turn the relevant facts into an auditable custody eligibility signal.",
    icon: Scale,
  },
  {
    step: "04",
    tag: "EVIDENCE LAYER",
    title: "Ground every conclusion",
    description: "Relevant statutory sources and case facts stay connected, so the officer can inspect why the system reached each finding.",
    icon: Shield,
  },
  {
    step: "05",
    tag: "ACTION STUDIO",
    title: "Prepare the next move",
    description: "The workspace prepares a structured draft and highlights record gaps, giving legal staff a strong starting point for action.",
    icon: Activity,
  },
  {
    step: "06",
    tag: "HUMAN GATE",
    title: "Keep judgment human",
    description: "A legal officer reviews, edits, and approves every consequential action. The system supports the decision; it does not make it.",
    icon: Users,
  },
];

export function HowItWorks() {
  return (
    <div className="public-experience">
      <header className="public-nav">
        <Link to="/" className="public-brand">
          <BrandMark size="sm" />
          <span className="public-brand__copy">
            <span className="public-brand__name">NYAYA MITRA</span>
            <span className="public-brand__tag">METHOD / INTELLIGENCE FLOW</span>
          </span>
        </Link>
        <nav className="public-nav__links" aria-label="Main navigation">
          <Link to="/">Overview</Link>
          <Link to="/features">Capabilities</Link>
          <Link to="/dashboard">Command Center</Link>
        </nav>
        <Link to="/login" className="public-cta">Officer access <ArrowRight className="h-3.5 w-3.5" /></Link>
      </header>

      <main>
        <section className="public-container public-page-hero">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="public-eyebrow"><i /> TRANSPARENT BY DESIGN</span>
            <h1 className="public-page-hero__title">A visible path from paper to progress.</h1>
            <p className="public-page-hero__copy">
              Nyaya Mitra organizes the work that sits between a raw record and a review-ready legal action. Every stage has a purpose, an evidence trail, and a human owner.
            </p>
            <div className="public-page-hero__actions">
              <Link to="/dashboard" className="public-cta">Explore the workspace <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/features" className="public-cta public-cta--ghost">See capabilities</Link>
            </div>
          </motion.div>

          <motion.div
            className="public-page-hero__visual"
            initial={{ opacity: 0, scale: 0.9, x: 26 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.88, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <HolographicCourt compact />
          </motion.div>
        </section>

        <section className="public-container public-section">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="section-kicker">THE SIX-STAGE FLOW</p>
            <h2 className="section-heading">Designed for legibility at every handoff.</h2>
            <p className="section-copy">The value is not only in what the system finds, but in how clearly it reveals the work needed to move a case forward.</p>
          </motion.div>

          <div className="journey-grid mt-12">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.step}
                  className="journey-card"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <div className="journey-card__head">
                    <span className="journey-card__step">STAGE {step.step}</span>
                    <span className="journey-card__icon"><Icon /></span>
                  </div>
                  <span className="journey-card__tag">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="journey-card__wire" />
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="public-container">
          <motion.div
            className="public-banner"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-kicker">A HUMAN-GOVERNED SYSTEM</p>
            <h2>AI clears the operational fog. Legal officers keep the authority.</h2>
            <p>Explore the live command center to see how the workflow feels when every signal is accompanied by its proof.</p>
            <Link to="/dashboard" className="public-cta">Open Command Center <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </section>
      </main>

      <footer className="public-container public-footer">
        <span>NYAYA MITRA · TRACEABLE INTELLIGENCE FOR LEGAL AID</span>
        <span className="public-footer__links">
          <Link to="/">Overview</Link>
          <Link to="/features">Capabilities</Link>
          <Link to="/login">Officer access</Link>
        </span>
      </footer>
    </div>
  );
}
