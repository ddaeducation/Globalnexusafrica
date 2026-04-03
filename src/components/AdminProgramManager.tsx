import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from "lucide-react";

type Program = {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  focus: string;
  tools: string;
  price: string;
  lms_url: string;
  pay_url: string;
  accent: string;
  sort_order: number;
};

const accentOptions = [
  { value: "from-red-500 to-orange-400", label: "Red → Orange" },
  { value: "from-blue-500 to-cyan-400", label: "Blue → Cyan" },
  { value: "from-purple-500 to-pink-400", label: "Purple → Pink" },
  { value: "from-green-500 to-emerald-400", label: "Green → Emerald" },
  { value: "from-orange-500 to-amber-400", label: "Orange → Amber" },
  { value: "from-pink-500 to-rose-400", label: "Pink → Rose" },
  { value: "from-indigo-500 to-blue-400", label: "Indigo → Blue" },
  { value: "from-teal-500 to-cyan-400", label: "Teal → Cyan" },
];

const emptyProgram: Omit<Program, "id"> = {
  title: "",
  level: "Intermediate",
  description: "",
  duration: "",
  focus: "",
  tools: "",
  price: "",
  lms_url: "/elearning",
  pay_url: "https://store.pesapal.com/globalnexusinstituteltd",
  accent: "from-red-500 to-orange-400",
  sort_order: 0,
};

const AdminProgramManager = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Program, "id">>(emptyProgram);
  const [isCreating, setIsCreating] = useState(false);

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setPrograms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const startEdit = (program: Program) => {
    setEditingId(program.id);
    setIsCreating(false);
    const { id, ...rest } = program;
    setFormData(rest);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ ...emptyProgram, sort_order: programs.length + 1 });
  };

  const cancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData(emptyProgram);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);

    if (isCreating) {
      const { error } = await supabase.from("programs").insert(formData);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Created!", description: "Program added successfully." });
        setIsCreating(false);
      }
    } else if (editingId) {
      const { error } = await supabase.from("programs").update(formData).eq("id", editingId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Saved!", description: "Program updated successfully." });
        setEditingId(null);
      }
    }

    setFormData(emptyProgram);
    setSaving(false);
    fetchPrograms();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Program removed." });
      fetchPrograms();
    }
  };

  const updateField = (key: keyof Omit<Program, "id">, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const isEditing = editingId !== null || isCreating;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Programs</h1>
          <p className="text-sm text-muted-foreground">Add, edit, or remove programs displayed on the site.</p>
        </div>
        {!isEditing && (
          <button onClick={startCreate} className="btn-primary flex items-center gap-2 text-sm !px-5 !py-2.5">
            <Plus className="h-4 w-4" /> Add Program
          </button>
        )}
      </div>

      {/* Editor Form */}
      {isEditing && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground text-lg">
            {isCreating ? "New Program" : "Edit Program"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
              <input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="e.g. Professional Data Analytics"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="Program description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Level</label>
              <input
                value={formData.level}
                onChange={(e) => updateField("level", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="Intermediate"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Duration</label>
              <input
                value={formData.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="3 months"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Focus Area</label>
              <input
                value={formData.focus}
                onChange={(e) => updateField("focus", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="Data Analysis Tools"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tools</label>
              <input
                value={formData.tools}
                onChange={(e) => updateField("tools", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="Python, Excel, PowerBI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Price</label>
              <input
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                placeholder="$120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => updateField("sort_order", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">LMS URL</label>
              <input
                type="url"
                value={formData.lms_url}
                onChange={(e) => updateField("lms_url", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Payment URL</label>
              <input
                type="url"
                value={formData.pay_url}
                onChange={(e) => updateField("pay_url", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Color Accent</label>
              <select
                value={formData.accent}
                onChange={(e) => updateField("accent", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
              >
                {accentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isCreating ? "Create Program" : "Save Changes"}
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Program List */}
      <div className="space-y-3">
        {programs.map((program) => (
          <div
            key={program.id}
            className={`bg-card border rounded-2xl p-5 flex items-center gap-4 transition ${
              editingId === program.id ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
          >
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${program.accent} shrink-0`} />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{program.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {program.duration} · {program.price} · {program.level}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(program)}
                disabled={isEditing}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition disabled:opacity-30"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(program.id, program.title)}
                disabled={isEditing}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition disabled:opacity-30"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {programs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No programs yet. Click "Add Program" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProgramManager;
