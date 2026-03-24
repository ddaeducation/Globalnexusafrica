import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Loader2, GripVertical, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "image";
  placeholder?: string;
};

type Props = {
  title: string;
  description?: string;
  page: string;
  sectionKey: string;
  fields: FieldDef[];
  defaultItems: Record<string, string>[];
  userId: string;
  /** Template for new empty item */
  emptyItem?: Record<string, string>;
};

const AdminListEditor = ({ title, description, page, sectionKey, fields, defaultItems, userId, emptyItem }: Props) => {
  const [items, setItems] = useState<Record<string, string>[]>(defaultItems);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{ idx: number; fieldKey: string } | null>(null);

  // Load from DB on mount
  useState(() => {
    const load = async () => {
      const { data: row } = await supabase
        .from("site_content")
        .select("content")
        .eq("page", page)
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (row?.content && typeof row.content === "object" && (row.content as any).items) {
        setItems((row.content as any).items);
      }
      setLoaded(true);
    };
    load();
  });

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          page,
          section_key: sectionKey,
          content: { items } as unknown as Json,
          updated_by: userId,
        },
        { onConflict: "page,section_key" }
      );

    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: `${title} updated successfully.` });
    }
    setSaving(false);
  };

  const addItem = () => {
    const newItem = emptyItem || Object.fromEntries(fields.map((f) => [f.key, ""]));
    setItems([...items, newItem]);
    setExpandedIdx(items.length);
  };

  const removeItem = (idx: number) => {
    if (!confirm("Remove this item?")) return;
    setItems(items.filter((_, i) => i !== idx));
    setExpandedIdx(null);
  };

  const updateItem = (idx: number, key: string, value: string) => {
    setItems(items.map((item, i) => (i === idx ? { ...item, [key]: value } : item)));
  };

  const moveItem = (idx: number, direction: "up" | "down") => {
    const newItems = [...items];
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= newItems.length) return;
    [newItems[idx], newItems[target]] = [newItems[target], newItems[idx]];
    setItems(newItems);
    setExpandedIdx(target);
  };

  const triggerUpload = (idx: number, fieldKey: string) => {
    setUploadTarget({ idx, fieldKey });
    setTimeout(() => fileRef.current?.click(), 50);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }

    setUploading(uploadTarget.idx);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(`general/${fileName}`, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(`general/${fileName}`);
      updateItem(uploadTarget.idx, uploadTarget.fieldKey, urlData.publicUrl);
      toast({ title: "Uploaded!", description: "Image ready." });
    }
    setUploading(null);
    setUploadTarget(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!loaded) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex gap-2">
          <button onClick={addItem} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition">
            <Plus className="h-4 w-4" /> Add
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isExpanded = expandedIdx === idx;
          const label = item[fields[0]?.key] || `Item ${idx + 1}`;

          return (
            <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden">
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition"
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm font-medium text-foreground truncate">{label}</span>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); moveItem(idx, "up"); }} disabled={idx === 0} className="p-1 rounded hover:bg-muted disabled:opacity-30 transition">
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); moveItem(idx, "down"); }} disabled={idx === items.length - 1} className="p-1 rounded hover:bg-muted disabled:opacity-30 transition">
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); removeItem(idx); }} className="p-1 rounded hover:bg-destructive/10 text-destructive transition">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-border space-y-3">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
                      {field.type === "image" ? (
                        <div className="flex items-center gap-3">
                          {item[field.key] && (
                            <img src={item[field.key]} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                          )}
                          <div className="flex-1">
                            <input
                              type="url"
                              value={item[field.key] || ""}
                              onChange={(e) => updateItem(idx, field.key, e.target.value)}
                              placeholder="Image URL or upload"
                              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                            />
                          </div>
                          <button
                            onClick={() => triggerUpload(idx, field.key)}
                            disabled={uploading === idx}
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition shrink-0"
                          >
                            {uploading === idx ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          </button>
                        </div>
                      ) : field.type === "textarea" ? (
                        <textarea
                          value={item[field.key] || ""}
                          onChange={(e) => updateItem(idx, field.key, e.target.value)}
                          rows={3}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={item[field.key] || ""}
                          onChange={(e) => updateItem(idx, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No items yet. Click "Add" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListEditor;
