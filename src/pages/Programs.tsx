import Layout from "@/components/Layout";
import { Clock, BookOpen, ExternalLink } from "lucide-react";

const programs = [
  {
    title: "Professional Data Analytics & GenAI",
    level: "Intermediate",
    desc: "Master the Advanced of Python programming and its powerful data analysis tools, Excel, Python, VScode, and PowerBI. Accredited by Institute of Analytics (United Kingdom).",
    duration: "3 months",
    focus: "Comprehensive Data Analysis Tools",
    tools: "Python, Excel, MySQL, and PowerBI",
    price: "$120",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Professional Business Data Analytics",
    level: "Intermediate",
    desc: "Learn to create powerful dashboards and reports using SQL, Python, and Power BI for business insights.",
    duration: "6 months",
    focus: "Visualization/Business Intelligence",
    tools: "Python, Excel, MySQL, VsCode, and PowerBI",
    price: "$600",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Professional Data Science & AI",
    level: "Intermediate",
    desc: "Bridge the gap between data science and business strategy with practical applications and case studies.",
    duration: "8 months",
    focus: "Data Science, AI Integration",
    tools: "Python, SQL, Excel, PowerBI, Machine Learning, and NLP",
    price: "$800",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Data Management Professional",
    level: "Intermediate",
    desc: "Master essential data management skills to efficiently collect, clean, organize, privacy, and analyze business data.",
    duration: "1 month",
    focus: "Data Collection, Privacy and Storage",
    tools: "Data Cleaning and Analyzing",
    price: "$100",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
];

const Programs = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Professional Programs</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Discover our comprehensive range of professional programs designed to prepare you for success in the data-driven world.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {programs.map((p) => (
          <div key={p.title} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {p.level}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> Duration: {p.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" /> {p.focus}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" /> {p.tools}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-display text-2xl font-bold text-primary">{p.price}</span>
                <div className="flex gap-2">
                  <a
                    href={p.lms}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center gap-1"
                  >
                    Open LMS <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={p.pay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                  >
                    Pay Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-muted rounded-xl p-10 border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Want to Learn More?</h2>
        <p className="text-muted-foreground mb-6">
          Open our comprehensive program brochure for detailed information about our courses, faculty, and admission requirements.
        </p>
        <a
          href="https://skilla.africa/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition inline-block"
        >
          Visit eLearning Portal
        </a>
      </div>
    </section>
  </Layout>
);

export default Programs;
