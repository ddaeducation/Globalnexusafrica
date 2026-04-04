import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ELearningLoginProps {
  onSuccess: () => void;
}

const ELearningLogin = ({ onSuccess }: ELearningLoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolveEmail = async (input: string): Promise<string> => {
    if (input.includes("@")) return input;
    const { data, error } = await supabase.rpc("get_email_by_username", { _username: input });
    if (error || !data) throw new Error("Username not found");
    return data;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const email = await resolveEmail(emailOrUsername);
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: emailOrUsername,
        password,
        options: {
          data: { full_name: fullName, username },
          emailRedirectTo: window.location.origin + "/elearning",
        },
      });
      if (authError) throw authError;
      toast({
        title: "Check your email",
        description: "We sent you a verification link. Please verify your email to continue.",
      });
      setIsSignUp(false);
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailOrUsername, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (resetError) throw resetError;
      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
      });
      setIsForgotPassword(false);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(145deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)" }}>
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 font-display">Reset Password</h2>
            <p className="text-gray-400 text-sm mb-6">Enter your email to receive a reset link</p>
            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50" style={{ background: "linear-gradient(135deg, hsl(0,72%,56%) 0%, hsl(15,80%,55%) 100%)", boxShadow: "0 4px 20px hsla(0,72%,56%,0.4)" }}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm mt-6">
              Remember your password?{" "}
              <button onClick={() => { setIsForgotPassword(false); setError(""); }} className="text-primary hover:underline font-medium">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)" }}>
      {/* Decorative gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(0,72%,56%) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(152,55%,42%) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: "linear-gradient(135deg, hsl(0,72%,56%), hsl(15,80%,55%))" }}>
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-1 font-display italic">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {isSignUp ? "Join Global Nexus eLearning platform" : "Sign in to access courses and your learning dashboard"}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              {isSignUp ? "Create with email" : "Continue with email"}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="johndoe"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {isSignUp ? "Email" : "Email or Username"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={isSignUp ? "email" : "text"}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder={isSignUp ? "your@email.com" : "your@email.com"}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(""); }}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 mt-2"
              style={{
                background: "linear-gradient(135deg, hsl(0,72%,56%) 0%, hsl(15,80%,55%) 100%)",
                boxShadow: "0 4px 20px hsla(0,72%,56%,0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? "Creating account..." : "Signing in..."}
                </span>
              ) : (
                isSignUp ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(""); setPassword(""); setConfirmPassword(""); }}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Global Nexus Institute. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ELearningLogin;
