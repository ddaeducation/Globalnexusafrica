import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Trash2, Users, Download } from "lucide-react";

type Subscriber = { id: string; email: string; created_at: string };

const AdminSubscribers = () => {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
    if (data) setSubs(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("subscribers").delete().eq("id", id);
    setSubs((p) => p.filter((s) => s.id !== id));
    toast({ title: "Subscriber removed" });
  };

  const exportCSV = () => {
    if (!subs.length) return;
    const csv = ["Email,Subscribed At", ...subs.map((s) => `"${s.email}","${new Date(s.created_at).toLocaleString()}"`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Subscribers</h1>
        <span className="text-sm text-muted-foreground">{subs.length} subscriber{subs.length !== 1 ? "s" : ""}</span>
        {subs.length > 0 && (
          <button onClick={exportCSV} className="ml-auto flex items-center gap-2 text-sm text-primary hover:underline">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        )}
      </div>

      {subs.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No subscribers yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-5 py-3 font-medium text-muted-foreground">Email</th>
                <th className="px-5 py-3 font-medium text-muted-foreground">Date</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition">
                  <td className="px-5 py-3 text-foreground">{s.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition">
                      <Trash2 className="h-4 w-4" />
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

export default AdminSubscribers;
