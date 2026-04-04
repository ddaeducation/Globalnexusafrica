import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, AlertCircle, Eye, EyeOff, Shield, AtSign } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const { data: roleData, error: roleError } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "admin",
      });

      if (roleError) throw roleError;

      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error("Access denied. You are not an administrator.");
      }

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "hsl(220 20% 16%)",
    border: "1px solid hsl(220 15% 22%)",
    color: "hsl(0 0% 90%)",
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "hsl(var(--primary))";
    e.target.style.boxShadow = "0 0 0 3px hsla(var(--primary) / 0.15)";
  };

  const blurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "hsl(220 15% 22%)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, hsl(220 20% 10%) 0%, hsl(220 25% 14%) 50%, hsl(220 20% 10%) 100%)",
      }}
    >
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "hsl(0 70% 50%)" }}
      />

      <div className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl border p-8 sm:p-10 shadow-2xl"
          style={{ background: "hsl(220 20% 13%)", borderColor: "hsl(220 15% 20%)" }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: "hsl(0 70% 50% / 0.12)", color: "hsl(0 70% 60%)" }}
          >
            <Shield className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-bold italic mb-1" style={{ color: "hsl(0 0% 95%)" }}>
            Admin Sign In
          </h1>
          <p className="text-sm mb-8" style={{ color: "hsl(220 10% 55%)" }}>
            Authorized personnel only — admin dashboard access
          </p>

          <div className="relative flex items-center mb-8">
            <div className="flex-1 h-px" style={{ background: "hsl(220 15% 22%)" }} />
            <span className="px-4 text-xs uppercase tracking-widest font-medium" style={{ color: "hsl(220 10% 45%)" }}>
              Continue with email
            </span>
            <div className="flex-1 h-px" style={{ background: "hsl(220 15% 22%)" }} />
          </div>

          {error && (
            <div
              className="flex items-center gap-2 text-sm p-3 rounded-xl mb-6"
              style={{ background: "hsla(0 70% 50% / 0.12)", color: "hsl(0 80% 65%)" }}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "hsl(0 0% 85%)" }}>
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 10% 45%)" }}>
                  <AtSign className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  placeholder="admin@globalnexus.africa"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: "hsl(0 0% 85%)" }}>
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium transition-colors hover:underline"
                  style={{ color: "hsl(var(--primary))" }}
                  tabIndex={-1}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 10% 45%)" }}>
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
                  style={{ color: "hsl(220 10% 45%)" }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "hsl(var(--primary) / 0.7)"
                  : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))",
                color: "hsl(0 0% 100%)",
                boxShadow: loading ? "none" : "0 4px 20px hsla(var(--primary) / 0.35)",
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "hsl(220 10% 45%)" }}>
            Global Nexus Institute — Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
