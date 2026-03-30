import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Briefcase, Code, BarChart3, Brain, Database, ArrowRight, MapPin } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const defaultCareerPaths = [
  { icon: BarChart3, title: "Data Analyst", desc: "Analyze and interpret complex datasets to help organizations make data-driven decisions.", skills: "Python, SQL, Power BI, Excel", color: "from-blue-500 to-cyan-400" },
  { icon: Brain, title: "Data Scientist", desc: "Build predictive models and machine learning solutions to solve complex business problems.", skills: "Python, TensorFlow, R, Statistics", color: "from-purple-500 to-violet-400" },
  { icon: Code, title: "Software Developer", desc: "Design and build web applications and software solutions for businesses across Africa.", skills: "JavaScript, React, Node.js, APIs", color: "from-green-500 to-emerald-400" },
  { icon: Database, title: "Database Administrator", desc: "Manage, secure, and optimize database systems for reliable data storage and retrieval.", skills: "SQL, PostgreSQL, MongoDB, Cloud", color: "from-orange-500 to-amber-400" },
];

const defaultOpenings = [
  { title: "Instructor — Data Analytics", type: "Full-time", location: "Kigali / Remote", desc: "Join our teaching team to deliver hands-on data analytics training to the next generation of African tech talent." },
  { title: "Instructor — Python & AI", type: "Part-time", location: "Remote", desc: "Teach Python programming and AI fundamentals through our online eLearning platform (skilla.africa)." },
  { title: "Student Intern — Web Development", type: "Internship", location: "Kigali", desc: "Gain real-world experience in web development while contributing to meaningful projects." },
];

const iconMap: Record<string, any> = { BarChart3, Brain, Code, Database };

const Career = () => {
  const { content: c } = useAllSiteContent("career");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const careerPaths = (c.paths as any)?.items || defaultCareerPaths;
  const openings = (c.openings as any)?.items || defaultOpenings;

  return (
    <>
      <PageSEO title="Career" description="Explore career paths in data science, software development, and AI at Global Nexus Institute." path="/career" />

      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Career Pathways")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Launch or advance your tech career with guidance from Global Nexus Institute.")}
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="section-title">{g("sections", "paths_title", "Career Paths We Prepare You For")}</h2>
            <p className="section-subtitle">{g("sections", "paths_subtitle", "Our programs are designed to lead directly into high-demand tech roles")}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerPaths.map((cp: any, i: number) => {
                const IconComp = cp.icon && typeof cp.icon === "string" ? (iconMap[cp.icon] || BarChart3) : (cp.icon || BarChart3);
                return (
                  <ScrollReveal key={cp.title} delay={i * 80}>
                    <div className="card-hover p-7 group h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cp.color || "from-blue-500 to-cyan-400"} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{cp.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cp.desc}</p>
                      {cp.skills && (
                        <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                          {cp.skills}
                        </div>
                      )}
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
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="section-title">{g("sections", "openings_title", "Current Openings")}</h2>
            <p className="section-subtitle">{g("sections", "openings_subtitle", "Join our team and make a difference in tech education")}</p>
            <div className="space-y-4">
              {openings.map((o: any) => (
                <div key={o.title} className="card-hover p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{o.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{o.desc}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {o.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {o.location}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-primary text-sm !px-6 !py-2.5 flex items-center gap-2 shrink-0 self-start md:self-center">
                    Apply <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <div className="bg-muted rounded-2xl p-10 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <h2 className="text-2xl font-bold text-foreground mb-3">{g("sections", "cta_title", "Don't See a Fit?")}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                {g("sections", "cta_desc", "We're always looking for passionate people. Send us your CV and we'll keep you in mind for future opportunities.")}
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default Career;