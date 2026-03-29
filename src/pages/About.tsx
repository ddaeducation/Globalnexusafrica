import Layout from "@/components/Layout";
import { Users, Target, Lightbulb } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const defaultPartners = [
  { name: "RTB Rwanda", desc: "Accredited by Rwanda TVET Board for quality technical and vocational education.", img: "/images/rtb.jpg" },
  { name: "NCC Education UK", desc: "Certified programs ensuring international recognition of qualifications.", img: `${IMG_BASE}/ncc.png` },
  { name: "WorldQuant University", desc: "Partnership coming soon — global online university for data science and quantitative finance.", img: "/images/wqu.png" },
  { name: "RMI-Rwanda", desc: "Strategic partnership for professional development and industry-aligned training.", img: `${IMG_BASE}/rmi.png` },
  { name: "SOLVIT AFRICA", desc: "Collaborations for internships, mentorship, and employment opportunities.", img: `${IMG_BASE}/solvit.png` },
  { name: "ICT Chamber-Rwanda", desc: "Leading tech companies partnerships for mentorship and employment.", img: `${IMG_BASE}/ict.png` },
];

const defaultTeam = [
  { name: "Theoneste NDAYISENGA", role: "Founder, CEO & Project Lead", desc: "Educator, Data Scientist, and Analyst", img: `${IMG_BASE}/theoneste.jpeg` },
  { name: "Francis KIPKOGEI YEGO", role: "Board Member & Data Scientist", desc: "AI, Actuarial Scientist, Statistician", img: `${IMG_BASE}/francis.png` },
  { name: "Ass Prof. Innocent NGARUYE", role: "Board Member & Senior Researcher", desc: "Data Scientist, and Researcher", img: `${IMG_BASE}/innocent.png` },
  { name: "Didier NGAMIJE", role: "Data Analytics Instructor", desc: "Data Analyst, and Developer", img: `${IMG_BASE}/didier.png` },
  { name: "Dieudonne UWASE", role: "Board Member & Coach", desc: "Educational Technology, Business Coach", img: `${IMG_BASE}/Uwase.jpg` },
  { name: "Eugene MUTUYIMANA", role: "Software Developer & Facilitator", desc: "Software development, Data Analysis", img: `${IMG_BASE}/eugene.jpg` },
  { name: "Francis Muhirwa", role: "Web & Graphic Designer", desc: "Project management, Content Creation", img: `${IMG_BASE}/muhirwa.png` },
  { name: "Joie Sophia UMUHOZA", role: "Marketing & Project Manager", desc: "Marketing, Project Experience", img: "/images/sophia.jpeg" },
  { name: "Geredi NIYIBIGIRA", role: "AI & Data Science Instructor", desc: "Artificial Intelligence, Machine Learning", img: `${IMG_BASE}/geredi.png` },
];

const About = () => {
  const { content: c } = useAllSiteContent("about");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const partners = (c.partners as any)?.items || defaultPartners;
  const team = (c.team as any)?.items || defaultTeam;

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

      <section className="py-16 bg-card">
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
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("story", "paragraph1", "A leading institution empowering Africa's next generation of tech leaders. We bridge the digital skills gap in Rwanda and East Africa through world-class education and industry partnerships.")}
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">How We Teach</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("story", "paragraph2", "We blend theory with hands-on practice to prepare students for today's tech industry. Our partnerships with leading companies and research institutions keep our curriculum cutting-edge.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Accreditation & Partnerships</h2>
          <p className="section-subtitle">Globally recognized certifications and industry partnerships</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p: any, i: number) => (
              <div key={p.name + i} className="card-hover p-6 text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-28 h-28 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden p-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
                <h3 className="font-bold text-foreground mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Passionate Team</h2>
          <p className="section-subtitle">Meet the experts driving innovation and excellence</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t: any, i: number) => (
              <div key={t.name + i} className="card-hover p-6 text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-border group-hover:ring-primary/20 transition-all duration-300">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                </div>
                <h3 className="font-bold text-foreground">{t.name}</h3>
                <p className="text-sm text-primary font-semibold mt-0.5">{t.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
