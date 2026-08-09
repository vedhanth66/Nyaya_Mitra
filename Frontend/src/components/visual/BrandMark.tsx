import { motion } from "framer-motion";
import { Scale } from "lucide-react";

interface BrandMarkProps {
  className?: string;
  size?: "sm" | "md";
}

export function BrandMark({ className = "", size = "md" }: BrandMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "brand-symbol",
        size === "sm" ? "brand-symbol--sm" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      <motion.span
        className="brand-symbol__aura"
        animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.28, 0.08, 0.28] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="brand-symbol__ring brand-symbol__ring--outer" />
      <span className="brand-symbol__ring brand-symbol__ring--inner" />
      <span className="brand-symbol__core">
        <Scale strokeWidth={1.8} />
      </span>
    </div>
  );
}
