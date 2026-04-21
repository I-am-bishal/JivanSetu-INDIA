import "./i18n/config";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useState, useEffect } from "react";
import { Heart, Activity } from "lucide-react";
import { ThemeProvider } from "./ThemeContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: "#060d1f" }}>
        <div 
          className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 relative animate-pulse"
          style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)", boxShadow: "0 10px 30px rgba(220, 38, 38, 0.3)" }}
        >
           <Heart size={40} fill="white" color="white" />
           <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
             <Activity size={14} color="white" />
           </div>
        </div>
        <div className="flex flex-col items-center">
          <span
            style={{
              fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
              fontSize: "24px",
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
              fontSize: "14px",
              color: "rgba(148,163,184,0.9)",
              letterSpacing: "0.03em",
              fontWeight: 400,
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              marginTop: "4px"
            }}
          >
            जीवनसेतु
          </span>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
