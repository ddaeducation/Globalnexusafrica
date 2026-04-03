import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, AlertCircle, CheckCircle, ArrowLeft, Info } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const ELearningProfile = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isSetup = searchParams.get("setup") === "true";
    setIsSetupMode(isSetup);

    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/elearning/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile) {
        setUsername(profile.username || "");
        setCurrentUsername(profile.username || "");
        setFullName(profile.full_name || "");
      }
      setPageLoading(false);
    };
    loadProfile();
  }, [navigate, searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const trimmed = username.trim();
      if (trimmed.length < 3) throw new Error("Username must be at least 3 characters.");
      if (/[^a-zA-Z0-9_.]/.test(trimmed)) throw new Error("Username can only contain letters, numbers, underscores, and dots.");

      if (trimmed.toLowerCase() !== currentUsername.toLowerCase()) {
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .ilike("username", trimmed)
          .maybeSingle();
        if (existing) throw new Error("This username is already taken.");
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: trimmed, full_name: fullName.trim() })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      setCurrentUsername(trimmed);
      setSuccess("Profile updated successfully!");

      if (isSetupMode) {
        setTimeout(() => navigate("/elearning"), 1000);
      }
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <PageSEO title="eLearning Profile" description="Manage your eLearning profile." path="/elearning/profile" />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isSetupMode ? "Set Up Your Profile" : "Your Profile"}
            </h1>
            {isSetupMode && (
              <p className="text-muted-foreground text-sm mt-1">
                Please choose a unique username to continue.
              </p>
            )}
          </div>

          <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            {isSetupMode && (
              <div className="flex items-start gap-2 bg-primary/5 text-foreground text-sm p-3 rounded-xl">
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>Welcome! Please set your name and choose a unique username to get started.</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 text-sm p-3 rounded-xl">
                <CheckCircle className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="johndoe"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Letters, numbers, underscores, dots. Min 3 characters.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Saving..." : isSetupMode ? "Save & Continue" : "Save Profile"}
            </button>

            {!isSetupMode && (
              <Link
                to="/elearning"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to eLearning
              </Link>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ELearningProfile;
