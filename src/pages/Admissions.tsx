import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";

const steps = [
  { num: 1, title: "Submit Application", desc: "Complete the online application form with your personal and academic information." },
  { num: 2, title: "Document Review", desc: "Our admissions team will review your application and supporting documents." },
  { num: 3, title: "Interview", desc: "Selected candidates will be invited for an interview with faculty members." },
];

const Admissions = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Admissions Process</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Begin your journey towards a successful career in technology. Apply now to join our innovative learning community.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">How to Apply</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold">
              {s.num}
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://forms.gle/B1vbHxjXeQMt4hDx9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-secondary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition inline-block"
        >
          Apply Now
        </a>
      </div>
    </section>

    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Scholarships & Financial Aid</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-card p-8 rounded-xl border border-border">
            <CheckCircle className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Merit Scholarships</h3>
            <p className="text-sm text-muted-foreground">
              Available for outstanding academic achievers, covering up to 30% of tuition fees.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border">
            <CheckCircle className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Installment Plans</h3>
            <p className="text-sm text-muted-foreground">
              Flexible payment options available to help manage your educational investment.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Admissions;
