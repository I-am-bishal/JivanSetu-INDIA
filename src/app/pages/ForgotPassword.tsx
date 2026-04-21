import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Mail, Lock, ArrowRight, ArrowLeft, Heart, Activity, CheckCircle, KeyRound, Eye, EyeOff } from "lucide-react";

type Step = "email" | "otp" | "reset" | "success";

export function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOTPChange = (idx: number, val: string) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) {
      document.getElementById(`fp-otp-${idx + 1}`)?.focus();
    }
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (otp.join("").length === 6) setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword && password.length >= 8) {
      setStep("success");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#060d1f" }}>
      <div
        className="w-full max-w-md p-8 rounded-3xl"
        style={{
          background: "linear-gradient(180deg, rgba(30,58,138,0.1), rgba(0,0,0,0))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4 relative"
            style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}>
            <Heart size={28} fill="white" color="white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
              <Activity size={10} color="white" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Email */}
          {step === "email" && (
            <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
                <p className="text-sm text-blue-200/60">Enter your registered email to receive a reset OTP</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-blue-200/80 pl-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail size={16} className="text-white/40" />
                    </div>
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-white mt-4 flex items-center justify-center gap-2 group transition-all"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 8px 20px rgba(37,99,235,0.25)" }}
                >
                  Send OTP
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-white/50">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Log in</Link>
              </div>
            </motion.div>
          )}

          {/* STEP 2: OTP */}
          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                  <KeyRound size={24} color="white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Verify OTP</h2>
                <p className="text-sm text-blue-200/60">
                  Enter the 6-digit code sent to <span className="text-blue-400">{email}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <CheckCircle size={14} className="text-green-400" />
                <p style={{ fontSize: "12px", color: "#6ee7b7" }}>OTP sent to {email}</p>
              </div>

              <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)" }} className="block mb-3">
                Enter 6-Digit OTP
              </label>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`fp-otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(i, e.target.value)}
                    className="w-12 h-12 text-center rounded-xl text-white font-bold outline-none transition-all"
                    style={{
                      background: digit ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)",
                      border: digit ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.1)",
                      fontSize: "20px",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.join("").length < 6}
                className="w-full py-3.5 rounded-xl text-white font-semibold transition-all disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #065f46, #059669)", fontSize: "15px" }}
              >
                <CheckCircle className="inline mr-2" size={16} /> Verify & Continue
              </button>

              <button onClick={() => setStep("email")} className="w-full mt-3 py-2.5 text-white/50 hover:text-white/80 transition-all flex items-center justify-center gap-1"
                style={{ fontSize: "13px" }}>
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {/* STEP 3: New Password */}
          {step === "reset" && (
            <motion.div key="reset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Create New Password</h2>
                <p className="text-sm text-blue-200/60">Choose a strong password for your account</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-blue-200/80 pl-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock size={16} className="text-white/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      minLength={8}
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/70">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-blue-200/80 pl-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock size={16} className="text-white/40" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      minLength={8}
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder-white/20 transition-all focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/70">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p style={{ fontSize: "11px", color: "#fca5a5", marginTop: "4px" }}>Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!password || password !== confirmPassword || password.length < 8}
                  className="w-full py-3.5 rounded-xl font-semibold text-white mt-4 flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 8px 20px rgba(37,99,235,0.25)" }}
                >
                  Reset Password
                  <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "linear-gradient(135deg, #065f46, #059669)", boxShadow: "0 0 30px rgba(5,150,105,0.4)" }}
              >
                <CheckCircle size={30} color="white" />
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">Password Reset Successful!</h2>
              <p className="text-sm text-green-300/80 mb-6">Your password has been updated. You can now log in with your new password.</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", fontSize: "14px" }}
              >
                <ArrowRight size={16} /> Go to Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
