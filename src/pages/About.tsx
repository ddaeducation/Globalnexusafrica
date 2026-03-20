import Layout from "@/components/Layout";
import { Users, Target, Lightbulb } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const iconMap = [Target, Users, Lightbulb];

const About = () => {
  const { content: c } = useAllSiteContent("about");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const partners = Array.from({ length: 6 }, (_, i) => {
    const n = i + 1;
    const name = g("partners", `p${n}_name`, "");
    if (!name) return null;
    const img = g("partners", `p${n}_img`, "");
    const isLocal = img.startsWith("/");
    return { name, desc: g("partners", `p${n}_desc`, ""), img, isLocal };
  }).filter(Boolean);

  const team = Array.from({ length: 9 }, (_, i) => {
    const n = i + 1;
    const name = g("team", `t${n}_name`, "");
    if (!name) return null;
    return { name, role: g("team", `t${n}_role`, ""), desc: g("team", `t${n}_desc`, ""), img: g("team", `t${n}_img`, "") };
  }).filter(Boolean);

  const purposeCards = Array.from({ length: 3 }, (_, i) => {
    const n = i + 1;
    return {
      icon: iconMap[i],
      title: g("purpose", `card${n}_title`, ["Our Purpose", "Our Approach", "Our Edge"][i]),
      text: g("purpose", `card${n}_text`, ""),
    };
  });

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
            {purposeCards.map((item) => (
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
            <div className="bg-muted/50 rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("story", "paragraph1", "A leading institution empowering Africa's next generation of tech leaders.")}
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">How We Teach</h3>
              <p className="text-muted-foreground leading-relaxed">
                {g("story", "paragraph2", "We blend theory with hands-on practice to prepare students for today's tech industry.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Accreditation & Partnerships</h2>
          <p className="section-subtitle">Globally recognized certifications and industry partnerships</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((p, i) => (
              <div key={p!.name} className="card-hover p-6 text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center overflow-hidden p-2">
                  <img src={p!.isLocal ? p!.img : `${IMG_BASE}/${p!.img}`} alt={p!.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{p!.name}</h3>
                <p className="text-xs text-muted-foreground">{p!.desc}</p>
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
              <div key={t!.name} className="card-hover p-6 text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-muted group-hover:ring-primary/20 transition-all duration-300">
                  <img src={t!.img.startsWith("http") || t!.img.startsWith("/") ? t!.img : `${IMG_BASE}/${t!.img}`} alt={t!.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold text-foreground">{t!.name}</h3>
                <p className="text-sm text-primary font-semibold mt-0.5">{t!.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{t!.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
