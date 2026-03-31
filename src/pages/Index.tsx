import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap, Award, BookOpen, Phone, ArrowRight, X, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const defaultGallery = [
  { title: "Team collaborating", image: `${IMG_BASE}/team.jpeg` },
  { title: "In-person training", image: `${IMG_BASE}/team1.jpeg` },
  { title: "Students learning", image: `${IMG_BASE}/learning.jpeg` },
  { title: "Students studying", image: `${IMG_BASE}/studing.jpeg` },
];

const quickLinkIcons = [GraduationCap, Award, BookOpen, Phone];
const quickLinkPaths = ["/admissions", "/admissions", "/programs", "/contact"];

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { content: c } = useAllSiteContent("home");

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const gallery = (c.gallery as any)?.items || defaultGallery;

  const stats = [
    { value: g("stats", "stat1_value", "200+"), label: g("stats", "stat1_label", "Students Trained") },
    { value: g("stats", "stat2_value", "95%"), label: g("stats", "stat2_label", "Success Rate") },
    { value: g("stats", "stat3_value", "10+"), label: g("stats", "stat3_label", "Expert Mentors") },
  ];

  const quickLinks = [
    { title: g("quick_links", "link1_title", "Apply Now"), desc: g("quick_links", "link1_desc", "Start your journey with Global Nexus"), path: quickLinkPaths[0], icon: quickLinkIcons[0] },
    { title: g("quick_links", "link2_title", "Scholarships"), desc: g("quick_links", "link2_desc", "Explore funding opportunities"), path: quickLinkPaths[1], icon: quickLinkIcons[1] },
    { title: g("quick_links", "link3_title", "Learning Portal"), desc: g("quick_links", "link3_desc", "Access your online courses"), path: quickLinkPaths[2], icon: quickLinkIcons[2] },
    { title: g("quick_links", "link4_title", "Contact Us"), desc: g("quick_links", "link4_desc", "Get in touch with our team"), path: quickLinkPaths[3], icon: quickLinkIcons[3] },
  ];

  const popupDetails = g(
    "popup",
    "details",
    `• Learn With our platform: www.skilla.africa
• 4 Weeks, live online sessions
• Led by Professional Data Analysts & Scientists
• Live sessions Start on: April 6, 2026
• WhatsApp: +250787406140`
  );

  return (
    <Layout>
      <PageSEO title="Home" description="Global Nexus Institute — Empowering Africa's tech future through world-class data science, AI, and technology education." path="/" />
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(\"/lovable-uploads/fb7532f3-e7ce-41da-af33-33bfd4d503ab.jpg\")" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 text-white text-sm px-4 py-1.5 rounded-full mb-6 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            {g("hero", "badge", "Empowering Africa's Tech Future")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-white tracking-tight animate-fade-up-delay-1">
            {g("hero", "title_line1", "Global Nexus")} {g("hero", "title_line2", "Institute")}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 animate-fade-up-delay-2">
            {g("hero", "subtitle", "Connect with future tech leaders")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-up-delay-3">
            <Link
              to="/programs"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              {g("hero", "explore_text", "Explore Programs")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/elearning"
              className="border-2 border-white/70 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              {g("hero", "elearning_text", "Our eLearning")}
            </Link>
          </div>

          <Link
            to="/elearning"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/40"
          >
            {g("hero", "instructor_text", "Become an Instructor")}
          </Link>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-14 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 sm:p-5 border border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <>
          <div
            className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowPopup(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden relative border border-border w-full max-w-md animate-scale-in">
              <div className="bg-gradient-to-r from-primary via-primary/80 to-accent px-6 py-5 text-white relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  <Sparkles className="h-3 w-3" /> Now Accepting Applications
                </div>
                <h2 className="text-xl font-bold leading-tight">
                  {g("popup", "title", "Call For Application!")}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {g("popup", "subtitle", "Don't miss this opportunity to join us!")}
                </p>
              </div>

              <div className="p-6">
                <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  {g("popup", "deadline", "Deadline: April 6, 2026")}
                </div>

                <div className="bg-muted rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-foreground text-base mb-3">
                    {g("popup", "program_name", "Python For Data Analyst (Online)")}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {popupDetails.split("\n").map((line, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{line.replace(/^•\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 bg-accent/10 text-accent border border-accent/20 rounded-lg py-2 px-3 text-center text-xs font-semibold">
                    MOMOpay: {g("popup", "momopay", "030700")}
                  </div>
                  <a
                    href={`https://wa.me/${g("popup", "whatsapp", "250787406140")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg py-2 px-3 text-xs font-semibold hover:bg-[#25D366]/20 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Let's Chat
                  </a>
                </div>

                <a
                  href={g("popup", "apply_url", "https://forms.gle/ReNWMuzp6vhBLaMs8")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block btn-primary w-full text-center text-base py-3 font-bold tracking-wide"
                >
                  {g("popup", "apply_button_text", "Apply For Python For Data Analyst")}
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Vision & Mission */}
      <ScrollReveal>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">{g("vision_mission", "section_title", "Our Vision & Mission")}</h2>
          <p className="section-subtitle">{g("vision_mission", "section_subtitle", "Shaping the future of technology education in Africa")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40" />
              <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("vision_mission", "vision", "To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.")}
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/40" />
              <h3 className="text-2xl font-bold text-accent mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("vision_mission", "mission", "To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.")}
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Gallery */}
      <ScrollReveal delay={100}>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">{g("gallery", "section_title", "Our Team & Students")}</h2>
          <p className="section-subtitle">{g("gallery", "section_subtitle", "Our team brings together diverse talents and expertise.")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gallery.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title || `Team collaborating ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Quick Links */}
      <ScrollReveal delay={200}>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((item, i) => (
              <Link
                key={item.title}
                to={item.path}
                className="card-hover p-6 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 text-center group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
