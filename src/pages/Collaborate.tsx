import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Handshake, GraduationCap, FlaskConical, Globe, ArrowRight, Heart, Building2, Users } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const defaultPartnerTypes = [
  { icon: GraduationCap, title: "Academic Partners", desc: "Co-develop curricula, exchange knowledge, and create joint certification programs with universities and institutions.", color: "from-blue-500 to-cyan-400" },
  { icon: Building2, title: "Industry Partners", desc: "Provide internships, mentorship, and real-world projects that prepare students for the workforce.", color: "from-green-500 to-emerald-400" },
  { icon: FlaskConical, title: "Research Partners", desc: "Collaborate on applied research in AI, data science, educational technology, and community development.", color: "from-purple-500 to-violet-400" },
  { icon: Heart, title: "NGO & Development Partners", desc: "Partner on capacity-building initiatives, digital literacy programs, and community empowerment projects.", color: "from-pink-500 to-rose-400" },
  { icon: Globe, title: "International Organizations", desc: "Work together on cross-border education programs and technology transfer initiatives.", color: "from-orange-500 to-amber-400" },
  { icon: Users, title: "Community Organizations", desc: "Support grassroots digital skills training and youth empowerment in underserved communities.", color: "from-red-500 to-rose-400" },
];

const iconMap: Record<string, any> = { GraduationCap, Building2, FlaskConical, Heart, Globe, Users };

const Collaborate = () => {
  const { content: c } = useAllSiteContent("collaborate");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const partnerTypes = (c.types as any)?.items || defaultPartnerTypes;

  return (
    <>
      <PageSEO title="Collaborate" description="Partner with Global Nexus Institute for academic and industry collaboration." path="/collaborate" />

      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Collaborate With Us")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Together we can transform tech education and create lasting impact across Africa.")}
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="section-title">{g("sections", "partners_title", "Partnership Opportunities")}</h2>
            <p className="section-subtitle">{g("sections", "partners_subtitle", "Multiple ways to partner and make a difference")}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerTypes.map((p: any, i: number) => {
                const IconComp = p.icon && typeof p.icon === "string" ? (iconMap[p.icon] || GraduationCap) : (p.icon || GraduationCap);
                return (
                  <ScrollReveal key={p.title} delay={i * 80}>
                    <div className="card-hover p-7 group h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color || "from-blue-500 to-cyan-400"} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <div className="bg-card rounded-2xl p-10 md:p-14 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {g("sections", "cta_title", "Let's Build Together")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {g("sections", "cta_desc", "Whether you're a university, business, NGO, or government agency — we'd love to explore how we can create value together. Reach out to start a conversation.")}
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default Collaborate;