import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Languages,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { BrandMark } from "@/components/visual/BrandMark";
import { HolographicCourt } from "@/components/visual/HolographicCourt";

const features = [
  {
    label: "DISCOVERY",
    title: "Proactive case signals",
    description: "Continuously compare custody facts against the thresholds that merit a closer legal look.",
    icon: BrainCircuit,
  },
  {
    label: "GROUNDING",
    title: "Evidence-connected reasoning",
    description: "Keep the source records, statutory references, and analysis attached to each conclusion.",
    icon: Shield,
  },
  {
    label: "PRECISION",
    title: "Deterministic threshold math",
    description: "Use explicit rule-based calculations for eligibility logic so legal math stays inspectable.",
    icon: Scale,
  },
  {
    label: "GOVERNANCE",
    title: "Officer approval gates",
    description: "Make every consequential action reviewable, editable, and explicitly approved by a legal officer.",
    icon: Users,
  },
  {
    label: "ACCESS",
    title: "Plain-language communication",
    description: "Translate complex legal progress into clearer updates for undertrials and their families.",
    icon: Languages,
  },
  {
    label: "COMPLETENESS",
    title: "Always-on records audit",
    description: "Surface missing remand orders, charge sheets, and other documents before they interrupt momentum.",
    icon: FileText,
  },
];

export function FeaturesPage() {
  return (
    <div className="public-experience">
      <header className="public-nav">
        <Link to="/" className="public-brand">
          <BrandMark size="sm" />
          <span className="public-brand__copy">
            <span className="public-brand__name">NYAYA MITRA</span>
            <span className="public-brand__tag">CAPABILITIES / OPERATING SURFACE</span>
          </span>
        </Link>
        <nav className="public-nav__links" aria-label="Main navigation">
          <Link to="/">Overview</Link>
          <Link to="/how-it-works">How it works</Link>
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
            <span className="public-eyebrow"><i /> BUILT FOR TRUSTED MOMENTUM</span>
            <h1 className="public-page-hero__title">An exceptional interface for consequential work.</h1>
            <p className="public-page-hero__copy">
              Every capability is designed to answer a practical question: what deserves an officer’s attention now, what proves it, and what is the next responsible move?
            </p>
            <div className="public-page-hero__actions">
              <Link to="/dashboard" className="public-cta">See it in action <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/how-it-works" className="public-cta public-cta--ghost">Explore the workflow</Link>
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
            <p className="section-kicker">THE CAPABILITY LAYER</p>
            <h2 className="section-heading">A calmer, clearer operating model for legal aid teams.</h2>
            <p className="section-copy">The system brings together records, reasoning, verification, and action into one cohesive visual workspace.</p>
          </motion.div>

          <div className="capability-grid mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  className="capability-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <span className="capability-card__icon"><Icon /></span>
                  <span className="capability-card__label">{feature.label}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
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
            <p className="section-kicker">READY FOR THE REAL WORK</p>
            <h2>One interface. A stronger line of sight into every case.</h2>
            <p>Open the workspace to explore case intelligence, eligibility signals, evidence verification, and action tracking in context.</p>
            <Link to="/dashboard" className="public-cta">Go to Command Center <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </section>
      </main>

      <footer className="public-container public-footer">
        <span>NYAYA MITRA · DESIGNED FOR LEGAL CLARITY</span>
        <span className="public-footer__links">
          <Link to="/">Overview</Link>
          <Link to="/how-it-works">Method</Link>
          <Link to="/login">Officer access</Link>
        </span>
      </footer>
    </div>
  );
}
