import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, Users, Mail, CheckCircle } from "lucide-react";

type Subscriber = { id: string; email: string; created_at: string };

const AdminSendMessage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientMode, setRecipientMode] = useState<"all" | "selected">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sentCount, setSentCount] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
      if (data) setSubscribers(data);
      setLoading(false);
    };
    load();
  }, []);

  const toggleSubscriber = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === subscribers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(subscribers.map(s => s.id)));
    }
  };

  const recipients = recipientMode === "all"
    ? subscribers
    : subscribers.filter(s => selectedIds.has(s.id));

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in subject and message.", variant: "destructive" });
      return;
    }
    if (recipients.length === 0) {
      toast({ title: "No recipients", description: "Please select at least one subscriber.", variant: "destructive" });
      return;
    }

    if (!confirm(`Send message to ${recipients.length} subscriber(s)?`)) return;

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-subscriber-message", {
        body: {
          subject: subject.trim(),
          message: message.trim(),
          recipientEmails: recipients.map(r => r.email),
        },
      });

      if (error) throw error;

      setSentCount(recipients.length);
      toast({ title: "Messages sent!", description: `Sent to ${recipients.length} subscriber(s).` });
      setSubject("");
      setMessage("");
      setSelectedIds(new Set());
    } catch (err: any) {
      toast({ title: "Send failed", description: err.message || "Failed to send messages.", variant: "destructive" });
    }
    setSending(false);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Mail className="h-6 w-6" /> Send Message
        </h1>
        <p className="text-sm text-gray-500">
          Compose and send messages to your subscribers ({subscribers.length} total).
        </p>
      </div>

      {sentCount !== null && (
        <div className="mb-5 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-800">
            Message successfully sent to <strong>{sentCount}</strong> subscriber(s).
          </p>
          <button onClick={() => setSentCount(null)} className="ml-auto text-green-600 hover:text-green-800 text-sm font-medium">
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. New program announcement"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {/* Recipients */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Recipients</label>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setRecipientMode("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                recipientMode === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 hover:text-gray-900"
              }`}
            >
              <Users className="h-3.5 w-3.5" /> All Subscribers ({subscribers.length})
            </button>
            <button
              onClick={() => setRecipientMode("selected")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                recipientMode === "selected"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 hover:text-gray-900"
              }`}
            >
              Choose Specific
              {recipientMode === "selected" && selectedIds.size > 0 && ` (${selectedIds.size})`}
            </button>
          </div>

          {recipientMode === "selected" && (
            <div className="border border-gray-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 sticky top-0">
                <input
                  type="checkbox"
                  checked={selectedIds.size === subscribers.length && subscribers.length > 0}
                  onChange={toggleAll}
                  className="rounded border-gray-300"
                />
                <span className="text-xs text-gray-500 font-medium">Select All</span>
              </div>
              {subscribers.map(s => (
                <label
                  key={s.id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(s.id)}
                    onChange={() => toggleSubscriber(s.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{s.email}</span>
                </label>
              ))}
              {subscribers.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No subscribers yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Send Button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            {recipients.length} recipient(s) will receive this message.
          </p>
          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !message.trim() || recipients.length === 0}
            className="btn-primary flex items-center gap-2 text-sm !px-6 !py-2.5 disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSendMessage;
