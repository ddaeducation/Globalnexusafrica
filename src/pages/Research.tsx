import Layout from "@/components/Layout";
import { Bot, BarChart3, Globe, Handshake } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const areas = [
  { icon: Bot, title: "AI Solutions", desc: "Custom AI implementations for business optimization and automation.", items: ["Chatbot Development", "Image Recognition Systems", "Process Automation"], color: "from-red-500 to-orange-400" },
  { icon: BarChart3, title: "Data Analytics", desc: "End-to-end data analytics solutions for business intelligence.", items: ["Business Intelligence Dashboards", "Predictive Analytics Tools", "Data Visualization Platforms"], color: "from-blue-500 to-cyan-400" },
  { icon: Globe, title: "Digital Transformation", desc: "Comprehensive digital solutions for business modernization.", items: ["Process Digitization", "Cloud Migration", "Digital Workflow Solutions"], color: "from-purple-500 to-violet-400" },
];

const Research = () => {
  const { content: c } = useAllSiteContent("research");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  return (
    <Layout>
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Projects & Innovation")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Delivering innovative solutions and transformative projects that create real-world impact.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Project Areas</h2>
          <p className="section-subtitle">Innovative solutions across key technology domains</p>
          <div className="grid md:grid-cols-3 gap-8">
            {areas.map((a) => (
              <div key={a.title} className="card-hover p-8 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <a.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-5">{a.desc}</p>
                <ul className="space-y-2.5">
                  {a.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Project Partners</h2>
          <p className="section-subtitle">Collaborating with industry leaders for maximum impact</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card-hover p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900">Technology Partners</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Sand Technologies</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> NCC Education (UK)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> African Leadership Experience (Alx)</li>
              </ul>
            </div>
            <div className="card-hover p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-bold text-gray-900">Industry Partners</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> ICT Chamber Rwanda</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Solvit Africa-Rwanda</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Rwanda Management Institute</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
