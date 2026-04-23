import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    localStorage.setItem("jivansetu-theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {}, isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/* ─── Theme-aware style helpers ─── */
export function useThemeStyles() {
  const isDark = true;

  return {
    // Page backgrounds
    pageBg: "#060d1f",
    pageColor: "white",

    // Card styles
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    cardHoverBg: "rgba(255,255,255,0.07)",

    // Text colors
    textPrimary: "white",
    textSecondary: "rgba(148,163,184,0.85)",
    textMuted: "rgba(148,163,184,0.6)",
    textLabel: "#93c5fd",

    // Input styles
    inputBg: "rgba(255,255,255,0.06)",
    inputBorder: "rgba(255,255,255,0.1)",
    inputText: "white",
    inputPlaceholder: "rgba(255,255,255,0.2)",

    // Navbar
    navBg: "rgba(8, 16, 36, 0.85)",
    navBorder: "rgba(255,255,255,0.08)",
    navText: "white",
    navTextMuted: "rgba(255,255,255,0.7)",
    navActiveClass: "bg-blue-600/20 text-blue-300",
    navHoverClass: "hover:text-white hover:bg-white/8",

    // Dropdown
    dropdownBg: "rgba(15,23,42,0.98)",
    dropdownBorder: "rgba(255,255,255,0.1)",
    dropdownShadow: "0 20px 50px rgba(0,0,0,0.5)",
    dropdownItemHover: "rgba(255,255,255,0.05)",
    dropdownItemText: "rgba(255,255,255,0.7)",

    // Section borders
    sectionBorder: "rgba(255,255,255,0.06)",

    // Badges
    badgeBg: "rgba(37,99,235,0.15)",
    badgeBorder: "rgba(37,99,235,0.3)",

    // Select option bg
    selectBg: "#0f172a",

    // Compliance section
    complianceBg: "linear-gradient(135deg, rgba(30,64,175,0.15), rgba(37,99,235,0.08))",
    complianceBorder: "rgba(37,99,235,0.2)",

    // Gradient text stays the same in both modes (looks good on both)
    gradientText: {
      background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
    },

    // Mobile menu
    mobileBorder: "rgba(255,255,255,0.06)",

    // Footer
    footerBorder: "rgba(255,255,255,0.06)",
    footerText: "rgba(148,163,184,0.7)",
    footerTextMuted: "rgba(148,163,184,0.5)",

    isDark,
  };
}
