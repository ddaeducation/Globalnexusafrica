import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ClipboardList, Database, Cog, FileText, GraduationCap, Users } from "lucide-react";

const services = [
  {
    icon: ClipboardList,
    title: "Training Enumerators",
    desc: "Our comprehensive enumerator training program combines theoretical knowledge with hands-on practice, covering survey methodologies, data quality protocols, and ethical guidelines.",
  },
  {
    icon: Database,
    title: "Data Collection",
    desc: "Utilizing cutting-edge digital tools and methodologies, we conduct comprehensive data collection across various sectors with rigorous quality control measures.",
  },
  {
    icon: Cog,
    title: "Data Processing",
    desc: "Transform raw data into meaningful insights through our advanced processing services. We employ sophisticated cleaning algorithms, statistical validation techniques, and quality assurance protocols.",
  },
  {
    icon: FileText,
    title: "Report Writing",
    desc: "Our expert report writing service transforms complex data into clear, actionable insights with detailed analysis, visual representations, and strategic recommendations.",
  },
  {
    icon: GraduationCap,
    title: "Internship",
    desc: "We offer academic and professional internship to students in Data Analytics, Data Science, Software Development and IT, providing hands-on experience in real-world projects.",
  },
  {
    icon: Users,
    title: "Interns to Companies",
    desc: "We connect companies in tech and data-driven fields with skilled interns proficient in data analytics, machine learning, software development, and IT.",
  },
];

const Services = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Professional Services</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          We deliver comprehensive data solutions and actionable insights to drive informed business decisions.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
            <s.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-muted rounded-xl p-10 border border-border">
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">
          Contact us to discuss your project requirements and how we can help you achieve your goals.
        </p>
        <Link
          to="/contact"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition inline-block"
        >
          Contact Us
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;
