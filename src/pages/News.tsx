import Layout from "@/components/Layout";
import { ArrowRight, Quote } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const News = () => {
  const { content: c } = useAllSiteContent("news");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const newsItems = Array.from({ length: 4 }, (_, i) => {
    const n = i + 1;
    const title = g("news_items", `n${n}_title`, "");
    if (!title) return null;
    return {
      title,
      date: g("news_items", `n${n}_date`, ""),
      desc: g("news_items", `n${n}_desc`, ""),
      image: g("news_items", `n${n}_image`, ""),
      link: g("news_items", `n${n}_link`, "#"),
    };
  }).filter(Boolean);

  const testimonials = Array.from({ length: 3 }, (_, i) => {
    const n = i + 1;
    const name = g("testimonials", `t${n}_name`, "");
    if (!name) return null;
    return {
      name,
      role: g("testimonials", `t${n}_role`, ""),
      quote: g("testimonials", `t${n}_quote`, ""),
      img: g("testimonials", `t${n}_img`, ""),
    };
  }).filter(Boolean);

  return (
    <Layout>
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "News & Events")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Stay updated with the latest happenings at Global Nexus Institute.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Latest News</h2>
          <p className="section-subtitle">Updates, events, and achievements from our community</p>
          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <div key={item!.title} className="card-hover overflow-hidden group">
                <div className="overflow-hidden">
                  <img src={`${IMG_BASE}/${item!.image}`} alt={item!.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{item!.date}</span>
                  <h3 className="text-lg font-bold text-foreground mt-3 mb-2">{item!.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item!.desc}</p>
                  <a href={item!.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">Hear from graduates who transformed their careers</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t!.name} className="card-hover p-7 relative">
                <Quote className="h-8 w-8 text-primary/15 absolute top-5 right-5" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-primary/10">
                    <img src={`${IMG_BASE}/${t!.img}`} alt={t!.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{t!.name}</h4>
                    <p className="text-xs text-primary font-medium">{t!.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t!.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
