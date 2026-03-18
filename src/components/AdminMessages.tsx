import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Trash2, Mail } from "lucide-react";

type Message = {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
    if (error) toast({ title: "Error loading messages", variant: "destructive" });
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting", variant: "destructive" });
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Message deleted" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
        <span className="ml-auto text-sm text-muted-foreground">{messages.length} message{messages.length !== 1 ? "s" : ""}</span>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{msg.full_name}</span>
                    <span className="text-xs text-muted-foreground">{msg.email}</span>
                  </div>
                  {msg.subject && <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>}
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(msg.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
