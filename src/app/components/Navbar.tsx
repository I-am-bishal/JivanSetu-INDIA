import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { NotificationCenter } from "./NotificationCenter";
import { useThemeStyles } from "../ThemeContext";
import {
  Menu, X, Heart, Activity, ChevronDown, MapPin, Bell, ScanLine,
  Stethoscope, Shield, Award, Scale, Droplets, BarChart3, BookOpen,
  LayoutDashboard, Phone, LogOut, User, CreditCard, Settings
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
  const [profileOpen, setProfileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const styles = useThemeStyles();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/urgency", label: t("nav.urgency") },
    { href: "/seva-ai", label: t("nav.sevaAI") },
    { href: "/about", label: t("nav.about") },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("jivansetu_logged_in") === "true");

  // Sync auth state if it changes in another tab or after navigation
  useEffect(() => {
    const sync = () => setIsLoggedIn(localStorage.getItem("jivansetu_logged_in") === "true");
    window.addEventListener("storage", sync);
    sync();
    return () => window.removeEventListener("storage", sync);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("jivansetu_logged_in");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMoreOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="sticky top-0 z-40 w-full transition-colors duration-300"
      style={{
        background: styles.navBg,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${styles.navBorder}`,
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
                  fontSize: "19px",
                  fontWeight: 700,
                  color: styles.textPrimary,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                JivanSetu
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: styles.textMuted,
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
                    ? styles.navActiveClass
                    : `${styles.navHoverClass}`
                }`}
                style={{ fontSize: "15px", fontWeight: 500, color: isActive(item.href) ? undefined : styles.navTextMuted }}
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
                    ? styles.navActiveClass
                    : `${styles.navHoverClass}`
                }`}
                style={{ fontSize: "15px", fontWeight: 500, color: (moreOpen || MORE_ITEMS.some((m) => isActive(m.href))) ? undefined : styles.navTextMuted }}
              >
                More
                <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-56 rounded-2xl py-2 z-50 max-h-[70vh] overflow-y-auto"
                  style={{
                    background: styles.dropdownBg,
                    border: `1px solid ${styles.dropdownBorder}`,
                    backdropFilter: "blur(20px)",
                    boxShadow: styles.dropdownShadow,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.1) transparent",
                  }}
                >
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-2.5 px-4 py-2.5 transition-all w-full`}
                      style={{ background: isActive(item.href) ? styles.dropdownItemHover : "transparent" }}
                      onMouseEnter={(e) => { if (!isActive(item.href)) e.currentTarget.style.background = styles.dropdownItemHover; }}
                      onMouseLeave={(e) => { if (!isActive(item.href)) e.currentTarget.style.background = "transparent"; }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: isActive(item.href) ? 600 : 400,
                          color: isActive(item.href) ? styles.textPrimary : styles.dropdownItemText,
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
            <NotificationCenter />
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: profileOpen ? "0 0 0 3px rgba(37,99,235,0.35)" : "0 4px 15px rgba(37,99,235,0.35)" }}
                >
                  BP
                </button>

                {profileOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-56 rounded-2xl py-2 z-50"
                    style={{
                      background: styles.dropdownBg,
                      border: `1px solid ${styles.dropdownBorder}`,
                      backdropFilter: "blur(20px)",
                      boxShadow: styles.dropdownShadow,
                    }}
                  >
                    {/* User header */}
                    <div className="px-4 py-3 mb-1" style={{ borderBottom: `1px solid ${styles.dropdownBorder}` }}>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: styles.textPrimary }}>Bishal Paul</p>
                      <p style={{ fontSize: "12px", color: styles.textMuted, marginTop: "2px" }}>bishal.paul@gmail.com</p>
                    </div>

                    {[
                      { href: "/profile", label: "My Profile", icon: <User size={14} />, color: "#3b82f6" },
                      { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} />, color: "#10b981" },
                      { href: "/donor-card", label: "Donor Card", icon: <CreditCard size={14} />, color: "#a855f7" },
                      { href: "/profile", label: "Settings", icon: <Settings size={14} />, color: "#f59e0b" },
                    ].map(item => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 w-full transition-all"
                        style={{ background: isActive(item.href) && item.label !== "Settings" ? styles.dropdownItemHover : "transparent" }}
                        onMouseEnter={e => { e.currentTarget.style.background = styles.dropdownItemHover; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20`, color: item.color }}>
                          {item.icon}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: styles.dropdownItemText }}>{item.label}</span>
                      </Link>
                    ))}

                    <div style={{ margin: "6px 16px", height: "1px", background: styles.dropdownBorder }} />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-4 py-2.5 w-full transition-all"
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(220,38,38,0.15)", color: "#f87171" }}>
                        <LogOut size={14} />
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#f87171" }}>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  fontSize: "14px",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(37,99,235,0.35)",
                }}
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: styles.navText }}
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
          style={{ borderTop: `1px solid ${styles.mobileBorder}`, background: styles.navBg }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                isActive(item.href) ? styles.navActiveClass : ""
              }`}
              style={{ fontSize: "15px", fontWeight: 500, color: isActive(item.href) ? undefined : styles.navTextMuted }}
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px my-1" style={{ background: styles.mobileBorder }} />
          <p className="px-4 pt-1" style={{ fontSize: "12px", color: styles.textMuted, letterSpacing: "0.08em", fontWeight: 600 }}>MORE FEATURES</p>

          {MORE_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all ${
                isActive(item.href) ? styles.navActiveClass : ""
              }`}
              style={{ fontSize: "15px", fontWeight: 500, color: isActive(item.href) ? undefined : styles.navTextMuted }}
            >
              <span style={{ color: item.color }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 mt-2 pt-2" style={{ borderTop: `1px solid ${styles.mobileBorder}` }}>
            <NotificationCenter />
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex-1 flex items-center justify-between gap-2">
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                  style={{ color: styles.textPrimary }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>BP</div>
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>Bishal Paul</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
                  style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}
                >
                  <LogOut size={13} /> Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", fontSize: "14px", fontWeight: 600 }}
              >
                {t("nav.login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
