import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Loader2, Plus, Trash2, GripVertical, Save, FileQuestion,
  ArrowUp, ArrowDown, ToggleLeft, ToggleRight,
} from "lucide-react";

type CustomQuestion = {
  id: string;
  question_text: string;
  question_type: "text" | "textarea";
  is_required: boolean;
  sort_order: number;
  created_at: string;
};

const AdminFormQuestions = () => {
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newType, setNewType] = useState<"text" | "textarea">("text");
  const [newRequired, setNewRequired] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("custom_questions")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "Failed to load questions.", variant: "destructive" });
    } else {
      setQuestions((data as CustomQuestion[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleAdd = async () => {
    if (!newQuestion.trim()) {
      toast({ title: "Error", description: "Please enter a question.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const maxOrder = questions.length > 0 ? Math.max(...questions.map(q => q.sort_order)) : -1;
    const { error } = await supabase.from("custom_questions").insert({
      question_text: newQuestion.trim(),
      question_type: newType,
      is_required: newRequired,
      sort_order: maxOrder + 1,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to add question.", variant: "destructive" });
    } else {
      toast({ title: "Added", description: "Question added successfully." });
      setNewQuestion("");
      setNewRequired(false);
      setNewType("text");
      await fetchQuestions();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    const { error } = await supabase.from("custom_questions").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    } else {
      setQuestions(prev => prev.filter(q => q.id !== id));
      toast({ title: "Deleted", description: "Question removed." });
    }
  };

  const handleToggleRequired = async (q: CustomQuestion) => {
    const { error } = await supabase
      .from("custom_questions")
      .update({ is_required: !q.is_required })
      .eq("id", q.id);
    if (!error) {
      setQuestions(prev => prev.map(x => x.id === q.id ? { ...x, is_required: !x.is_required } : x));
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= questions.length) return;

    const updated = [...questions];
    const tempOrder = updated[index].sort_order;
    updated[index].sort_order = updated[swapIndex].sort_order;
    updated[swapIndex].sort_order = tempOrder;
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];

    setQuestions(updated);

    await Promise.all([
      supabase.from("custom_questions").update({ sort_order: updated[index].sort_order }).eq("id", updated[index].id),
      supabase.from("custom_questions").update({ sort_order: updated[swapIndex].sort_order }).eq("id", updated[swapIndex].id),
    ]);
  };

  const handleUpdateText = async (id: string, text: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, question_text: text } : q));
  };

  const handleSaveText = async (id: string) => {
    const q = questions.find(x => x.id === id);
    if (!q) return;
    const { error } = await supabase.from("custom_questions").update({ question_text: q.question_text }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Question updated." });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <FileQuestion className="h-6 w-6" /> Application Form Questions
        </h1>
        <p className="text-sm text-muted-foreground">
          Add custom questions that appear on the public application form. {questions.length} custom question{questions.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {/* Add New Question */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6 space-y-4">
        <h3 className="font-semibold text-foreground text-sm">Add New Question</h3>
        <input
          type="text"
          placeholder="Enter your question..."
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
        />
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">Type:</label>
            <select
              value={newType}
              onChange={e => setNewType(e.target.value as "text" | "textarea")}
              className="px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="text">Short Text</option>
              <option value="textarea">Long Text</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => setNewRequired(!newRequired)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition"
          >
            {newRequired ? <ToggleRight className="h-4 w-4 text-primary" /> : <ToggleLeft className="h-4 w-4" />}
            {newRequired ? "Required" : "Optional"}
          </button>
          <button
            onClick={handleAdd}
            disabled={saving || !newQuestion.trim()}
            className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2 disabled:opacity-50 ml-auto"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add Question
          </button>
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileQuestion className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No custom questions yet. Add one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 pt-1 text-muted-foreground shrink-0">
                <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="hover:text-foreground disabled:opacity-30 transition">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <GripVertical className="h-4 w-4 opacity-40" />
                <button onClick={() => handleMove(i, "down")} disabled={i === questions.length - 1} className="hover:text-foreground disabled:opacity-30 transition">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <input
                  value={q.question_text}
                  onChange={e => handleUpdateText(q.id, e.target.value)}
                  onBlur={() => handleSaveText(q.id)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-md bg-muted font-medium">{q.question_type === "textarea" ? "Long Text" : "Short Text"}</span>
                  <button onClick={() => handleToggleRequired(q)} className="flex items-center gap-1 hover:text-foreground transition">
                    {q.is_required ? <ToggleRight className="h-3.5 w-3.5 text-primary" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                    {q.is_required ? "Required" : "Optional"}
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleDelete(q.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition shrink-0"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFormQuestions;
