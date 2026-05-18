import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { NotificationCenter } from "./NotificationCenter";
import { useThemeStyles } from "../ThemeContext";
import {
  Menu, X, Heart, Activity, ChevronDown, MapPin, Bell, ScanLine,
  Stethoscope, Shield, Award, Scale, Droplets, BarChart3, BookOpen,
  LayoutDashboard, Phone, LogOut, User, CreditCard, Settings,
  Building2, Ambulance, Pill
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
  { href: "/hospitals", label: "Nearby Hospitals", icon: <Building2 size={14} />, color: "#10b981" },
  { href: "/doctors", label: "Doctor Directory", icon: <Stethoscope size={14} />, color: "#a855f7" },
  { href: "/emergency-services", label: "Emergency Services", icon: <Ambulance size={14} />, color: "#dc2626" },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className="sticky top-0 w-full transition-colors duration-300"
      style={{
        background: styles.navBg,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${styles.navBorder}`,
        paddingTop: "env(safe-area-inset-top)",
        zIndex: mobileOpen ? 100 : 40,
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

          {/* Mobile Menu Toggle — min 44px touch target */}
          <button
            className="md:hidden flex items-center justify-center"
            style={{ color: styles.navText, width: "44px", height: "44px", minWidth: "44px" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — Full screen overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 md:hidden"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 100 }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Sliding drawer */}
          <div
            className="fixed inset-x-0 top-0 md:hidden flex flex-col"
            style={{
              background: styles.navBg,
              backdropFilter: "blur(20px)",
              maxHeight: "100dvh",
              paddingTop: "env(safe-area-inset-top)",
              animation: "slideDown 0.25s ease-out",
              zIndex: 110,
            }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 h-16 flex-shrink-0" style={{ borderBottom: `1px solid ${styles.mobileBorder}` }}>
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 flex items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}>
                  <Heart size={18} fill="white" color="white" />
                </div>
                <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: "19px", fontWeight: 700, color: styles.textPrimary }}>
                  JivanSetu
                </span>
              </Link>
              <button
                className="flex items-center justify-center"
                style={{ color: styles.navText, width: "44px", height: "44px" }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable content */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6"
              style={{
                maxHeight: "calc(100dvh - 64px)",
                paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Main navigation — min 48px touch targets */}
              <div className="py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 rounded-xl transition-all ${
                      isActive(item.href) ? styles.navActiveClass : ""
                    }`}
                    style={{
                      fontSize: "16px",
                      fontWeight: isActive(item.href) ? 600 : 500,
                      color: isActive(item.href) ? undefined : styles.navTextMuted,
                      minHeight: "48px",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px mx-2 my-1" style={{ background: styles.mobileBorder }} />
              <p className="px-4 pt-2 pb-1" style={{ fontSize: "11px", color: styles.textMuted, letterSpacing: "0.1em", fontWeight: 700 }}>MORE FEATURES</p>

              {/* More items — 2 column grid for compact display */}
              <div className="grid grid-cols-1 gap-0.5 py-1">
                {MORE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 rounded-xl transition-all ${
                      isActive(item.href) ? styles.navActiveClass : ""
                    }`}
                    style={{
                      fontSize: "15px",
                      fontWeight: isActive(item.href) ? 600 : 500,
                      color: isActive(item.href) ? undefined : styles.navTextMuted,
                      minHeight: "46px",
                    }}
                  >
                    <span className="flex-shrink-0" style={{ color: item.color }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Bottom actions */}
              <div className="h-px mx-2 my-2" style={{ background: styles.mobileBorder }} />

              <div className="flex items-center gap-3 px-2 py-3">
                <NotificationCenter />
                <LanguageSelector />
                <div className="flex-1" />
                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2"
                      style={{ color: styles.textPrimary }}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>BP</div>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>Bishal Paul</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold"
                      style={{
                        background: "rgba(220,38,38,0.15)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#f87171",
                        minHeight: "40px",
                      }}
                    >
                      <LogOut size={13} /> Log out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-full text-white"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      fontSize: "14px",
                      fontWeight: 600,
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {t("nav.login")}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </nav>
  );
}
