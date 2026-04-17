import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { SOSTicker } from "./SOSTicker";
import { SevaAIWidget } from "./SevaAIWidget";

export function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#060d1f",
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      <SOSTicker />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SevaAIWidget />
    </div>
  );
}
