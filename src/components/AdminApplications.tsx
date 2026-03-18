import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Eye, Trash2, X, Users, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Application = {
  id: string;
  full_name: string;
  gender: string;
  date_of_birth: string | null;
  nationality: string;
  phone_number: string;
  email: string;
  home_address: string;
  district: string;
  location_type: string;
  highest_education: string;
  program_applying_for: string;
  employment_status: string;
  monthly_income_range: string;
  has_disability: boolean;
  created_at: string;
};

const fieldLabels: Record<string, string> = {
  full_name: "Full Name",
  gender: "Gender",
  date_of_birth: "Date of Birth",
  nationality: "Nationality",
  phone_number: "Phone Number",
  email: "Email Address",
  home_address: "Home Address",
  district: "District",
  location_type: "Location Type",
  highest_education: "Highest Education",
  program_applying_for: "Program",
  employment_status: "Employment Status",
  monthly_income_range: "Monthly Income",
  has_disability: "Has Disability",
  created_at: "Submitted At",
};

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load applications.", variant: "destructive" });
    } else {
      setApplications((data as Application[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete application.", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Application removed." });
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.full_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.program_applying_for.toLowerCase().includes(q)
    );
  });

  const formatValue = (key: string, value: unknown) => {
    if (key === "has_disability") return value ? "Yes" : "No";
    if (key === "created_at" && typeof value === "string") return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    if (key === "date_of_birth" && typeof value === "string") return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    if (!value) return "—";
    return String(value);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Users className="h-6 w-6" /> Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            {applications.length} total application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, email, or program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>{search ? "No applications match your search." : "No applications yet."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground truncate">{app.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {app.program_applying_for} · {app.email}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(app.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button
                  onClick={() => setSelected(app)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card rounded-t-2xl">
              <h3 className="font-bold text-foreground text-lg">{selected.full_name}</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-muted transition">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(fieldLabels).map(([key, label]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide sm:w-40 shrink-0">
                    {label}
                  </span>
                  <span className="text-sm text-foreground">
                    {formatValue(key, selected[key as keyof Application])}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => handleDelete(selected.id)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setSelected(null)}
                className="btn-primary text-sm !px-5 !py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
