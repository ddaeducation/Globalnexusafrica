import Layout from "@/components/Layout";
import { Users, Target, Lightbulb } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const partners = [
  { name: "NCC Education UK", desc: "Certified programs ensuring international recognition of qualifications.", img: "ncc.png" },
  { name: "RMI-Rwanda", desc: "Strategic partnership for professional development and industry-aligned training.", img: "rmi.png" },
  { name: "SOLVIT AFRICA", desc: "Collaborations for internships, mentorship, and employment opportunities.", img: "solvit.png" },
  { name: "ICT Chamber-Rwanda", desc: "Leading tech companies partnerships for mentorship and employment.", img: "ict.png" },
];

const team = [
  { name: "Theoneste NDAYISENGA", role: "Founder, CEO & Project Lead", desc: "Educator, Data Scientist, and Analyst", img: "theoneste.jpeg" },
  { name: "Francis KIPKOGEI YEGO", role: "Board Member & Data Scientist", desc: "AI, Actuarial Scientist, Statistician", img: "francis.png" },
  { name: "Ass Prof. Innocent NGARUYE", role: "Board Member & Senior Researcher", desc: "Data Scientist, and Researcher", img: "innocent.png" },
  { name: "Didier NGAMIJE", role: "Data Analytics Instructor", desc: "Data Analyst, and Developer", img: "didier.png" },
  { name: "Dieudonne UWASE", role: "Board Member & Coach", desc: "Educational Technology, Business Coach", img: "Uwase.jpg" },
  { name: "Eugene MUTUYIMANA", role: "Software Developer & Facilitator", desc: "Software development, Data Analysis", img: "eugene.jpg" },
  { name: "Francis Muhirwa", role: "Web & Graphic Designer", desc: "Project management, Content Creation", img: "muhirwa.png" },
  { name: "Elizen Awuor", role: "Client Experience Coordinator", desc: "Customer Experience, Quality Assurance", img: "elizen.jpeg" },
  { name: "Geredi NIYIBIGIRA", role: "AI Instructor", desc: "Artificial Intelligence, Machine Learning", img: "geredi.png" },
];

const About = () => {
  const { content: c } = useAllSiteContent("about");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  return (
    <Layout>
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "About Global Nexus Institute")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Bridging the Digital Skills Gap — Empowering the next generation of tech leaders with world-class education and hands-on experience.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Target, title: "Our Purpose", text: "Bridging the digital skills gap in Rwanda and East Africa." },
              { icon: Users, title: "Our Approach", text: "Combining theory with practical, hands-on industry experience." },
              { icon: Lightbulb, title: "Our Edge", text: "Partnerships with leading tech companies keep us cutting-edge." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Who We Are</h3>
              <p className="text-gray-500 leading-relaxed">
                {g("story", "paragraph1", "A leading institution empowering Africa's next generation of tech leaders. We bridge the digital skills gap in Rwanda and East Africa through world-class education and industry partnerships.")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How We Teach</h3>
              <p className="text-gray-500 leading-relaxed">
                {g("story", "paragraph2", "We blend theory with hands-on practice to prepare students for today's tech industry. Our partnerships with leading companies and research institutions keep our curriculum cutting-edge.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Accreditation & Partnerships</h2>
          <p className="section-subtitle">Globally recognized certifications and industry partnerships</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((p, i) => (
              <div key={p.name} className="card-hover p-6 text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden p-2">
                  <img src={`${IMG_BASE}/${p.img}`} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Passionate Team</h2>
          <p className="section-subtitle">Meet the experts driving innovation and excellence</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="card-hover p-6 text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary/20 transition-all duration-300">
                  <img src={`${IMG_BASE}/${t.img}`} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold text-gray-900">{t.name}</h3>
                <p className="text-sm text-primary font-semibold mt-0.5">{t.role}</p>
                <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
