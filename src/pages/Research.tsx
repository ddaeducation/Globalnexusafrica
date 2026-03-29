import Layout from "@/components/Layout";
import { BookOpen, FileText, Users, Lightbulb } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = { Lightbulb, FileText, BookOpen, Users };

const defaultAreas = [
  { title: "Artificial Intelligence & Machine Learning", desc: "Exploring AI applications in healthcare, agriculture, and education across East Africa.", icon: "Lightbulb" },
  { title: "Data Science & Analytics", desc: "Leveraging data-driven insights to solve real-world challenges in the region.", icon: "FileText" },
  { title: "Educational Technology", desc: "Researching innovative approaches to digital learning and skills development.", icon: "BookOpen" },
  { title: "Community & Development", desc: "Studying the impact of technology training on socioeconomic growth in Rwanda and beyond.", icon: "Users" },
];

const Research = () => {
  const { content: c } = useAllSiteContent("research");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const areasRaw = c?.areas;
  const areas = Array.isArray(areasRaw) ? areasRaw : defaultAreas;

  return (
    <Layout>
      <section className="hero-section text-white py-20 md:py-28">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {g("hero", "title", "Research & Publications")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {g("hero", "subtitle", "Driving innovation through applied research and collaboration across Africa's tech ecosystem.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="section-title">Our Research Focus</h2>
          <p className="section-subtitle">
            We conduct impactful research that bridges the gap between academia and industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {areas.map((area: any) => {
              const Icon = iconMap[area.icon] || Lightbulb;
              return (
                <div key={area.title} className="card-hover p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">{area.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {g("cta", "title", "Collaborate With Us")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            {g("cta", "subtitle", "We welcome partnerships with universities, organizations, and researchers. Get in touch to explore opportunities.")}
          </p>
          <a href="/contact" className="btn-primary inline-block">
            {g("cta", "button_text", "Contact Our Team")}
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
