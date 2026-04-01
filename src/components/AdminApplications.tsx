import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Users, Search, Download, X } from "lucide-react";
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
  custom_answers: Record<string, string> | null;
  created_at: string;
};

const columns: { key: string; label: string; width: string }[] = [
  { key: "full_name", label: "Full Name", width: "180px" },
  { key: "gender", label: "Gender", width: "90px" },
  { key: "date_of_birth", label: "DOB", width: "110px" },
  { key: "email", label: "Email", width: "200px" },
  { key: "phone_number", label: "Phone", width: "140px" },
  { key: "nationality", label: "Nationality", width: "120px" },
  { key: "district", label: "District", width: "110px" },
  { key: "location_type", label: "Location", width: "100px" },
  { key: "home_address", label: "Address", width: "180px" },
  { key: "highest_education", label: "Education", width: "140px" },
  { key: "program_applying_for", label: "Program", width: "180px" },
  { key: "employment_status", label: "Employment", width: "130px" },
  { key: "monthly_income_range", label: "Income", width: "130px" },
  { key: "has_disability", label: "Disability", width: "90px" },
  { key: "created_at", label: "Submitted", width: "140px" },
];

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => { fetchApplications(); }, []);

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`Delete ${ids.length} application(s)?`)) return;
    for (const id of ids) {
      await supabase.from("applications").delete().eq("id", id);
    }
    setApplications(prev => prev.filter(a => !ids.includes(a.id)));
    setSelected(new Set());
    toast({ title: "Deleted", description: `${ids.length} application(s) removed.` });
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      (a.full_name || "").toLowerCase().includes(q) ||
      (a.email || "").toLowerCase().includes(q) ||
      (a.program_applying_for || "").toLowerCase().includes(q)
    );
  });

  const formatCell = (key: string, value: unknown, app?: Application): string => {
    if (key === "has_disability") return value ? "Yes" : "No";
    if (key === "created_at" && typeof value === "string")
      return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    if (key === "date_of_birth" && typeof value === "string")
      return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    if (key === "full_name" && (!value || !String(value).trim())) return app?.email || "Unknown";
    if (!value && value !== false) return "—";
    if (typeof value === "string" && !value.trim()) return "—";
    return String(value);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(a => a.id)));
    }
  };

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headerRow = columns.map(c => c.label).join(",");
    const rows = filtered.map(app =>
      columns.map(col => {
        const val = formatCell(col.key, app[col.key as keyof Application]);
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(",")
    );
    const csv = [headerRow, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Users className="h-6 w-6" /> Applications
          </h1>
          <p className="text-sm text-gray-500">
            {applications.length} total · {filtered.length} shown
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={() => handleDelete(Array.from(selected))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <Trash2 className="h-4 w-4" /> Delete ({selected.size})
            </button>
          )}
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2.5 disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>{search ? "No applications match your search." : "No applications yet."}</p>
        </div>
      ) : (
        <div
          ref={tableRef}
          className="bg-white border border-gray-200 rounded-xl overflow-auto shadow-sm"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          <table className="text-sm border-collapse" style={{ minWidth: "1800px" }}>
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 py-3 w-10 text-center sticky left-0 bg-gray-50 z-20">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-3 py-3 w-10 text-center bg-gray-50">#</th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="px-3 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap"
                    style={{ minWidth: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-3 py-3 w-12 bg-gray-50 sticky right-0 z-20" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, idx) => (
                <tr
                  key={app.id}
                  className={`border-b border-gray-100 hover:bg-blue-50/40 transition ${
                    selected.has(app.id) ? "bg-blue-50/60" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 text-center sticky left-0 bg-white z-10">
                    <input
                      type="checkbox"
                      checked={selected.has(app.id)}
                      onChange={() => toggleSelect(app.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-400 text-xs font-mono">
                    {idx + 1}
                  </td>
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="px-3 py-2.5 text-gray-700 whitespace-nowrap truncate max-w-[220px]"
                      title={formatCell(col.key, app[col.key as keyof Application], app)}
                    >
                      {formatCell(col.key, app[col.key as keyof Application], app)}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-center sticky right-0 bg-white z-10">
                    <button
                      onClick={() => handleDelete([app.id])}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
