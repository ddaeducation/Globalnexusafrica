import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const ELearningLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let email = identifier.trim();

      // If identifier doesn't contain @, treat as username
      if (!email.includes("@")) {
        const { data: resolvedEmail, error: rpcError } = await supabase.rpc("get_email_by_username", {
          _username: email,
        });
        if (rpcError || !resolvedEmail) {
          throw new Error("Username not found. Please check and try again.");
        }
        email = resolvedEmail;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      navigate("/elearning");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageSEO title="eLearning Login" description="Sign in to the Global Nexus Institute eLearning platform." path="/elearning/login" />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">eLearning Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Global Nexus Institute</p>
          </div>

          <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username or Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="username or email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center space-y-2 text-sm">
              <Link to="/elearning/forgot-password" className="text-primary hover:underline block">
                Forgot password?
              </Link>
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/elearning/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ELearningLogin;
