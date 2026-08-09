import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/visual/BrandMark";
import { HolographicCourt } from "@/components/visual/HolographicCourt";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-experience">
      <section className="login-panel">
        <div>
          <Link to="/" className="login-back">
            <ArrowLeft /> Return to public view
          </Link>

          <Link to="/" className="public-brand login-brand">
            <BrandMark />
            <span className="public-brand__copy">
              <span className="public-brand__name">NYAYA MITRA</span>
              <span className="public-brand__tag">OFFICER ACCESS GATEWAY</span>
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mx-auto w-full max-w-[34rem]"
        >
          <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-accent">LIVE LEGAL OPERATIONS</p>
          <h2 className="mt-3 max-w-md font-display text-4xl leading-[1.04] tracking-[-0.045em] text-white">
            Clearer legal signals. More time for judgment.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            An intelligence layer for the legal work behind timely undertrial relief—designed to support officers, never replace them.
          </p>
          <HolographicCourt compact />
        </motion.div>

        <div className="login-trust">
          <span><i /> SECURE OFFICER SESSION</span>
          <span><ShieldCheck className="h-3 w-3 text-accent" /> EVIDENCE TRACEABILITY ACTIVE</span>
        </div>
      </section>

      <section className="login-form-panel">
        <motion.div
          className="login-form-wrap"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <Link to="/" className="public-brand">
              <BrandMark size="sm" />
              <span className="public-brand__name">NYAYA MITRA</span>
            </Link>
          </div>

          <div className="login-form-heading">
            <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-accent">VERIFIED WORKSPACE</p>
            <h1>Enter your legal command center.</h1>
            <p>Use your Officer ID to access the live case intelligence environment.</p>
          </div>

          <form onSubmit={handleLogin} className="login-card">
            <div className="login-field">
              <label htmlFor="officer-id">OFFICER ID / EMAIL</label>
              <input
                id="officer-id"
                type="text"
                defaultValue="officer_104@nyayamitra.gov.in"
                className="login-field__input"
                autoComplete="username"
              />
            </div>

            <div className="login-field">
              <label htmlFor="officer-password">ACCESS KEY</label>
              <input
                id="officer-password"
                type="password"
                defaultValue="••••••••••••"
                className="login-field__input"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-submit">
              <Lock /> Authorize secure session <ArrowRight className="h-4 w-4" />
            </button>

            <div className="login-security">
              <span><Activity /> SYSTEM STATUS: ONLINE</span>
              <span><ShieldCheck /> HUMAN REVIEW REQUIRED FOR EVERY ACTION</span>
            </div>
          </form>

          <Link to="/" className="login-back mt-6 md:hidden">
            <ArrowLeft /> Back to home
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
