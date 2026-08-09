import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "public" | "workspace";
}

const transitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(5px)",
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export function PageTransition({
  children,
  variant = "workspace",
}: PageTransitionProps) {
  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={"route-transition route-transition--" + variant}
    >
      <span className="route-transition__flare" />
      {children}
    </motion.div>
  );
}
