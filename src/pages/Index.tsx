import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap, Award, BookOpen, Phone, ArrowRight, X, Sparkles } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const quickLinks = [
  { title: "Apply Now", desc: "Start your journey with Global Nexus", path: "/admissions", icon: GraduationCap },
  { title: "Scholarships", desc: "Explore funding opportunities", path: "/admissions", icon: Award },
  { title: "Learning Portal", desc: "Access your online courses", path: "/programs", icon: BookOpen },
  { title: "Contact Us", desc: "Get in touch with our team", path: "/contact", icon: Phone },
];

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { content: c } = useAllSiteContent("home");

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const heroImage = g("hero", "hero_image", "/images/hero-main.jpg");

  const stats = [
    { value: g("stats", "stat1_value", "200+"), label: g("stats", "stat1_label", "Students Trained") },
    { value: g("stats", "stat2_value", "95%"), label: g("stats", "stat2_label", "Success Rate") },
    { value: g("stats", "stat3_value", "10+"), label: g("stats", "stat3_label", "Expert Mentors") },
  ];

  const popupDetails = g(
    "popup",
    "details",
    "• Learn With our platform: www.skilla.africa\n• 4 Weeks, live online sessions\n• Led by Professional Data Analysts & Scientists\n• Live sessions Start on: April 6, 2026\n• WhatsApp: +250787406140",
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed px-4 sm:px-6"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        {/* ✅ NO OVERLAY */}

        <div className="relative z-10 text-center w-full max-w-4xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-sm px-4 py-1.5 rounded-full mb-6 shadow-md">
            <Sparkles className="h-4 w-4" />
            {g("hero", "badge", "Empowering Africa's Tech Future")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-white tracking-tight drop-shadow-2xl">
            {g("hero", "title_line1", "Global Nexus")} {g("hero", "title_line2", "Institute")}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
            {g("hero", "subtitle", "Connect with future tech leaders")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              to="/programs"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://skilla.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 border border-white/30"
            >
              Our eLearning
            </a>
          </div>

          <a
            href="https://skilla.africa/auth?redirect=/become-instructor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg"
          >
            Become an Instructor
          </a>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-14 max-w-lg mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-4 sm:p-5 shadow-lg"
              >
                <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-white drop-shadow">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* باقي الكود بدون تغيير */}
    </Layout>
  );
};

export default Index;
