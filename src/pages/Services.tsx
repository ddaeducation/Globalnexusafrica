import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ClipboardList, Database, Cog, FileText, GraduationCap, Users, ArrowRight } from "lucide-react";

const services = [
  { icon: ClipboardList, title: "Training Enumerators", desc: "Comprehensive training covering survey methodologies, data quality protocols, and ethical guidelines with hands-on practice.", color: "from-red-500 to-rose-400" },
  { icon: Database, title: "Data Collection", desc: "Cutting-edge digital tools and methodologies with rigorous quality control across various sectors.", color: "from-blue-500 to-cyan-400" },
  { icon: Cog, title: "Data Processing", desc: "Advanced cleaning algorithms, statistical validation, and quality assurance for meaningful insights.", color: "from-purple-500 to-violet-400" },
  { icon: FileText, title: "Report Writing", desc: "Complex data transformed into clear, actionable insights with visual representations and recommendations.", color: "from-orange-500 to-amber-400" },
  { icon: GraduationCap, title: "Internship", desc: "Academic and professional internships in Data Analytics, Data Science, and Software Development.", color: "from-green-500 to-emerald-400" },
  { icon: Users, title: "Interns to Companies", desc: "Connecting companies with skilled interns proficient in data analytics, ML, and software development.", color: "from-pink-500 to-rose-400" },
];

const Services = () => (
  <Layout>
    <section className="hero-section py-20 text-white">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">Professional Services</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
          Comprehensive data solutions and actionable insights for informed business decisions.
        </p>
      </div>
    </section>

    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className="card-hover p-7 group" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Contact us to discuss your project requirements and how we can help you achieve your goals.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
