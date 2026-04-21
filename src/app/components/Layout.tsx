import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { SOSTicker } from "./SOSTicker";
import { SevaAIWidget } from "./SevaAIWidget";
import { Footer } from "./Footer";
import { useThemeStyles } from "../ThemeContext";

export function Layout() {
  const styles = useThemeStyles();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        background: styles.pageBg,
        color: styles.pageColor,
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      <SOSTicker />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SevaAIWidget />
    </div>
  );
}
