import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/visual/PageTransition";

export function PublicLayout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname} variant="public">
        <Outlet />
      </PageTransition>
    </AnimatePresence>
  );
}
