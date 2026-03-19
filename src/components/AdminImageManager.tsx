import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Loader2, Upload, Trash2, Image as ImageIcon, Copy, FolderOpen, X, RefreshCw, ZoomIn,
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
  { key: "form-header", label: "Form Header" },
];

const AdminImageManager = () => {
  const [activeFolder, setActiveFolder] = useState("general");
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<{ name: string; url: string } | null>(null);
  const [replacing, setReplacing] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

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
      .upload(`${activeFolder}/${fileName}`, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uploaded!", description: "Image uploaded successfully." });
      await fetchFiles();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacing) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const { error } = await supabase.storage
      .from("site-images")
      .update(`${activeFolder}/${replacing}`, file, { cacheControl: "3600", upsert: true });

    if (error) {
      toast({ title: "Replace failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Replaced!", description: `"${replacing}" has been updated.` });
      await fetchFiles();
      if (preview?.name === replacing) {
        setPreview({ name: replacing, url: getPublicUrl(replacing) + "?t=" + Date.now() });
      }
    }
    setUploading(false);
    setReplacing(null);
    if (replaceInputRef.current) replaceInputRef.current.value = "";
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
      if (preview?.name === name) setPreview(null);
    }
  };

  const handleCopyUrl = (name: string) => {
    const url = getPublicUrl(name);
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  const startReplace = (name: string) => {
    setReplacing(name);
    setTimeout(() => replaceInputRef.current?.click(), 50);
  };

  return (
    <div>
      <input ref={replaceInputRef} type="file" accept="image/*" onChange={handleReplace} className="hidden" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ImageIcon className="h-6 w-6" /> Image Manager
          </h1>
          <p className="text-sm text-gray-500">Upload, preview, and replace images for your site.</p>
        </div>
        <div className="relative">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
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

      <div className="flex gap-2 mb-5">
        {FOLDERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFolder(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeFolder === f.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 hover:text-gray-900"
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
        <div className="text-center py-16 text-gray-400">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No images in this folder yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map(file => (
            <div key={file.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition">
              <div
                className="aspect-video relative bg-gray-50 cursor-pointer"
                onClick={() => setPreview({ name: file.name, url: getPublicUrl(file.name) })}
              >
                <img
                  src={getPublicUrl(file.name)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="h-6 w-6 text-white drop-shadow" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-900 font-medium truncate mb-2">{file.name}</p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyUrl(file.name)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    title="Copy URL"
                  >
                    <Copy className="h-3 w-3" /> Copy URL
                  </button>
                  <button
                    onClick={() => startReplace(file.name)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="Replace image"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-gray-900 text-white px-5 py-3 rounded-t-2xl">
              <span className="text-sm font-medium truncate">{preview.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(preview.name)}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => startReplace(preview.name)}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  title="Replace"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-b-2xl overflow-hidden flex items-center justify-center">
              <img
                src={preview.url}
                alt={preview.name}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImageManager;
