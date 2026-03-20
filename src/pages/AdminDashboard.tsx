import { useState, useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { saveSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdminProgramManager from "@/components/AdminProgramManager";
import AdminApplications from "@/components/AdminApplications";
import AdminMessages from "@/components/AdminMessages";
import AdminSubscribers from "@/components/AdminSubscribers";
import AdminFormQuestions from "@/components/AdminFormQuestions";
import AdminImageManager from "@/components/AdminImageManager";
import AdminSendMessage from "@/components/AdminSendMessage";
import { pages, defaults } from "@/config/adminPages";
import {
  LogOut, Save, Loader2, ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, userId, signOut } = useAdmin();
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const merged: Record<string, Record<string, Record<string, string>>> = JSON.parse(JSON.stringify(defaults));
      const { data } = await supabase.from("site_content").select("*");
      if (data) {
        data.forEach((row) => {
          if (!merged[row.page]) merged[row.page] = {};
          merged[row.page][row.section_key] = {
            ...(merged[row.page][row.section_key] || {}),
            ...(row.content as Record<string, string>),
          };
        });
      }
      setFormData(merged);
      setLoadingContent(false);
    };
    loadContent();
  }, []);

  const currentPage = pages.find((p) => p.key === activePage);

  const getValue = (page: string, section: string, field: string) =>
    formData[page]?.[section]?.[field] || "";

  const setValue = (page: string, section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [page]: { ...prev[page], [section]: { ...prev[page]?.[section], [field]: value } },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    if (!userId) return;
    setSaving(true);
    const sectionData = formData[activePage]?.[sectionKey] || {};
    const { error } = await saveSiteContent(activePage, sectionKey, sectionData, userId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Content updated successfully." });
    }
    setSaving(false);
  };

  if (authLoading || loadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Global Nexus Institute</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {pages.map((page) => (
            <button
              key={page.key}
              onClick={() => { setActivePage(page.key); setActiveSection(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === page.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <page.icon className="h-4 w-4" />
              {page.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl">
          {activePage === "programs" ? (
            <AdminProgramManager />
          ) : activePage === "applications" ? (
            <AdminApplications />
          ) : activePage === "messages" ? (
            <AdminMessages />
          ) : activePage === "subscribers" ? (
            <AdminSubscribers />
          ) : activePage === "form-questions" ? (
            <AdminFormQuestions />
          ) : activePage === "images" ? (
            <AdminImageManager />
          ) : activePage === "send-message" ? (
            <AdminSendMessage />
          ) : (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">{currentPage?.label}</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Edit the content for this page. Changes are saved per section.
              </p>

              <div className="space-y-6">
                {currentPage?.sections.map((section) => {
                  const isOpen = activeSection === section.key;
                  return (
                    <div key={section.key} className="bg-card border border-border rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setActiveSection(isOpen ? null : section.key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition"
                      >
                        <span className="font-semibold text-foreground">{section.label}</span>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4 max-h-[60vh] overflow-y-auto">
                          {section.fields.map((field) => (
                            <div key={field.key}>
                              <label className="block text-sm font-medium text-foreground mb-1.5">
                                {field.label}
                              </label>
                              {field.type === "textarea" ? (
                                <textarea
                                  value={getValue(activePage, section.key, field.key)}
                                  onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                                  rows={3}
                                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                                />
                              ) : (
                                <input
                                  type={field.type}
                                  value={getValue(activePage, section.key, field.key)}
                                  onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                                />
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => handleSave(section.key)}
                            disabled={saving}
                            className="btn-primary flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50"
                          >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Section
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
