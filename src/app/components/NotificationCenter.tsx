import { useState, useRef, useEffect } from "react";
import { Bell, Heart, Droplets, AlertCircle, CheckCircle, Megaphone, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Notification = {
  id: number;
  type: "match" | "system" | "reminder" | "campaign";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "match",
    title: "Potential Match Found",
    message: "O+ blood urgently needed at AIIMS Delhi — you're a match!",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "campaign",
    title: "Blood Donation Drive",
    message: "Mega donation camp this Sunday at India Gate, New Delhi. Register now!",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Eligible to Donate Again",
    message: "It's been 90 days since your last blood donation. You're eligible again!",
    time: "3 hrs ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "Profile Updated",
    message: "Your donor card has been successfully updated with new organ pledges.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "match",
    title: "SOS Alert Nearby",
    message: "AB− blood urgently needed at Max Hospital, Saket — 3.2 km from you.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "Welcome to JivanSetu!",
    message: "Thank you for joining. Complete your profile to start saving lives.",
    time: "3 days ago",
    read: true,
  },
];

const ICON_MAP = {
  match: { icon: <Heart size={14} />, bg: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "rgba(220,38,38,0.3)" },
  system: { icon: <CheckCircle size={14} />, bg: "rgba(37,99,235,0.15)", color: "#93c5fd", border: "rgba(37,99,235,0.3)" },
  reminder: { icon: <Clock size={14} />, bg: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  campaign: { icon: <Megaphone size={14} />, bg: "rgba(245,158,11,0.15)", color: "#fde68a", border: "rgba(245,158,11,0.3)" },
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: open ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.08)",
          border: open ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.12)",
        }}
        aria-label="Notifications"
      >
        <Bell size={17} style={{ color: open ? "#93c5fd" : "rgba(255,255,255,0.7)" }} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
              fontSize: "10px",
              fontWeight: 800,
              color: "white",
              minWidth: "18px",
              height: "18px",
              boxShadow: "0 2px 8px rgba(220,38,38,0.5)",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-80 sm:w-96 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(12,20,42,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Notifications</h3>
                {unreadCount > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 700, background: "rgba(37,99,235,0.2)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.3)" }}
                  >
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="transition-all hover:text-white"
                    style={{ fontSize: "11px", color: "rgba(148,163,184,0.7)", fontWeight: 500 }}
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/70 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
              {notifications.map((n) => {
                const style = ICON_MAP[n.type];
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className="flex gap-3 px-5 py-3.5 cursor-pointer transition-all hover:bg-white/[0.03]"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: n.read ? "transparent" : "rgba(37,99,235,0.04)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                    >
                      {style.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p style={{ fontSize: "13px", fontWeight: n.read ? 500 : 700, color: n.read ? "rgba(255,255,255,0.7)" : "white", lineHeight: 1.3 }}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.65)", lineHeight: 1.4, marginTop: "2px" }}>
                        {n.message}
                      </p>
                      <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)", marginTop: "4px" }}>
                        {n.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                className="w-full text-center py-2 rounded-xl transition-all hover:bg-white/[0.06]"
                style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
