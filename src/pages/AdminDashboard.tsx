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
import AdminListEditor, { FieldDef } from "@/components/AdminListEditor";
import {
  LogOut, Home, Info, BookOpen, Briefcase, Newspaper, GraduationCap, Phone,
  Save, Loader2, ChevronRight, Users, Mail, UserCheck, FileQuestion, Image as ImageIcon, Send,
  Menu, X
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
    social: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
    donation: {
      donation_url: "https://flutterwave.com/pay/8atwd1q3u556",
    },
  },
  footer: {
    contact: {
      address: "Kigali, Rwanda — Norrsken House",
      email: "info@globalnexus.africa",
      phone1: "+250 787 406 140",
      phone2: "+254 707 825 181",
      whatsapp: "250787406140",
    },
    highlights: {
      item1: "Earn global certifications",
      item2: "Master key tech skills",
      item3: "Connect with tech leaders",
      item4: "Soft skills & job readiness",
    },
    seal: {
      seal_image: "https://www.globalnexus.africa/images/seal.png",
      seal_link: "https://certification.dbi.rw/public?name=Global Nexus Institute Ltd",
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
  { key: "home-gallery", label: "Home Gallery", icon: ImageIcon, sections: [] },
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
  { key: "about-team", label: "Team Members", icon: Users, sections: [] },
  { key: "about-partners", label: "Partners", icon: Users, sections: [] },
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
    key: "services", label: "Services Page", icon: Briefcase,
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
  { key: "services-list", label: "Services List", icon: Briefcase, sections: [] },
  {
    key: "news", label: "News Page", icon: Newspaper,
    sections: [
      { key: "hero", label: "Hero Section", fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ]},
    ],
  },
  { key: "news-items", label: "News Items", icon: Newspaper, sections: [] },
  { key: "testimonials", label: "Testimonials", icon: Mail, sections: [] },
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
  { key: "admissions-steps", label: "Admission Steps", icon: GraduationCap, sections: [] },
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
      { key: "social", label: "Social Media Links", fields: [
        { key: "facebook", label: "Facebook URL", type: "url" },
        { key: "linkedin", label: "LinkedIn URL", type: "url" },
        { key: "twitter", label: "Twitter/X URL", type: "url" },
        { key: "instagram", label: "Instagram URL", type: "url" },
      ]},
      { key: "donation", label: "Donation Settings", fields: [
        { key: "donation_url", label: "Donation Payment URL", type: "url" },
      ]},
    ],
  },
  {
    key: "footer", label: "Footer", icon: Phone,
    sections: [
      { key: "contact", label: "Footer Contact Info", fields: [
        { key: "address", label: "Address", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone1", label: "Phone 1 (WhatsApp)", type: "text" },
        { key: "phone2", label: "Phone 2", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number (no +)", type: "text" },
      ]},
      { key: "highlights", label: "Footer Highlights", fields: [
        { key: "item1", label: "Highlight 1", type: "text" },
        { key: "item2", label: "Highlight 2", type: "text" },
        { key: "item3", label: "Highlight 3", type: "text" },
        { key: "item4", label: "Highlight 4", type: "text" },
      ]},
      { key: "seal", label: "Certification Seal", fields: [
        { key: "seal_image", label: "Seal Image URL", type: "url" },
        { key: "seal_link", label: "Seal Link URL", type: "url" },
      ]},
    ],
  },
  { key: "footer-links", label: "Footer Links", icon: Phone, sections: [] },
  { key: "applications", label: "Applications", icon: Users, sections: [] },
  { key: "messages", label: "Messages", icon: Mail, sections: [] },
  { key: "subscribers", label: "Subscribers", icon: UserCheck, sections: [] },
  { key: "form-questions", label: "Form Questions", icon: FileQuestion, sections: [] },
  { key: "images", label: "Images", icon: ImageIcon, sections: [] },
  { key: "send-message", label: "Send Message", icon: Send, sections: [] },
];

// Default data for list editors
const IMG_BASE = "https://www.globalnexus.africa/images";

const defaultTeam = [
  { name: "Theoneste NDAYISENGA", role: "Founder, CEO & Project Lead", desc: "Educator, Data Scientist, and Analyst", img: `${IMG_BASE}/theoneste.jpeg` },
  { name: "Francis KIPKOGEI YEGO", role: "Board Member & Data Scientist", desc: "AI, Actuarial Scientist, Statistician", img: `${IMG_BASE}/francis.png` },
  { name: "Ass Prof. Innocent NGARUYE", role: "Board Member & Senior Researcher", desc: "Data Scientist, and Researcher", img: `${IMG_BASE}/innocent.png` },
  { name: "Didier NGAMIJE", role: "Data Analytics Instructor", desc: "Data Analyst, and Developer", img: `${IMG_BASE}/didier.png` },
  { name: "Dieudonne UWASE", role: "Board Member & Coach", desc: "Educational Technology, Business Coach", img: `${IMG_BASE}/Uwase.jpg` },
  { name: "Eugene MUTUYIMANA", role: "Software Developer & Facilitator", desc: "Software development, Data Analysis", img: `${IMG_BASE}/eugene.jpg` },
  { name: "Francis Muhirwa", role: "Web & Graphic Designer", desc: "Project management, Content Creation", img: `${IMG_BASE}/muhirwa.png` },
  { name: "Joie Sophia UMUHOZA", role: "Marketing & Project Manager", desc: "Marketing, Project Experience", img: "/images/sophia.jpeg" },
  { name: "Geredi NIYIBIGIRA", role: "AI & Data Science Instructor", desc: "Artificial Intelligence, Machine Learning", img: `${IMG_BASE}/geredi.png` },
];

const defaultPartners = [
  { name: "RTB Rwanda", desc: "Accredited by Rwanda TVET Board for quality technical and vocational education.", img: "/images/rtb.jpg" },
  { name: "NCC Education UK", desc: "Certified programs ensuring international recognition of qualifications.", img: `${IMG_BASE}/ncc.png` },
  { name: "WorldQuant University", desc: "Partnership coming soon — global online university for data science and quantitative finance.", img: "/images/wqu.png" },
  { name: "RMI-Rwanda", desc: "Strategic partnership for professional development and industry-aligned training.", img: `${IMG_BASE}/rmi.png` },
  { name: "SOLVIT AFRICA", desc: "Collaborations for internships, mentorship, and employment opportunities.", img: `${IMG_BASE}/solvit.png` },
  { name: "ICT Chamber-Rwanda", desc: "Leading tech companies partnerships for mentorship and employment.", img: `${IMG_BASE}/ict.png` },
];

const defaultNews = [
  { title: "New Partnership with ASSA (University of Rwanda)", date: "March 15, 2024", desc: "Global Nexus announces strategic partnerships with University of Rwanda Students to enhance student opportunities...", image: `${IMG_BASE}/team.jpeg`, link: "https://www.linkedin.com/pulse/global-nexus-institute-updates-global-nexus-institute-nunyf/" },
  { title: "Data Analytics & Data Science in-person Training", date: "September 15, 2024", desc: "Global Nexus Institute we don't keep all of our training online, we do meet in-person, cheer and discuss more.", image: `${IMG_BASE}/team1.jpeg`, link: "https://www.linkedin.com/feed/update/urn:li:activity:7289945115026989056/" },
  { title: "Student at Tech Innovation GIZ learning facilities", date: "August 21, 2024", desc: "Our students secured top positions at the Innovation Challenge, highlighting that learning and collaboration are key to success.", image: `${IMG_BASE}/learning.jpeg`, link: "#" },
  { title: "Student Success at Tech Innovation Challenge", date: "June 10, 2024", desc: "Our students secured a meeting with the Business Manager at the National Computing Center (UK).", image: `${IMG_BASE}/studing.jpeg`, link: "#" },
];

const defaultTestimonials = [
  { name: "Didier NGAMIJE", role: "Data Analyst at Ganza Africa", quote: "The Data Science course completely transformed my career. Within 3 months of graduation, I landed my first job at Ganza Africa.", img: `${IMG_BASE}/didier.png` },
  { name: "Samuelson MUKIZA", role: "Student at University of Rwanda", quote: "I am excited to have completed the Python for Data Science course at GNI, gaining invaluable skills. I highly recommend this course.", img: `${IMG_BASE}/samuelson.jpg` },
  { name: "Samuel KIPKOGEI", role: "Data Analyst Intern", quote: "Thanks to the Data Analytics program, I transitioned from statistics to a data analytics career successfully.", img: `${IMG_BASE}/samuel.png` },
];

const defaultServices = [
  { title: "Training Enumerators", desc: "Comprehensive training covering survey methodologies, data quality protocols, and ethical guidelines with hands-on practice.", icon: "ClipboardList", color: "from-red-500 to-rose-400" },
  { title: "Data Collection", desc: "Cutting-edge digital tools and methodologies with rigorous quality control across various sectors.", icon: "Database", color: "from-blue-500 to-cyan-400" },
  { title: "Data Processing", desc: "Advanced cleaning algorithms, statistical validation, and quality assurance for meaningful insights.", icon: "Cog", color: "from-purple-500 to-violet-400" },
  { title: "Report Writing", desc: "Complex data transformed into clear, actionable insights with visual representations and recommendations.", icon: "FileText", color: "from-orange-500 to-amber-400" },
  { title: "Internship", desc: "Academic and professional internships in Data Analytics, Data Science, and Software Development.", icon: "GraduationCap", color: "from-green-500 to-emerald-400" },
  { title: "Interns to Companies", desc: "Connecting companies with skilled interns proficient in data analytics, ML, and software development.", icon: "Users", color: "from-pink-500 to-rose-400" },
];

const defaultGallery = [
  { title: "Team Photo 1", image: "/images/gallery-1.jpg" },
  { title: "Team Photo 2", image: "/images/gallery-2.jpg" },
  { title: "Team Photo 3", image: "/images/gallery-3.jpg" },
  { title: "Team Photo 4", image: "/images/gallery-4.jpg" },
];

const defaultSteps = [
  { title: "Submit Application", desc: "Complete the online application form with your personal and academic information.", color: "from-red-500 to-orange-400" },
  { title: "Document Review", desc: "Our admissions team will review your application and supporting documents.", color: "from-blue-500 to-cyan-400" },
  { title: "Interview", desc: "Selected candidates will be invited for an interview with faculty members.", color: "from-green-500 to-emerald-400" },
];

// Field definitions for list editors
const teamFields: FieldDef[] = [
  { key: "name", label: "Full Name", type: "text" },
  { key: "role", label: "Role / Title", type: "text" },
  { key: "desc", label: "Description", type: "text" },
  { key: "img", label: "Photo", type: "image" },
];

const partnerFields: FieldDef[] = [
  { key: "name", label: "Partner Name", type: "text" },
  { key: "desc", label: "Description", type: "text" },
  { key: "img", label: "Logo", type: "image" },
];

const newsFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "date", label: "Date", type: "text", placeholder: "e.g. March 15, 2024" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "image", label: "Image", type: "image" },
  { key: "link", label: "Read More Link", type: "url" },
];

