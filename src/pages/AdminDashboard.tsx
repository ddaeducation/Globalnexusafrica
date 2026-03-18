import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { saveSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  LogOut, Home, Info, BookOpen, Briefcase, FlaskConical, Newspaper, GraduationCap, Phone,
  Save, Loader2, ChevronRight
} from "lucide-react";

type PageConfig = {
  key: string;
  label: string;
  icon: any;
  sections: SectionConfig[];
};

type SectionConfig = {
  key: string;
  label: string;
  fields: FieldConfig[];
};

type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "json-array";
  placeholder?: string;
};

const pages: PageConfig[] = [
  {
    key: "home",
    label: "Home Page",
    icon: Home,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "badge", label: "Badge Text", type: "text", placeholder: "Empowering Africa's Tech Future" },
          { key: "title_line1", label: "Title Line 1", type: "text", placeholder: "Global Nexus" },
          { key: "title_line2", label: "Title Line 2", type: "text", placeholder: "Institute" },
          { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Connect with future tech leaders" },
          { key: "hero_image", label: "Hero Background Image URL", type: "url" },
        ],
      },
      {
        key: "stats",
        label: "Statistics",
        fields: [
          { key: "stat1_value", label: "Stat 1 Value", type: "text", placeholder: "200+" },
          { key: "stat1_label", label: "Stat 1 Label", type: "text", placeholder: "Students Trained" },
          { key: "stat2_value", label: "Stat 2 Value", type: "text", placeholder: "95%" },
          { key: "stat2_label", label: "Stat 2 Label", type: "text", placeholder: "Success Rate" },
          { key: "stat3_value", label: "Stat 3 Value", type: "text", placeholder: "10+" },
          { key: "stat3_label", label: "Stat 3 Label", type: "text", placeholder: "Expert Mentors" },
        ],
      },
      {
        key: "popup",
        label: "Application Popup",
        fields: [
          { key: "title", label: "Popup Title", type: "text", placeholder: "Call For Application!" },
          { key: "subtitle", label: "Popup Subtitle", type: "text", placeholder: "Don't miss this opportunity to join us!" },
          { key: "deadline", label: "Deadline", type: "text", placeholder: "Deadline: April 6, 2026" },
          { key: "program_name", label: "Program Name", type: "text", placeholder: "Python For Data Analyst (Online)" },
          { key: "details", label: "Details (one per line)", type: "textarea" },
          { key: "apply_url", label: "Apply URL", type: "url" },
          { key: "apply_button_text", label: "Apply Button Text", type: "text" },
        ],
      },
      {
        key: "vision_mission",
        label: "Vision & Mission",
        fields: [
          { key: "vision", label: "Vision Text", type: "textarea" },
          { key: "mission", label: "Mission Text", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About Page",
    icon: Info,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text", placeholder: "About Global Nexus Institute" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "story",
        label: "Our Story",
        fields: [
          { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
          { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "programs",
    label: "Programs",
    icon: BookOpen,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    icon: Briefcase,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "CTA Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "research",
    label: "Research",
    icon: FlaskConical,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "news",
    label: "News",
    icon: Newspaper,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    icon: GraduationCap,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "apply",
        label: "Apply Section",
        fields: [
          { key: "apply_url", label: "Application Form URL", type: "url" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    icon: Phone,
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "info",
        label: "Contact Info",
        fields: [
          { key: "address", label: "Address", type: "textarea" },
          { key: "email", label: "Email", type: "text" },
          { key: "phone", label: "Phone Numbers", type: "textarea" },
        ],
      },
    ],
  },
];

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, userId, signOut } = useAdmin();
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);

  // Load all existing content on mount
  useState(() => {
    const loadContent = async () => {
      const { data } = await supabase.from("site_content").select("*");
      if (data) {
        const mapped: Record<string, Record<string, Record<string, string>>> = {};
        data.forEach((row) => {
          if (!mapped[row.page]) mapped[row.page] = {};
          mapped[row.page][row.section_key] = row.content as Record<string, string>;
        });
        setFormData(mapped);
      }
      setLoadingContent(false);
    };
    loadContent();
  });

  const currentPage = pages.find((p) => p.key === activePage);

  const getValue = (page: string, section: string, field: string) => {
    return formData[page]?.[section]?.[field] || "";
  };

  const setValue = (page: string, section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page]?.[section],
          [field]: value,
        },
      },
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
      {/* Sidebar */}
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

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl">
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
                    <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                      {section.fields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              value={getValue(activePage, section.key, field.key)}
                              onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                              placeholder={field.placeholder}
                              rows={4}
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={getValue(activePage, section.key, field.key)}
                              onChange={(e) => setValue(activePage, section.key, field.key, e.target.value)}
                              placeholder={field.placeholder}
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
