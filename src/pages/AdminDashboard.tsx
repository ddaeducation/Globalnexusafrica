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
import {
  LogOut, Home, Info, BookOpen, Briefcase, Newspaper, GraduationCap, Phone,
  Save, Loader2, ChevronRight, Users, Mail, UserCheck, FileQuestion, Image as ImageIcon
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
  defaultValue?: string;
};

// Defaults matching what the frontend pages show
const defaults: Record<string, Record<string, Record<string, string>>> = {
  home: {
    hero: {
      badge: "Empowering Africa's Tech Future",
      title_line1: "Global Nexus",
      title_line2: "Institute",
      subtitle: "Connect with future tech leaders",
      hero_image: "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/hello.avif",
    },
    stats: {
      stat1_value: "200+", stat1_label: "Students Trained",
      stat2_value: "95%", stat2_label: "Success Rate",
      stat3_value: "10+", stat3_label: "Expert Mentors",
    },
    popup: {
      title: "Call For Application!",
      subtitle: "Don't miss this opportunity to join us!",
      deadline: "Deadline: April 6, 2026",
      program_name: "Python For Data Analyst (Online)",
      details: "• Learn With our platform: www.skilla.africa\n• 4 Weeks, live online sessions\n• Led by Professional Data Analysts & Scientists\n• Live sessions Start on: April 6, 2026\n• WhatsApp: +250787406140",
      apply_url: "https://forms.gle/ReNWMuzp6vhBLaMs8",
      apply_button_text: "Apply For Python For Data Analyst",
    },
    vision_mission: {
      vision: "To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.",
      mission: "To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.",
    },
  },
  about: {
    hero: {
      title: "About Global Nexus Institute",
      subtitle: "Bridging the Digital Skills Gap — Empowering the next generation of tech leaders with world-class education and hands-on experience.",
    },
    story: {
      paragraph1: "Global Nexus Institute is a leading educational institution dedicated to empowering the next generation of technology leaders. Founded with the vision of bridging the digital skills gap in Rwanda and East Africa, we provide world-class education in partnership with industry leaders.",
      paragraph2: "Our institute combines theoretical knowledge with practical, hands-on experience to prepare students for the demands of the modern tech industry. Through our partnerships with leading technology companies and research institutions, we ensure our curriculum remains cutting-edge and relevant.",
    },
  },
  programs: {
    hero: {
      title: "Professional Programs",
      subtitle: "Comprehensive programs designed to prepare you for success in the data-driven world.",
    },
  },
  services: {
    hero: {
      title: "Professional Services",
      subtitle: "Comprehensive data solutions and actionable insights for informed business decisions.",
    },
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Contact us to discuss your project requirements and how we can help you achieve your goals.",
    },
  },
  news: {
    hero: {
      title: "News & Events",
      subtitle: "Stay updated with the latest happenings at Global Nexus Institute.",
    },
  },
  admissions: {
    hero: {
      title: "Admissions Process",
      subtitle: "Begin your journey towards a successful career in technology.",
    },
    apply: {
      apply_url: "https://forms.gle/B1vbHxjXeQMt4hDx9",
    },
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Get in touch for inquiries about programs, admissions, or partnerships.",
    },
    info: {
      address: "Kigali, Rwanda\nKN 78 St, Norrsken House",
      email: "info@globalnexus.africa",
      phone: "+250 787 406 140\n+254 707 825 181",
    },
  },
};

const pages: PageConfig[] = [
  {
    key: "home", label: "Home Page", icon: Home,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "badge", label: "Badge Text", type: "text" },
        { key: "title_line1", label: "Title Line 1", type: "text" },
        { key: "title_line2", label: "Title Line 2", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "hero_image", label: "Hero Background Image URL", type: "url" },
      ]},
      { key: "stats", label: "Statistics", fields: [
        { key: "stat1_value", label: "Stat 1 Value", type: "text" },
        { key: "stat1_label", label: "Stat 1 Label", type: "text" },
        { key: "stat2_value", label: "Stat 2 Value", type: "text" },
        { key: "stat2_label", label: "Stat 2 Label", type: "text" },
        { key: "stat3_value", label: "Stat 3 Value", type: "text" },
        { key: "stat3_label", label: "Stat 3 Label", type: "text" },
      ]},
      { key: "popup", label: "Application Popup", fields: [
        { key: "title", label: "Popup Title", type: "text" },
        { key: "subtitle", label: "Popup Subtitle", type: "text" },
        { key: "deadline", label: "Deadline", type: "text" },
        { key: "program_name", label: "Program Name", type: "text" },
        { key: "details", label: "Details (one per line)", type: "textarea" },
        { key: "apply_url", label: "Apply URL", type: "url" },
        { key: "apply_button_text", label: "Apply Button Text", type: "text" },
      ]},
      { key: "vision_mission", label: "Vision & Mission", fields: [
        { key: "vision", label: "Vision Text", type: "textarea" },
        { key: "mission", label: "Mission Text", type: "textarea" },
      ]},
    ],
  },
  {
    key: "about", label: "About Page", icon: Info,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "story", label: "Our Story", fields: [
        { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
      ]},
    ],
  },
  {
    key: "programs", label: "Programs", icon: BookOpen,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  {
    key: "services", label: "Services", icon: Briefcase,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "cta", label: "CTA Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  {
    key: "news", label: "News", icon: Newspaper,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  {
    key: "admissions", label: "Admissions", icon: GraduationCap,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "apply", label: "Apply Section", fields: [
        { key: "apply_url", label: "Application Form URL", type: "url" },
      ]},
    ],
  },
  {
    key: "contact", label: "Contact", icon: Phone,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
      { key: "info", label: "Contact Info", fields: [
        { key: "address", label: "Address", type: "textarea" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone Numbers", type: "textarea" },
      ]},
    ],
  },
  {
    key: "applications", label: "Applications", icon: Users,
    sections: [],
  },
  {
    key: "messages", label: "Messages", icon: Mail,
    sections: [],
  },
  {
    key: "subscribers", label: "Subscribers", icon: UserCheck,
    sections: [],
  },
  {
    key: "form-questions", label: "Form Questions", icon: FileQuestion,
    sections: [],
  },
  {
    key: "images", label: "Images", icon: ImageIcon,
    sections: [],
  },
];

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, userId, signOut } = useAdmin();
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);

  // Load DB content, merge with defaults so admin always sees current values
  useEffect(() => {
    const loadContent = async () => {
      // Start with defaults
      const merged: Record<string, Record<string, Record<string, string>>> = JSON.parse(JSON.stringify(defaults));

      const { data } = await supabase.from("site_content").select("*");
      if (data) {
        data.forEach((row) => {
          if (!merged[row.page]) merged[row.page] = {};
          // DB values override defaults
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
                                  rows={4}
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
