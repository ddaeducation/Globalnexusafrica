import Layout from "@/components/Layout";
import { CheckCircle, ArrowRight, BadgePercent } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const stepColors = ["from-red-500 to-orange-400", "from-blue-500 to-cyan-400", "from-green-500 to-emerald-400"];
const scholarshipIcons = [CheckCircle, CheckCircle, BadgePercent];
const scholarshipAccents = ["from-primary to-primary/40", "from-accent to-accent/40", "from-green-500 to-emerald-400"];

const Admissions = () => {
  const { content: c } = useAllSiteContent("admissions");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const steps = Array.from({ length: 3 }, (_, i) => ({
    num: i + 1,
    title: g("steps", `step${i + 1}_title`, ["Submit Application", "Document Review", "Interview"][i]),
    desc: g("steps", `step${i + 1}_desc`, ""),
    color: stepColors[i],
  }));

  const scholarships = Array.from({ length: 3 }, (_, i) => ({
    title: g("scholarships", `s${i + 1}_title`, ["Merit Scholarships", "Installment Plans", "Pay Upfront & Save"][i]),
    desc: g("scholarships", `s${i + 1}_desc`, ""),
    Icon: scholarshipIcons[i],
    accent: scholarshipAccents[i],
    iconColor: i === 2 ? "text-green-600" : i === 1 ? "text-accent" : "text-primary",
  }));

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
        <div className="container mx-auto px-4">
          <h2 className="section-title">How to Apply</h2>
          <p className="section-subtitle">Three simple steps to start your tech career</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.num} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-2xl font-extrabold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {s.num}
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/apply" className="btn-primary text-lg inline-flex items-center gap-2 !px-10 !py-4">
              Apply Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Scholarships & Financial Aid</h2>
          <p className="section-subtitle">We're committed to making education accessible</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {scholarships.map((s) => (
              <div key={s.title} className="card-hover p-8 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${s.accent}`} />
                <s.Icon className={`h-10 w-10 ${s.iconColor} mb-4`} />
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
