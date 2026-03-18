import Layout from "@/components/Layout";
import { Bot, BarChart3, Globe, Handshake } from "lucide-react";

const areas = [
  {
    icon: Bot,
    title: "AI Solutions",
    desc: "Custom AI implementations for business optimization and automation.",
    items: ["Chatbot Development", "Image Recognition Systems", "Process Automation"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    desc: "End-to-end data analytics solutions for business intelligence.",
    items: ["Business Intelligence Dashboards", "Predictive Analytics Tools", "Data Visualization Platforms"],
  },
  {
    icon: Globe,
    title: "Digital Transformation",
    desc: "Comprehensive digital solutions for business modernization.",
    items: ["Process Digitization", "Cloud Migration", "Digital Workflow Solutions"],
  },
];

const Research = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Projects & Innovation</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Delivering innovative solutions and transformative projects that create real-world impact across various industries.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Project Areas</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {areas.map((a) => (
          <div key={a.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
            <a.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
            <ul className="space-y-2">
              {a.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Project Partners</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-card rounded-xl p-8 border border-border">
            <Handshake className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-3">Technology Partners</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Sand Technologies</li>
              <li>• NCC Education (UK)</li>
              <li>• African Leadership Experience (Alx)</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border">
            <Handshake className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-3">Industry Partners</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• ICT Chamber Rwanda</li>
              <li>• Solvit Africa-Rwanda</li>
              <li>• Rwanda Management Institute</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Research;
