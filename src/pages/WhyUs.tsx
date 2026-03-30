import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircle, Award, Users, Globe, BookOpen, Lightbulb, Shield, TrendingUp } from "lucide-react";

const reasons = [
  { icon: Award, title: "Accredited Programs", desc: "Our programs are accredited by RTB Rwanda and NCC Education UK, ensuring internationally recognized certifications.", color: "from-red-500 to-orange-400" },
  { icon: Users, title: "Expert Mentors", desc: "Learn from 10+ industry professionals with real-world experience in data science, AI, and software development.", color: "from-blue-500 to-cyan-400" },
  { icon: Globe, title: "Global Opportunities", desc: "We bridge local needs with global opportunities, connecting graduates to international career pathways.", color: "from-green-500 to-emerald-400" },
  { icon: BookOpen, title: "Practical Curriculum", desc: "Hands-on, project-based learning using industry-standard tools like Python, SQL, Power BI, and more.", color: "from-purple-500 to-violet-400" },
  { icon: Lightbulb, title: "Innovation-Driven", desc: "We stay at the forefront of technology trends, continuously updating our programs to match industry demands.", color: "from-orange-500 to-amber-400" },
  { icon: Shield, title: "Inclusive Education", desc: "Committed to accessible education for underrepresented groups including women, youth, and people with disabilities.", color: "from-pink-500 to-rose-400" },
];

const stats = [
  { value: "200+", label: "Students Trained" },
  { value: "95%", label: "Completion Rate" },
  { value: "10+", label: "Expert Mentors" },
  { value: "5+", label: "Programs Offered" },
];

const WhyUs = () => (
  <>
    <PageSEO title="Why Choose Us" description="Discover why Global Nexus Institute is the leading tech education provider in Africa." path="/why-us" />

    <section className="hero-section py-20 text-white">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">Why Choose Us</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
          What sets Global Nexus Institute apart as your partner in tech education.
        </p>
      </div>
    </section>

    <ScrollReveal>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-muted rounded-2xl p-6 border border-border">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="section-title">Why Global Nexus?</h2>
          <p className="section-subtitle">Six compelling reasons to start your journey with us</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 80}>
                <div className="card-hover p-7 group h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <r.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
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
          <div className="bg-card rounded-2xl p-10 md:p-14 border border-border relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Our Track Record</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              With a 95% success rate and over 200 students trained, Global Nexus Institute has established itself as a trusted partner for individuals and organizations seeking quality tech education in Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle className="h-4 w-4" /> RTB Rwanda Accredited
              </div>
              <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle className="h-4 w-4" /> NCC Education UK Partner
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle className="h-4 w-4" /> Industry-Led Training
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </>
);

export default WhyUs;
