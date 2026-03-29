import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { CheckCircle, ArrowRight, BadgePercent, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const defaultSteps = [
  { title: "Submit Application", desc: "Complete the online application form with your personal and academic information.", color: "from-red-500 to-orange-400" },
  { title: "Document Review", desc: "Our admissions team will review your application and supporting documents.", color: "from-blue-500 to-cyan-400" },
  { title: "Interview", desc: "Selected candidates will be invited for an interview with faculty members.", color: "from-green-500 to-emerald-400" },
];

const Admissions = () => {
  const { content: c } = useAllSiteContent("admissions");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const steps = (c.steps as any)?.items || defaultSteps;

  const faqs = [
    { q: g("faq", "faq1_q", "What are the entry requirements?"), a: g("faq", "faq1_a", "Requirements vary by program. Generally, you need a high school diploma or equivalent. Some advanced programs may require prior experience or coursework in related fields.") },
    { q: g("faq", "faq2_q", "How long do the programs take?"), a: g("faq", "faq2_a", "Program duration ranges from 4 weeks for short courses to several months for comprehensive certifications. Each program page lists the specific duration.") },
    { q: g("faq", "faq3_q", "Are classes online or in-person?"), a: g("faq", "faq3_a", "We offer both online and in-person training options. Our online programs are delivered through our eLearning platform (skilla.africa) with live sessions, while in-person sessions are held at our Kigali campus.") },
    { q: g("faq", "faq4_q", "What payment methods are accepted?"), a: g("faq", "faq4_a", "We accept MoMo Pay, bank transfers, and online payments through our payment portal. Installment plans are available for most programs.") },
    { q: g("faq", "faq5_q", "Do you offer certificates upon completion?"), a: g("faq", "faq5_a", "Yes! All graduates receive a certificate of completion. Our programs accredited by RTB Rwanda and NCC Education UK carry internationally recognized certifications.") },
    { q: g("faq", "faq6_q", "Can I apply for multiple programs?"), a: g("faq", "faq6_a", "Yes, you can apply for multiple programs. However, we recommend focusing on one program at a time to maximize your learning experience.") },
  ];

  return (
    <Layout>
      <PageSEO title="Admissions" description="Apply to Global Nexus Institute — learn about our admissions process, scholarships, and financial aid options." path="/admissions" />
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Admissions Process")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Begin your journey towards a successful career in technology.")}
          </p>
        </div>
      </section>

      <ScrollReveal>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">{g("sections", "steps_title", "How to Apply")}</h2>
          <p className="section-subtitle">{g("sections", "steps_subtitle", "Three simple steps to start your tech career")}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s: any, idx: number) => (
              <div key={s.title + idx} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${s.color || "from-primary to-primary/60"} text-white flex items-center justify-center text-2xl font-extrabold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {idx + 1}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/apply"
              className="btn-primary text-lg inline-flex items-center gap-2 !px-10 !py-4"
            >
              Apply Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">{g("sections", "scholarships_title", "Scholarships & Financial Aid")}</h2>
          <p className="section-subtitle">{g("sections", "scholarships_subtitle", "We're committed to making education accessible")}</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/apply" className="card-hover p-8 relative overflow-hidden text-center group cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40" />
              <CheckCircle className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{g("scholarship1", "title", "Merit Scholarships")}</h3>
              <p className="text-sm text-muted-foreground">{g("scholarship1", "description", "Available for outstanding academic achievers, covering up to 30% of tuition fees.")}</p>
            </Link>
            <Link to="/apply" className="card-hover p-8 relative overflow-hidden text-center group cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/40" />
              <CheckCircle className="h-10 w-10 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{g("scholarship2", "title", "Installment Plans")}</h3>
              <p className="text-sm text-muted-foreground">{g("scholarship2", "description", "Flexible payment options available to help manage your educational investment.")}</p>
            </Link>
            <Link to="/apply" className="card-hover p-8 relative overflow-hidden text-center group cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
              <BadgePercent className="h-10 w-10 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{g("scholarship3", "title", "Pay Upfront & Save")}</h3>
              <p className="text-sm text-muted-foreground">{g("scholarship3", "description", "Pay your full tuition before the program starts and receive an exclusive early-bird discount on your fees.")}</p>
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal delay={200}>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">{g("sections", "faq_title", "Frequently Asked Questions")}</h2>
          <p className="section-subtitle">{g("sections", "faq_subtitle", "Find answers to common questions about our admissions")}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-muted rounded-xl border border-border overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-foreground hover:text-primary transition-colors list-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Admissions;
