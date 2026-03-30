import PageSEO from "@/components/PageSEO";
import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, GraduationCap, ArrowRight, CheckCircle, BarChart3 } from "lucide-react";

const offerings = [
  { icon: GraduationCap, title: "Corporate Training", desc: "Customized training programs for your team in data analytics, AI, Python, and digital skills tailored to your business needs.", color: "from-blue-500 to-cyan-400" },
  { icon: Users, title: "Talent Pipeline", desc: "Access our pool of skilled graduates for recruitment — data analysts, developers, and AI specialists ready to contribute.", color: "from-green-500 to-emerald-400" },
  { icon: BarChart3, title: "Data Consulting", desc: "End-to-end data solutions including collection, processing, analysis, and reporting for your organization's projects.", color: "from-purple-500 to-violet-400" },
  { icon: TrendingUp, title: "Upskilling Programs", desc: "Help your existing workforce stay competitive with continuous learning in emerging technologies and methodologies.", color: "from-orange-500 to-amber-400" },
];

const benefits = [
  "Tailored programs aligned to your business objectives",
  "Flexible delivery — on-site, online, or hybrid",
  "Internationally accredited certifications for participants",
  "Measurable learning outcomes and ROI tracking",
  "Post-training support and mentorship",
  "Access to industry-standard tools and platforms",
];

const Corporate = () => (
  <Layout>
    <PageSEO title="Corporate Solutions" description="Custom corporate training, talent pipeline, and data consulting services from Global Nexus Institute for businesses across Africa." path="/corporate" />

    <section className="hero-section py-20 text-white">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">Corporate Solutions</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
          Empowering organizations with data-driven talent and skills.
        </p>
      </div>
    </section>

    <ScrollReveal>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">Comprehensive solutions for your organization's growth</p>
          <div className="grid md:grid-cols-2 gap-6">
            {offerings.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 80}>
                <div className="card-hover p-7 group h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <o.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{o.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Partner With Us?</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <Building2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Get a Custom Proposal</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us about your team's needs and we'll design a tailored program with clear outcomes and competitive pricing.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Request a Proposal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </Layout>
);

export default Corporate;
