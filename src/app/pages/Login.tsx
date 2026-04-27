import { useState } from "react";
import { Heart, Activity, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useThemeStyles } from "../ThemeContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useThemeStyles();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success — persist auth state and redirect to User Dashboard
    localStorage.setItem("jivansetu_logged_in", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300" style={{ background: styles.pageBg }}>
      <div 
        className="w-full max-w-md p-8 rounded-3xl"
        style={{
          background: styles.isDark ? "linear-gradient(180deg, rgba(30,58,138,0.1), rgba(0,0,0,0))" : "linear-gradient(180deg, rgba(37,99,235,0.05), rgba(255,255,255,0))",
          border: `1px solid ${styles.cardBorder}`,
          boxShadow: styles.isDark ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.05)"
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div 
            className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4 relative"
            style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
          >
             <Heart size={28} fill="white" color="white" />
             <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
               <Activity size={10} color="white" />
             </div>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: styles.textPrimary }}>Welcome Back</h2>
          <p className="text-sm" style={{ color: styles.textSecondary }}>Log in to your JivanSetu account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium pl-1" style={{ color: styles.textLabel }}>Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={16} style={{ color: styles.textMuted }} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="donor@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  background: styles.inputBg,
                  border: `1px solid ${styles.inputBorder}`,
                  color: styles.inputText,
                }}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium pl-1" style={{ color: styles.textLabel }}>Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={16} style={{ color: styles.textMuted }} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  background: styles.inputBg,
                  border: `1px solid ${styles.inputBorder}`,
                  color: styles.inputText,
                }}
              />
            </div>
            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold text-white mt-6 flex items-center justify-center gap-2 group transition-all"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 8px 20px rgba(37,99,235,0.25)" }}
          >
            Log In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm" style={{ color: styles.textMuted }}>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium transition-colors" style={{ color: styles.textLabel }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
