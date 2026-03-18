import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Loader2, Upload, Trash2, Image as ImageIcon, Copy, FolderOpen,
} from "lucide-react";

type StorageFile = {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string } | null;
};

const FOLDERS = [
  { key: "general", label: "Site-wide Images" },
  { key: "programs", label: "Program Images" },
  { key: "form-header", label: "Application Form Header" },
];

const AdminImageManager = () => {
  const [activeFolder, setActiveFolder] = useState("general");
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("site-images")
      .list(activeFolder, { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    if (error) {
      toast({ title: "Error", description: "Failed to load images.", variant: "destructive" });
      setFiles([]);
    } else {
      setFiles((data as StorageFile[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, [activeFolder]);

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from("site-images").getPublicUrl(`${activeFolder}/${name}`);
    return data.publicUrl;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(`${activeFolder}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uploaded!", description: "Image uploaded successfully." });
      await fetchFiles();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.storage
      .from("site-images")
      .remove([`${activeFolder}/${name}`]);

    if (error) {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    } else {
      setFiles(prev => prev.filter(f => f.name !== name));
      toast({ title: "Deleted", description: "Image removed." });
    }
  };

  const handleCopyUrl = (name: string) => {
    const url = getPublicUrl(name);
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <ImageIcon className="h-6 w-6" /> Image Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage images for your site.
          </p>
        </div>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2.5 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload Image
          </button>
        </div>
      </div>

      {/* Folder Tabs */}
      <div className="flex gap-2 mb-5">
        {FOLDERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFolder(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeFolder === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderOpen className="h-3.5 w-3.5" />
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No images in this folder yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map(file => (
            <div key={file.name} className="bg-card border border-border rounded-xl overflow-hidden group">
              <div className="aspect-video relative bg-muted">
                <img
                  src={getPublicUrl(file.name)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyUrl(file.name)}
                      className="p-2 rounded-lg bg-card/90 text-foreground hover:bg-card transition"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="p-2 rounded-lg bg-destructive/90 text-destructive-foreground hover:bg-destructive transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(1)} KB` : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminImageManager;