const testimonialFields: FieldDef[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role / Position", type: "text" },
  { key: "quote", label: "Testimonial Quote", type: "textarea" },
  { key: "img", label: "Photo", type: "image" },
];

const serviceFields: FieldDef[] = [
  { key: "title", label: "Service Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color (e.g. from-red-500 to-rose-400)", type: "text" },
];

const galleryFields: FieldDef[] = [
  { key: "title", label: "Caption / Alt Text", type: "text" },
  { key: "image", label: "Image", type: "image" },
];

const stepsFields: FieldDef[] = [
  { key: "title", label: "Step Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" },
  { key: "color", label: "Gradient Color", type: "text" },
];

const footerLinkFields: FieldDef[] = [
  { key: "label", label: "Link Text", type: "text" },
  { key: "url", label: "URL", type: "url" },
  { key: "external", label: "External? (yes/no)", type: "text", placeholder: "yes or no" },
];

const defaultFooterLinks = [
  { label: "Privacy Policy", url: "https://www.globalnexus.africa/images/Privacy-Policy.pdf", external: "yes" },
  { label: "Refund Policy", url: "https://www.globalnexus.africa/images/Refund-Policy.pdf", external: "yes" },
  { label: "Terms and Conditions", url: "https://www.globalnexus.africa/images/Terms-and-Conditions.pdf", external: "yes" },
  { label: "Research", url: "/research", external: "no" },
];

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, userId, signOut } = useAdmin();
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saving, setSaving] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const pageKey = activePage;
    const sectionData = formData[pageKey]?.[sectionKey] || {};
    const { error } = await saveSiteContent(pageKey, sectionKey, sectionData, userId);

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

  const renderListEditor = () => {
    if (!userId) return null;

    switch (activePage) {
      case "about-team":
        return <AdminListEditor title="Team Members" description="Edit your team members shown on the About page." page="about" sectionKey="team" fields={teamFields} defaultItems={defaultTeam} userId={userId} />;
      case "about-partners":
        return <AdminListEditor title="Partners & Accreditations" description="Edit partners shown on the About page." page="about" sectionKey="partners" fields={partnerFields} defaultItems={defaultPartners} userId={userId} />;
      case "news-items":
        return <AdminListEditor title="News Articles" description="Edit news items shown on the News page." page="news" sectionKey="items" fields={newsFields} defaultItems={defaultNews} userId={userId} />;
      case "testimonials":
        return <AdminListEditor title="Testimonials" description="Edit success stories shown on the News page." page="news" sectionKey="testimonials" fields={testimonialFields} defaultItems={defaultTestimonials} userId={userId} />;
      case "services-list":
        return <AdminListEditor title="Services" description="Edit services shown on the Services page." page="services" sectionKey="services_list" fields={serviceFields} defaultItems={defaultServices} userId={userId} />;
      case "home-gallery":
        return <AdminListEditor title="Gallery Images" description="Edit gallery images on the Home page." page="home" sectionKey="gallery" fields={galleryFields} defaultItems={defaultGallery} userId={userId} />;
      case "admissions-steps":
        return <AdminListEditor title="Admission Steps" description="Edit the steps shown on the Admissions page." page="admissions" sectionKey="steps" fields={stepsFields} defaultItems={defaultSteps} userId={userId} />;
      default:
        return null;
    }
  };

  const isListEditor = ["about-team", "about-partners", "news-items", "testimonials", "services-list", "home-gallery", "admissions-steps"].includes(activePage);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-card border border-border shadow-md md:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 w-64 bg-card border-r border-border flex flex-col shrink-0 h-screen transition-transform duration-200`}>
        <div className="p-5 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Global Nexus Institute</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {pages.map((page) => (
            <button
              key={page.key}
              onClick={() => { setActivePage(page.key); setActiveSection(null); setSidebarOpen(false); }}
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

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-0 mt-14 md:mt-0">
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
          ) : isListEditor ? (
            renderListEditor()
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
