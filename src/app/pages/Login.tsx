import { useState } from "react";
import { Heart, Activity, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate getting login details
    console.log("Logged in with:", { email, password });
    alert(`Getting login details for \nEmail: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#060d1f" }}>
      <div 
        className="w-full max-w-md p-8 rounded-3xl"
        style={{
          background: "linear-gradient(180deg, rgba(30,58,138,0.1), rgba(0,0,0,0))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
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
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-sm text-blue-200/60">Log in to your JivanSetu account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-blue-200/80 pl-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={16} className="text-white/40" />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="donor@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-blue-200/80 pl-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={16} className="text-white/40" />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
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

        <div className="mt-6 text-center text-sm text-white/50">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
