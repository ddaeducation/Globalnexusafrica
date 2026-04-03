import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const ELearningSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const navigate = useNavigate();

  const checkUsername = async (value: string) => {
    if (!value.trim()) {
      setUsernameStatus("idle");
      return;
    }
    setUsernameStatus("checking");
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .ilike("username", value.trim())
      .maybeSingle();
    setUsernameStatus(data ? "taken" : "available");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate username uniqueness if provided
      const trimmedUsername = username.trim();
      if (trimmedUsername) {
        if (trimmedUsername.length < 3) {
          throw new Error("Username must be at least 3 characters.");
        }
        if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
          throw new Error("Username can only contain letters, numbers, and underscores.");
        }
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .ilike("username", trimmedUsername)
          .maybeSingle();
        if (existing) {
          throw new Error("This username is already taken. Please choose another.");
        }
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: window.location.origin + "/elearning/login",
          data: {
            full_name: fullName.trim(),
            username: trimmedUsername || null,
          },
        },
      });

      if (authError) throw authError;

      if (data.user) {
        // Create profile with username
        const profileUsername = trimmedUsername || data.user.id.slice(0, 8);
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName.trim(),
          username: profileUsername,
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation link to <strong>{email}</strong>. Please verify your email to continue.
          </p>
          <Link
            to="/elearning/login"
            className="btn-primary inline-flex items-center gap-2"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title="eLearning Sign Up"
        description="Create an account on the Global Nexus Institute eLearning platform."
        path="/elearning/signup"
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Global Nexus Institute eLearning
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5"
          >
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Username{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    checkUsername(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="your_username"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {usernameStatus === "checking" && "Checking availability..."}
                {usernameStatus === "available" && (
                  <span className="text-green-600">✓ Username is available</span>
                )}
                {usernameStatus === "taken" && (
                  <span className="text-destructive">✗ Username is already taken</span>
                )}
                {usernameStatus === "idle" &&
                  "Choose a username to log in with instead of email. Letters, numbers, and underscores only."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || usernameStatus === "taken"}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/elearning/login"
                className="text-primary hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ELearningSignup;
