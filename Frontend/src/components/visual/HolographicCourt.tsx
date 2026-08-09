import { motion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { Radio, Scale, ShieldCheck, Sparkles } from "lucide-react";

interface HolographicCourtProps {
  className?: string;
  compact?: boolean;
}

export function HolographicCourt({
  className = "",
  compact = false,
}: HolographicCourtProps) {
  const rotateX = useSpring(0, { stiffness: 110, damping: 18, mass: 0.7 });
  const rotateY = useSpring(0, { stiffness: 110, damping: 18, mass: 0.7 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(pointerY * -10);
    rotateY.set(pointerX * 12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className={[
        "hologram-shell",
        compact ? "hologram-shell--compact" : "",
        className,
      ].filter(Boolean).join(" ")}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        className="hologram-stage"
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY }}
      >
        <div className="hologram-stage__grid" />
        <span className="hologram-orbit hologram-orbit--one" />
        <span className="hologram-orbit hologram-orbit--two" />
        <span className="hologram-orbit hologram-orbit--three" />

        <div className="hologram-core">
          <span className="hologram-core__halo" />
          <span className="hologram-core__surface">
            <Scale />
          </span>
          <span className="hologram-core__label">JUSTICE SIGNAL</span>
        </div>

        <div className="hologram-card hologram-card--cases">
          <span className="hologram-card__eyebrow"><Radio /> LIVE QUEUE</span>
          <strong>1,284</strong>
          <span>records monitored</span>
          <i />
        </div>

        <div className="hologram-card hologram-card--verified">
          <span className="hologram-card__eyebrow"><ShieldCheck /> GROUNDED</span>
          <strong>100%</strong>
          <span>evidence traceable</span>
          <i />
        </div>

        <div className="hologram-card hologram-card--signal">
          <Sparkles />
          <span>ELIGIBILITY<br />SIGNAL FOUND</span>
        </div>

        <span className="hologram-particle hologram-particle--one" />
        <span className="hologram-particle hologram-particle--two" />
        <span className="hologram-particle hologram-particle--three" />
        <span className="hologram-particle hologram-particle--four" />
      </motion.div>
    </div>
  );
}
