import Layout from "@/components/Layout";
import { Clock, BookOpen, ExternalLink, CreditCard } from "lucide-react";

const programs = [
  {
    title: "Professional Data Analytics & GenAI",
    level: "Intermediate",
    desc: "Master Python programming, data analysis tools, Excel, VScode, and PowerBI. Accredited by Institute of Analytics (UK).",
    duration: "3 months",
    focus: "Comprehensive Data Analysis Tools",
    tools: "Python, Excel, MySQL, and PowerBI",
    price: "$120",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
    accent: "from-red-500 to-orange-400",
  },
  {
    title: "Professional Business Data Analytics",
    level: "Intermediate",
    desc: "Create powerful dashboards and reports using SQL, Python, and Power BI for business insights.",
    duration: "6 months",
    focus: "Visualization/Business Intelligence",
    tools: "Python, Excel, MySQL, VsCode, and PowerBI",
    price: "$600",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Professional Data Science & AI",
    level: "Intermediate",
    desc: "Bridge data science and business strategy with practical applications and case studies.",
    duration: "8 months",
    focus: "Data Science, AI Integration",
    tools: "Python, SQL, Excel, PowerBI, ML, and NLP",
    price: "$800",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
    accent: "from-purple-500 to-pink-400",
  },
  {
    title: "Data Management Professional",
    level: "Intermediate",
    desc: "Master data management skills — collect, clean, organize, and analyze business data.",
    duration: "1 month",
    focus: "Data Collection, Privacy & Storage",
    tools: "Data Cleaning and Analyzing",
    price: "$100",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
    accent: "from-green-500 to-emerald-400",
  },
];

const Programs = () => (
  <Layout>
    <section className="hero-section py-20 text-white">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">Professional Programs</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
          Comprehensive programs designed to prepare you for success in the data-driven world.
        </p>
      </div>
    </section>

    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((p) => (
            <div key={p.title} className="card-hover overflow-hidden group">
              <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
              <div className="p-7">
                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {p.level}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-5">{p.desc}</p>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-primary shrink-0" /> {p.duration}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 text-primary shrink-0" /> {p.focus}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 text-primary shrink-0" /> {p.tools}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <span className="text-3xl font-extrabold text-gray-900">{p.price}</span>
                  <div className="flex gap-2">
                    <a href={p.lms} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2 text-sm flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> LMS
                    </a>
                    <a href={p.pay} target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition flex items-center gap-1">
                      <CreditCard className="h-3 w-3" /> Pay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Programs;
