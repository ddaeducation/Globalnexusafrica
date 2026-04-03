import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, AlertCircle, CheckCircle, ArrowLeft, Save } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const ELearningProfile = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/elearning/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setUsername(profile.username || "");
        setCurrentUsername(profile.username || "");
        setFullName(profile.full_name || "");
      }
      setPageLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const trimmedUsername = username.trim().toLowerCase();

      if (trimmedUsername.length < 3) {
        throw new Error("Username must be at least 3 characters.");
      }

      if (/[^a-z0-9_.-]/.test(trimmedUsername)) {
        throw new Error("Username can only contain letters, numbers, dots, hyphens, and underscores.");
      }

      // Check uniqueness if changed
      if (trimmedUsername !== currentUsername) {
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", trimmedUsername)
          .maybeSingle();

        if (existing) {
          throw new Error("This username is already taken.");
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: trimmedUsername, full_name: fullName.trim() })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setCurrentUsername(trimmedUsername);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
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
            <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">Update your username and display name</p>
          </div>

          <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary text-sm p-3 rounded-xl">
                <CheckCircle className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
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
              <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="johndoe"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">You can use this username to log in instead of your email.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/elearning" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="h-4 w-4" />
              Back to eLearning
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ELearningProfile;
