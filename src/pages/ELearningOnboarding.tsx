import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, Loader2, AlertCircle } from "lucide-react";
import PageSEO from "@/components/PageSEO";

type CustomQuestion = {
  id: string;
  question_text: string;
  question_type: "text" | "textarea";
  is_required: boolean;
  sort_order: number;
};

const ELearningOnboarding = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/elearning/login");
        return;
      }

      // Check if already completed
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile?.onboarding_completed) {
        navigate("/elearning");
        return;
      }

      const { data } = await supabase
        .from("custom_questions")
        .select("*")
        .order("sort_order");

      if (data && data.length > 0) {
        setQuestions(data as CustomQuestion[]);
      } else {
        // No questions configured, mark complete and redirect
        await supabase
          .from("profiles")
          .update({ onboarding_completed: true })
          .eq("id", session.user.id);
        navigate("/elearning");
        return;
      }
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const missing = questions.filter(q => q.is_required && !answers[q.id]?.trim());
    if (missing.length > 0) {
      setError(`Please answer: ${missing.map(q => q.question_text).join(", ")}`);
      return;
    }

    setSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Upsert all answers
      const rows = questions
        .filter(q => answers[q.id]?.trim())
        .map(q => ({
          user_id: session.user.id,
          question_id: q.id,
          answer: answers[q.id].trim(),
        }));

      if (rows.length > 0) {
        const { error: insertError } = await supabase
          .from("elearning_user_answers")
          .upsert(rows, { onConflict: "user_id,question_id" });
        if (insertError) throw insertError;
      }

      // Mark onboarding complete
      await supabase
        .from("profiles")
        .update({ onboarding_completed: true } as any)
        .eq("id", session.user.id);

      navigate("/elearning");
    } catch (err: any) {
      setError(err.message || "Failed to save answers");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm";

  return (
    <>
      <PageSEO title="Complete Your Profile" description="Answer a few questions to get started." path="/elearning/onboarding" />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Almost There!</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Please answer these questions to complete your setup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {questions.map(q => (
              <div key={q.id}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {q.question_text} {q.is_required && <span className="text-destructive">*</span>}
                </label>
                {q.question_type === "textarea" ? (
                  <textarea
                    className={inputClass + " min-h-[80px] resize-none"}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    required={q.is_required}
                    rows={3}
                  />
                ) : (
                  <input
                    className={inputClass}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    required={q.is_required}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {submitting ? "Saving..." : "Continue to eLearning"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ELearningOnboarding;
