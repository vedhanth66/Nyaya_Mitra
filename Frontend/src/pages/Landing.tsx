import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Eye,
  FileCheck,
  Scale,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { BrandMark } from "@/components/visual/BrandMark";
import { HolographicCourt } from "@/components/visual/HolographicCourt";

const pipelineSteps = [
  { label: "Record intake", detail: "Normalize the facts", icon: FileCheck },
  { label: "Document vision", detail: "Extract legal signals", icon: Eye },
  { label: "Threshold math", detail: "Apply statute exactly", icon: Scale },
  { label: "Evidence trail", detail: "Ground every claim", icon: Shield },
  { label: "Action drafting", detail: "Prepare the next move", icon: Activity },
  { label: "Officer review", detail: "Keep humans decisive", icon: Users },
];

const principles = [
  {
    title: "Discover what matters",
    description: "A live signal layer keeps watch over custody thresholds and surfaces cases that deserve immediate attention.",
    icon: BrainCircuit,
  },
  {
    title: "Prove every conclusion",
    description: "Each recommendation remains connected to records, statutory reasoning, and the evidence trail behind it.",
    icon: Shield,
  },
  {
    title: "Move with human judgment",
    description: "AI accelerates the operational work. A legal officer retains the final decision at every critical gate.",
    icon: Users,
  },
];

function useCountUp(end: number, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, end]);

  return count;
}

export function Landing() {
  const monitored = useCountUp(1284);
  const readyForReview = useCountUp(127);
  const savedHours = useCountUp(340);

  return (
    <div className="public-experience">
      <header className="public-nav">
        <Link to="/" className="public-brand" aria-label="Nyaya Mitra home">
          <BrandMark size="sm" />
          <span className="public-brand__copy">
            <span className="public-brand__name">NYAYA MITRA</span>
            <span className="public-brand__tag">LEGAL INTELLIGENCE LAYER</span>
          </span>
        </Link>

        <nav className="public-nav__links" aria-label="Main navigation">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/features">Capabilities</Link>
          <Link to="/dashboard">Command Center</Link>
        </nav>

        <Link to="/login" className="public-cta">
          Officer access <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <main>
        <section className="public-container landing-hero">
          <motion.div
            className="landing-hero__copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="public-eyebrow"><i /><Sparkles className="h-3 w-3" /> THE JUSTICE SIGNAL, MADE VISIBLE</span>
            <h1 className="landing-hero__title">
              Justice has a signal.<br />
              <em>We surface it.</em>
            </h1>
            <p className="landing-hero__lead">
              Nyaya Mitra turns fragmented undertrial records into a clear, evidence-grounded path toward timely legal action—without taking the decision away from the people responsible for it.
            </p>
            <div className="landing-hero__actions">
              <Link to="/login" className="public-cta">
                Enter Command Center <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#pipeline" className="public-cta public-cta--ghost">
                See the intelligence flow <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="hero-note"><span /> Grounded in records. Governed by legal officers.</p>
          </motion.div>

          <motion.div
            className="landing-hero__visual"
            initial={{ opacity: 0, scale: 0.9, x: 32 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <HolographicCourt />
          </motion.div>
        </section>

        <section className="public-container">
          <motion.div
            className="landing-signal-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <div className="signal-strip__intro">
              <span className="signal-strip__label">OPERATIONAL VIEW</span>
              <p>One continuously evolving picture of the legal work that cannot wait.</p>
            </div>
            <div className="signal-stat">
              <strong>{monitored.toLocaleString()}</strong>
              <span>cases monitored</span>
            </div>
            <div className="signal-stat">
              <strong>{readyForReview}</strong>
              <span>potential signals found</span>
            </div>
            <div className="signal-stat">
              <strong>{savedHours}h</strong>
              <span>officer hours returned</span>
            </div>
          </motion.div>
        </section>

        <section id="pipeline" className="public-container public-section">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.58 }}
          >
            <p className="section-kicker">01 / THE INTELLIGENCE FLOW</p>
            <h2 className="section-heading">From raw records to a defensible next step.</h2>
            <p className="section-copy">
              A deliberate, visible sequence transforms noisy paperwork into a review-ready legal workflow. No black boxes, no automatic filing.
            </p>
          </motion.div>

          <div className="process-grid">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.label}
                  className="process-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <span className="process-card__number">0{index + 1}</span>
                  <span className="process-card__icon"><Icon /></span>
                  <h3>{step.label}</h3>
                  <p>{step.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="public-container public-section">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.58 }}
          >
            <p className="section-kicker">02 / A BETTER OPERATING SURFACE</p>
            <h2 className="section-heading">Powerful enough for the work. Calm enough for judgment.</h2>
          </motion.div>

          <div className="principle-grid">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.article
                  key={principle.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                >
                  <span className="feature-card__icon"><Icon /></span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                  <span className="feature-card__line" />
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
            transition={{ duration: 0.62 }}
          >
            <p className="section-kicker">AN OPERATIONAL ADVANTAGE</p>
            <h2>Give every case the attention its record already calls for.</h2>
            <p>Step into a command center designed to make legal work more legible, traceable, and timely.</p>
            <Link to="/login" className="public-cta">
              Open the workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="public-container public-footer">
        <span>NYAYA MITRA · HUMAN-GOVERNED LEGAL INTELLIGENCE</span>
        <span className="public-footer__links">
          <Link to="/how-it-works">Method</Link>
          <Link to="/features">Capabilities</Link>
          <Link to="/dashboard">Workspace</Link>
        </span>
      </footer>
    </div>
  );
}
