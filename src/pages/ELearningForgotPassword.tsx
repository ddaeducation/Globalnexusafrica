import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const ELearningForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/elearning/reset-password`,
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your password.
          </p>
          <Link to="/elearning/login" className="btn-primary inline-flex items-center gap-2">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO title="Forgot Password" description="Reset your eLearning account password." path="/elearning/forgot-password" />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              <Link to="/elearning/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ELearningForgotPassword;
