import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationCenter } from "./NotificationCenter";
import {
  Menu, X, Heart, Activity, ChevronDown, MapPin, Bell, ScanLine,
  Stethoscope, Shield, Award, Scale, Droplets, BarChart3, BookOpen,
  LayoutDashboard, Phone
} from "lucide-react";

const MORE_ITEMS = [
  { href: "/heatmap", label: "Live Heatmap", icon: <MapPin size={14} />, color: "#f59e0b" },
  { href: "/alerts", label: "Proximity Alerts", icon: <Bell size={14} />, color: "#3b82f6" },
  { href: "/report-scanner", label: "Report Scanner", icon: <ScanLine size={14} />, color: "#a855f7" },
  { href: "/doctor-portal", label: "Doctor's Portal", icon: <Stethoscope size={14} />, color: "#10b981" },
  { href: "/notto-guide", label: "NOTTO Guide", icon: <Shield size={14} />, color: "#2563eb" },
  { href: "/pledge-wall", label: "Pledge Wall", icon: <Award size={14} />, color: "#dc2626" },
  { href: "/legal-faq", label: "Legal FAQ", icon: <Scale size={14} />, color: "#f59e0b" },
  { href: "/blood-compatibility", label: "Blood Calculator", icon: <Droplets size={14} />, color: "#ec4899" },
  { href: "/blood-banks", label: "Blood Banks", icon: <Droplets size={14} />, color: "#f97316" },
  { href: "/statistics", label: "Statistics", icon: <BarChart3 size={14} />, color: "#6366f1" },
  { href: "/stories", label: "Success Stories", icon: <BookOpen size={14} />, color: "#14b8a6" },
  { href: "/contact", label: "Contact Us", icon: <Phone size={14} />, color: "#06b6d4" },
];

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/urgency", label: t("nav.urgency") },
    { href: "/seva-ai", label: t("nav.sevaAI") },
    { href: "/about", label: t("nav.about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(8, 16, 36, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}>
              <Heart size={18} fill="white" color="white" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 flex items-center justify-center">
                <Activity size={7} color="white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                JivanSetu
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(148,163,184,0.9)",
                  letterSpacing: "0.03em",
                  fontWeight: 400,
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                }}
              >
                जीवनसेतु
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-600/20 text-blue-300"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
                style={{ fontSize: "13.5px", fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  moreOpen || MORE_ITEMS.some((m) => isActive(m.href))
                    ? "bg-blue-600/20 text-blue-300"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
                style={{ fontSize: "13.5px", fontWeight: 500 }}
              >
                More
                <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-56 rounded-2xl py-2 z-50 max-h-[70vh] overflow-y-auto"
                  style={{
                    background: "rgba(15,23,42,0.98)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.1) transparent",
                  }}
                >
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-2.5 px-4 py-2.5 transition-all ${
                        isActive(item.href) ? "bg-white/8" : "hover:bg-white/5"
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: isActive(item.href) ? 600 : 400,
                          color: isActive(item.href) ? "white" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <NotificationCenter />
            <LanguageSelector />
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                fontSize: "13px",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(37,99,235,0.35)",
              }}
            >
              {t("nav.login")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                isActive(item.href) ? "bg-blue-600/20 text-blue-300" : "text-white/70"
              }`}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px my-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <p className="px-4 pt-1" style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)", letterSpacing: "0.08em", fontWeight: 600 }}>MORE FEATURES</p>

          {MORE_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all ${
                isActive(item.href) ? "bg-blue-600/20 text-blue-300" : "text-white/70"
              }`}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              <span style={{ color: item.color }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <ThemeToggle />
            <NotificationCenter />
            <LanguageSelector />
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center px-4 py-2 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", fontSize: "13px", fontWeight: 600 }}
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
