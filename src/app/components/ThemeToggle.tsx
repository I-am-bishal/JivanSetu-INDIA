import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("jivansetu-theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("jivansetu-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: theme === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)",
        border: theme === "dark"
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.1)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={18}
          className="absolute inset-0 transition-all duration-300"
          style={{
            opacity: theme === "light" ? 1 : 0,
            transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
            color: "#f59e0b",
          }}
        />
        <Moon
          size={18}
          className="absolute inset-0 transition-all duration-300"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
            color: "#93c5fd",
          }}
        />
      </div>
    </button>
  );
}
