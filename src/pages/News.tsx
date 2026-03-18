import Layout from "@/components/Layout";

const newsItems = [
  {
    title: "New Partnership with ASSA (University of Rwanda)",
    date: "March 15, 2024",
    desc: "Global Nexus announces strategic partnerships with University of Rwanda Students to enhance student opportunities...",
    image: "team.jpeg",
    link: "https://www.linkedin.com/pulse/global-nexus-institute-updates-global-nexus-institute-nunyf/",
  },
  {
    title: "Data Analytics & Data Science in-person Training",
    date: "September 15, 2024",
    desc: "Global Nexus Institute we don't keep all of our training online, we do meet in-person, cheer and discuss more.",
    image: "team1.jpeg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7289945115026989056/",
  },
  {
    title: "Student at Tech Innovation GIZ learning facilities",
    date: "August 21, 2024",
    desc: "Our students secured top positions at the Innovation Challenge, highlighting that learning and collaboration are key to success.",
    image: "learning.jpeg",
    link: "#",
  },
  {
    title: "Student Success at Tech Innovation Challenge",
    date: "June 10, 2024",
    desc: "Our students secured a meeting with the Business Manager at the National Computing Center (UK) to learn more about their program and opportunities in the IT domain.",
    image: "studing.jpeg",
    link: "#",
  },
];

const testimonials = [
  {
    name: "Didier NGAMIJE",
    role: "Data Analyst at Ganza Africa",
    quote: "The Data Science course completely transformed my career. Within 3 months of graduation, I landed my first job at Ganza Africa.",
    img: "didier.png",
  },
  {
    name: "Samuelson MUKIZA",
    role: "Student at University of Rwanda",
    quote: "I am excited to have completed the Python for Data Science course at GNI, gaining invaluable skills. I highly recommend this course to anyone passionate about data science.",
    img: "samuelson.jpg",
  },
  {
    name: "Samuel KIPKOGEI",
    role: "Data Analyst Intern",
    quote: "Thanks to the Data Analytics program, I transitioned from statistics to a data analytics career successfully.",
    img: "samuel.png",
  },
];

const News = () => (
  <Layout>
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Stay updated with the latest happenings at Global Nexus Institute.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Latest News</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {newsItems.map((item) => (
          <div key={item.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={`https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <span className="text-xs text-muted-foreground">{item.date}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-medium hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-3 text-foreground">Success Stories</h2>
        <p className="text-center text-muted-foreground mb-10">Hear from our graduates who transformed their careers</p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={`https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/${t.img}`}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm">{t.name}</h4>
                  <p className="text-xs text-primary">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default News;
