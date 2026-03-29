import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Quote } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const IMG_BASE = "https://www.globalnexus.africa/images";

const defaultNewsItems = [
  { title: "New Partnership with ASSA (University of Rwanda)", date: "March 15, 2024", desc: "Global Nexus announces strategic partnerships with University of Rwanda Students to enhance student opportunities...", image: `${IMG_BASE}/team.jpeg`, link: "https://www.linkedin.com/pulse/global-nexus-institute-updates-global-nexus-institute-nunyf/" },
  { title: "Data Analytics & Data Science in-person Training", date: "September 15, 2024", desc: "Global Nexus Institute we don't keep all of our training online, we do meet in-person, cheer and discuss more.", image: `${IMG_BASE}/team1.jpeg`, link: "https://www.linkedin.com/feed/update/urn:li:activity:7289945115026989056/" },
  { title: "Student at Tech Innovation GIZ learning facilities", date: "August 21, 2024", desc: "Our students secured top positions at the Innovation Challenge, highlighting that learning and collaboration are key to success.", image: `${IMG_BASE}/learning.jpeg`, link: "#" },
  { title: "Student Success at Tech Innovation Challenge", date: "June 10, 2024", desc: "Our students secured a meeting with the Business Manager at the National Computing Center (UK).", image: `${IMG_BASE}/studing.jpeg`, link: "#" },
];

const defaultTestimonials = [
  { name: "Didier NGAMIJE", role: "Data Analyst at Ganza Africa", quote: "The Data Science course completely transformed my career. Within 3 months of graduation, I landed my first job at Ganza Africa.", img: `${IMG_BASE}/didier.png` },
  { name: "Samuelson MUKIZA", role: "Student at University of Rwanda", quote: "I am excited to have completed the Python for Data Science course at GNI, gaining invaluable skills. I highly recommend this course.", img: `${IMG_BASE}/samuelson.jpg` },
  { name: "Samuel KIPKOGEI", role: "Data Analyst Intern", quote: "Thanks to the Data Analytics program, I transitioned from statistics to a data analytics career successfully.", img: `${IMG_BASE}/samuel.png` },
];

const News = () => {
  const { content: c } = useAllSiteContent("news");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const newsItems = (c.items as any)?.items || defaultNewsItems;
  const testimonials = (c.testimonials as any)?.items || defaultTestimonials;

  return (
    <Layout>
      <PageSEO title="News & Events" description="Latest news, events, achievements, and success stories from Global Nexus Institute." path="/news" />
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

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{g("sections", "news_title", "Latest News")}</h2>
          <p className="section-subtitle">{g("sections", "news_subtitle", "Updates, events, and achievements from our community")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item: any, i: number) => (
              <ScrollReveal key={item.title + i} delay={i * 100}>
              <div className="card-hover overflow-hidden group">
                <div className="overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{item.date}</span>
                  <h3 className="text-lg font-bold text-foreground mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  {item.link && item.link !== "#" && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1">
                      Read more <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{g("sections", "stories_title", "Success Stories")}</h2>
          <p className="section-subtitle">{g("sections", "stories_subtitle", "Hear from graduates who transformed their careers")}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t: any, i: number) => (
              <div key={t.name + i} className="card-hover p-7 relative">
                <Quote className="h-8 w-8 text-primary/15 absolute top-5 right-5" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-primary/10">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{t.name}</h4>
                    <p className="text-xs text-primary font-medium">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
