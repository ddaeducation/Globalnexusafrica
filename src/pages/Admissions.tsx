import Layout from "@/components/Layout";
import { CheckCircle, ArrowRight, BadgePercent } from "lucide-react";
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

  return (
    <Layout>
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

      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">How to Apply</h2>
          <p className="section-subtitle">Three simple steps to start your tech career</p>
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

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="section-title">Scholarships & Financial Aid</h2>
          <p className="section-subtitle">We're committed to making education accessible</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40" />
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Merit Scholarships</h3>
              <p className="text-sm text-muted-foreground">Available for outstanding academic achievers, covering up to 30% of tuition fees.</p>
            </div>
            <div className="card-hover p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/40" />
              <CheckCircle className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Installment Plans</h3>
              <p className="text-sm text-muted-foreground">Flexible payment options available to help manage your educational investment.</p>
            </div>
            <div className="card-hover p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
              <BadgePercent className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Pay Upfront & Save</h3>
              <p className="text-sm text-muted-foreground">Pay your full tuition before the program starts and receive an exclusive early-bird discount on your fees.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
