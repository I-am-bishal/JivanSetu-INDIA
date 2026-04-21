import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("jivansetu-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("jivansetu-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/* ─── Theme-aware style helpers ─── */
export function useThemeStyles() {
  const { isDark } = useTheme();

  return {
    // Page backgrounds
    pageBg: isDark ? "#060d1f" : "#f8fafc",
    pageColor: isDark ? "white" : "#0f172a",

    // Card styles
    cardBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    cardHoverBg: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",

    // Text colors
    textPrimary: isDark ? "white" : "#0f172a",
    textSecondary: isDark ? "rgba(148,163,184,0.85)" : "#475569",
    textMuted: isDark ? "rgba(148,163,184,0.6)" : "#94a3b8",
    textLabel: isDark ? "#93c5fd" : "#2563eb",

    // Input styles
    inputBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)",
    inputText: isDark ? "white" : "#0f172a",
    inputPlaceholder: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",

    // Navbar
    navBg: isDark ? "rgba(8, 16, 36, 0.85)" : "rgba(255, 255, 255, 0.85)",
    navBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    navText: isDark ? "white" : "#0f172a",
    navTextMuted: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    navActiveClass: isDark ? "bg-blue-600/20 text-blue-300" : "bg-blue-600/15 text-blue-700",
    navHoverClass: isDark ? "hover:text-white hover:bg-white/8" : "hover:text-black hover:bg-black/5",

    // Dropdown
    dropdownBg: isDark ? "rgba(15,23,42,0.98)" : "rgba(255,255,255,0.98)",
    dropdownBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    dropdownShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(0,0,0,0.15)",
    dropdownItemHover: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    dropdownItemText: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",

    // Section borders
    sectionBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",

    // Badges
    badgeBg: isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.1)",
    badgeBorder: isDark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.25)",

    // Select option bg
    selectBg: isDark ? "#0f172a" : "#ffffff",

    // Compliance section
    complianceBg: isDark
      ? "linear-gradient(135deg, rgba(30,64,175,0.15), rgba(37,99,235,0.08))"
      : "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(59,130,246,0.04))",
    complianceBorder: isDark ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.15)",

    // Gradient text stays the same in both modes (looks good on both)
    gradientText: {
      background: isDark
        ? "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)"
        : "linear-gradient(90deg, #2563eb, #7c3aed, #db2777)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
    },

    // Mobile menu
    mobileBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",

    // Footer
    footerBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    footerText: isDark ? "rgba(148,163,184,0.7)" : "#64748b",
    footerTextMuted: isDark ? "rgba(148,163,184,0.5)" : "#94a3b8",

    isDark,
  };
}
