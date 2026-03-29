import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { ClipboardList, Database, Cog, FileText, GraduationCap, Users, ArrowRight, Briefcase, FlaskConical } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = {
  ClipboardList, Database, Cog, FileText, GraduationCap, Users,
};

const defaultServices = [
  { title: "Training Enumerators", desc: "Comprehensive training covering survey methodologies, data quality protocols, and ethical guidelines with hands-on practice.", icon: "ClipboardList", color: "from-red-500 to-rose-400" },
  { title: "Data Collection", desc: "Cutting-edge digital tools and methodologies with rigorous quality control across various sectors.", icon: "Database", color: "from-blue-500 to-cyan-400" },
  { title: "Data Processing", desc: "Advanced cleaning algorithms, statistical validation, and quality assurance for meaningful insights.", icon: "Cog", color: "from-purple-500 to-violet-400" },
  { title: "Report Writing", desc: "Complex data transformed into clear, actionable insights with visual representations and recommendations.", icon: "FileText", color: "from-orange-500 to-amber-400" },
  { title: "Internship", desc: "Academic and professional internships in Data Analytics, Data Science, and Software Development.", icon: "GraduationCap", color: "from-green-500 to-emerald-400" },
  { title: "Interns to Companies", desc: "Connecting companies with skilled interns proficient in data analytics, ML, and software development.", icon: "Users", color: "from-pink-500 to-rose-400" },
];

const Services = () => {
  const { content: c } = useAllSiteContent("services");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const services = (c.services_list as any)?.items || defaultServices;

  return (
    <Layout>
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Professional Services")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Comprehensive data solutions and actionable insights for informed business decisions.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s: any, i: number) => {
              const Icon = iconMap[s.icon] || Briefcase;
              return (
                <div key={s.title + i} className="card-hover p-7 group" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color || "from-primary to-primary/60"} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Research Link */}
          <div className="mt-12">
            <Link to="/research" className="card-hover p-8 flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <FlaskConical className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Research</h3>
                <p className="text-sm text-muted-foreground">Explore our applied research in AI, data science, educational technology, and community development.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-16 text-center bg-card rounded-2xl p-12 shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {g("cta", "title", "Ready to Get Started?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {g("cta", "subtitle", "Contact us to discuss your project requirements and how we can help you achieve your goals.")}
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
