import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Award, BookOpen, ArrowRight, Briefcase, Phone, ChevronRight } from "lucide-react";

const stats = [
  { value: "200+", label: "Students Trained" },
  { value: "95%", label: "Success Rate" },
  { value: "10+", label: "Expert Mentors" },
];

const quickLinks = [
  { title: "Apply Now", desc: "Start your journey with Global Nexus", path: "/admissions", icon: GraduationCap },
  { title: "Scholarships", desc: "Explore funding opportunities", path: "/admissions", icon: Award },
  { title: "Learning Portal", desc: "Access your online courses", path: "/programs", icon: BookOpen },
  { title: "Contact Us", desc: "Get in touch with our team", path: "/contact", icon: Phone },
];

const news = [
  {
    title: "Professional Data Science & Artificial Intelligence (New)",
    desc: "Join us new professional Data Science & Artificial Intelligence program in collaboration with Institute of Analytics (Endorsed).",
    image: "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/teaching.jpeg",
  },
  {
    title: "National Computing Center (UK) & Tech Innovation Workshop",
    desc: "A hands-on workshop exploring the latest trends in AI and Python Data Analytics and more.",
    image: "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/studing.jpeg",
  },
  {
    title: "Professional Business Data Analytics (New)",
    desc: "Global Nexus Institute is pleased to announce the new program: Professional Business Data Analytics (endorsed by NCC and IoA).",
    image: "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/setting.jpeg",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/back.jpeg')] bg-cover bg-center opacity-15" />
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Global Nexus Institute
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Connect with future tech leaders
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/programs"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://skilla.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground/50 px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition"
            >
              Our eLearning
            </a>
          </div>
          <a
            href="https://skilla.africa/auth?redirect=/become-instructor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm opacity-80 hover:opacity-100 underline transition"
          >
            Become an Instructor →
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="font-display text-2xl md:text-3xl font-bold">{s.value}</div>
              <div className="text-xs md:text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Call for Application Banner */}
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-secondary-foreground">📢 Call For Application!</h2>
          <p className="text-sm text-secondary-foreground/80">
            Python For Data Analyst (Online) — 4 Weeks, Live online. Deadline: April 6, 2026
          </p>
        </div>
        <a
          href="https://forms.gle/ReNWMuzp6vhBLaMs8"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition whitespace-nowrap"
        >
          Apply Now
        </a>
      </div>
    </section>

    {/* Quick Links */}
    <section className="container mx-auto px-4 py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="group bg-card p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <item.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
            <ChevronRight className="h-4 w-4 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Our Vision & Mission</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-xl border border-border">
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Vision</h3>
            <p className="text-muted-foreground">
              To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border">
            <h3 className="font-display text-xl font-semibold text-primary mb-3">Mission</h3>
            <p className="text-muted-foreground">
              To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Students at Work */}
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center mb-8 text-foreground">Our Students at Work</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {["back.jpeg", "learning.jpeg", "steam2.jpeg"].map((img) => (
          <div key={img} className="rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src={`https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/${img}`}
              alt="Students at work"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>

    {/* News */}
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Latest News & Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <Link to="/news" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
