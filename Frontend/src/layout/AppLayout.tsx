import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  Shield,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationsModal, type NotificationItem } from "@/components/NotificationsModal";
import { LawyerProfileModal } from "@/components/LawyerProfileModal";
import { BrandMark } from "@/components/visual/BrandMark";
import { PageTransition } from "@/components/visual/PageTransition";
import { fetchNotifications } from "@/lib/api";

const navItems = [
  { path: "/dashboard", label: "Command Center", icon: Activity },
  { path: "/cases", label: "Cases", icon: FileText },
  { path: "/radar", label: "Eligibility Radar", icon: Search },
  { path: "/documents", label: "Documents", icon: FileText },
  { path: "/evidence", label: "Evidence", icon: Shield },
  { path: "/actions", label: "Actions", icon: Activity },
  { path: "/hearings", label: "Hearings", icon: Calendar },
  { path: "/reports", label: "Reports", icon: BarChart3 },
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "N-1",
    title: "Senior Citizen Bail Eligibility",
    message: "UTP-0007 (63 yrs, hypertensive) has completed half sentence.",
    timestamp: "10 mins ago",
    type: "urgent",
    case_id: "UTP-0007",
  },
  {
    id: "N-2",
    title: "Missing Document Alert",
    message: "UTP-0015 requires Charge Sheet for BNSS 479 draft generation.",
    timestamp: "45 mins ago",
    type: "warning",
    case_id: "UTP-0015",
  },
];

const READ_STORAGE_KEY = "nyaya_read_notification_ids";

function getReadIdsFromStorage(): string[] {
  try {
    return JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveReadIdsToStorage(ids: string[]) {
  try {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("Failed to save read notification IDs:", err);
  }
}

export function AppLayout() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const readIds = getReadIdsFromStorage();
    return DEFAULT_NOTIFICATIONS.map((notification) => ({
      ...notification,
      read: readIds.includes(notification.id),
    }));
  });
  const [notifLoading, setNotifLoading] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!navRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollNav = (direction: "left" | "right") => {
    navRef.current?.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = window.setTimeout(checkScroll, 100);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;
    setNotifLoading(true);

    fetchNotifications()
      .then((data) => {
        if (!isMounted) return;

        const readIds = getReadIdsFromStorage();
        if (data && data.length > 0) {
          setNotifications(
            data.map((notification: NotificationItem) => ({
              ...notification,
              read: readIds.includes(notification.id) || Boolean(notification.read),
            })),
          );
          return;
        }

        setNotifications(
          DEFAULT_NOTIFICATIONS.map((notification) => ({
            ...notification,
            read: readIds.includes(notification.id),
          })),
        );
      })
      .finally(() => {
        if (isMounted) setNotifLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((previous) => {
      const updated = previous.map((notification) => ({ ...notification, read: true }));
      saveReadIdsToStorage(updated.map((notification) => notification.id));
      return updated;
    });
  };

  const handleMarkItemRead = (id: string) => {
    setNotifications((previous) => {
      const updated = previous.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      );
      saveReadIdsToStorage(updated.filter((notification) => notification.read).map((notification) => notification.id));
      return updated;
    });
  };

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="app-shell">
      <div className="workspace-atmosphere" />

      <header className="workspace-header">
        <div className="workspace-header__inner">
          <Link to="/" className="workspace-brand" aria-label="Nyaya Mitra home">
            <BrandMark size="sm" />
            <span className="workspace-brand__copy">
              <span className="workspace-brand__name">NYAYA MITRA</span>
              <span className="workspace-brand__state"><i /> JUDICIAL INTELLIGENCE</span>
            </span>
          </Link>

          <div className="workspace-nav-wrap">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollNav("left")}
                className="workspace-nav-scroll workspace-nav-scroll--left"
                title="Show previous areas"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            <nav ref={navRef} onScroll={checkScroll} className="workspace-nav" aria-label="Workspace navigation">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/cases" && location.pathname.startsWith("/case/")) ||
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={[
                      "workspace-nav__link",
                      isActive ? "workspace-nav__link--active" : "",
                    ].filter(Boolean).join(" ")}
                  >
                    <Icon />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.i
                        layoutId="workspace-nav-pulse"
                        className="workspace-nav__pulse"
                        transition={{ type: "spring", stiffness: 460, damping: 34 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollNav("right")}
                className="workspace-nav-scroll workspace-nav-scroll--right"
                title="Show more areas"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="workspace-controls">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="workspace-control"
              title="Search cases and actions"
            >
              <Search className="h-4 w-4" />
              <span className="workspace-control__key">CTRL K</span>
            </button>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              className="workspace-control"
              title="Open system alerts"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && <span className="workspace-control__notification" />}
            </button>
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="workspace-profile"
              title="View legal officer profile"
            >
              <span className="workspace-profile__avatar">RS</span>
              <span className="workspace-profile__text">
                Legal Officer 104
                <small>VERIFIED ACCESS</small>
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="workspace-statusbar">
        <span className="workspace-statusbar__live"><i /> LIVE LEGAL OPERATIONS NETWORK</span>
        <span>HUMAN REVIEW MODE · EVIDENCE-GROUNDED</span>
      </div>

      <main className="workspace-main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname} variant="workspace">
            <div className="workspace-page">
              <Outlet />
            </div>
          </PageTransition>
        </AnimatePresence>
      </main>

      <div className="fixed bottom-5 right-5 z-40">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="intelligence-dock cursor-pointer overflow-hidden"
          initial={false}
          animate={{
            width: isHovered ? 340 : 50,
            height: isHovered ? 168 : 50,
            borderRadius: isHovered ? 17 : 999,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[50px] w-[50px] items-center justify-center"
              >
                <span className="intelligence-dock__orb">
                  <Activity className="h-4 w-4" />
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="w-[340px] p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="intelligence-dock__orb h-8 w-8">
                    <Activity className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-accent">NYAYA SIGNAL</p>
                    <p className="mt-0.5 text-[10px] text-white/45">Intelligence engine is monitoring live records</p>
                  </div>
                </div>
                <ul className="space-y-2 font-mono text-[10px] text-white/58">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(97,229,208,0.8)]" /> Custody thresholds recalculated</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#9ba8ff]" /> Source-grounding trail retained</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ffbf70]" /> Human approval remains required</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onMarkItemRead={handleMarkItemRead}
        loading={notifLoading}
      />
      <LawyerProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}
