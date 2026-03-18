import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const IMG_BASE = "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
        style={{ backgroundImage: `url('${IMG_BASE}/hello.avif')` }}
      >
        <div className="absolute inset-0 bg-red-900/10" />
        <div className="relative z-10 text-center w-full py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Global Nexus Institute
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white">
            Connect with future tech leaders
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              to="/programs"
              className="bg-white text-primary px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Explore Programs
            </Link>
            <a
              href="https://skilla.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition"
            >
              Our elearning
            </a>
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <a
              href="https://skilla.africa/auth?redirect=/become-instructor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transform transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Become an Instructor
            </a>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center mt-12">
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-1 text-white">200+</div>
              <div className="text-sm text-blue-100">Students Trained</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-1 text-white">95%</div>
              <div className="text-sm text-blue-100">Success Rate</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold mb-1 text-white">10+</div>
              <div className="text-sm text-blue-100">Expert Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center relative max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <img src={`${IMG_BASE}/logo.png`} alt="Logo" className="w-16 h-16 object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Call For Application!</h2>
              <p className="text-gray-600 mb-2">Don't miss this opportunity to join us!</p>
              <p className="text-red-600 font-semibold mb-4">Deadline: April 6, 2026</p>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              X
            </button>

            <div className="space-y-4 w-full text-left">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Python For Data Analyst (Online)</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Learn With our platform: www.skilla.africa</li>
                  <li>• Python For Data Analyst, 4 Weeks (live online)</li>
                  <li>• Led by Professional Data Analysts & Scientists</li>
                  <li>• Live sessions Start on: April 6, 2026</li>
                  <li>• Attend & Learn From Anywhere & Anytime</li>
                  <li>• Reach out to WhatsApp: +250787406140</li>
                  <li>
                    <a
                      href="https://skilla.africa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-white bg-red-600 px-4 py-2 text-center rounded-lg font-semibold"
                    >
                      Use MOMOpay: 030700 & Contact: 0787406140
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a
              href="https://forms.gle/ReNWMuzp6vhBLaMs8"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-white bg-blue-600 px-3 py-2 text-center rounded-sm font-semibold"
            >
              Click Here to Apply For Python For Data Analyst
            </a>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Link to="/admissions" className="group">
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-primary mb-2">Apply Now</h3>
                <p className="text-gray-600">Start your journey with Global Nexus</p>
              </div>
            </Link>
            <Link to="/admissions" className="group">
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-primary mb-2">Scholarships</h3>
                <p className="text-gray-600">Explore funding opportunities</p>
              </div>
            </Link>
            <Link to="/programs" className="group">
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-primary mb-2">Learning Portal</h3>
                <p className="text-gray-600">Access your online courses</p>
              </div>
            </Link>
            <Link to="/contact" className="group">
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-primary mb-2">Contact Us</h3>
                <p className="text-gray-600">Get in touch with our team</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision & Mission</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Vision</h3>
                <p className="text-lg text-gray-600">
                  To be a transformative institution that empowers the next generation of leaders, innovators, and professionals in technology and data sciences across Africa and beyond.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Mission</h3>
                <p className="text-lg text-gray-600">
                  To provide high-quality, accessible education that bridges local needs with global opportunities, creating pathways to employment, innovation, and societal impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Gallery */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Students at Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["back.jpeg", "learning.jpeg", "steam2.jpeg"].map((img, i) => (
              <img
                key={i}
                src={`${IMG_BASE}/${img}`}
                alt="Students"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Professional Data Science & Artificial Intelligence (New)", desc: "Join us new professional Data Science & Artificial Intelligence program in collaboration with Institute of Analytics (Endorsed).", img: "teaching.jpeg" },
              { title: "National Computing Center (UK) & Tech Innovation Workshop", desc: "A hands-on workshop exploring the latest trends in AI and Python Data Analytics and more", img: "studing.jpeg" },
              { title: "Professional Business Data Analytics (New)", desc: "Global Nexus Institute is pleased to announce the new program: Professional Business Data Analytics (endorsed by NCC and IoA).", img: "setting.jpeg" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={`${IMG_BASE}/${item.img}`} alt="Event" className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <Link to="/news" className="text-primary font-semibold hover:opacity-80">Learn more →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
