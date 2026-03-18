import Layout from "@/components/Layout";

const partners = [
  { name: "NCC Education UK", desc: "Certified programs in collaboration with NCC Education UK, ensuring international recognition of our qualifications.", img: "ncc.png" },
  { name: "RMI-Rwanda", desc: "Strategic partnership for professional development and industry-aligned training programs.", img: "rmi.png" },
  { name: "SOLVIT AFRICA", desc: "Collaborations with leading tech companies for internships, mentorship, and employment opportunities.", img: "solvit.png" },
  { name: "ICT Chamber-Rwanda", desc: "Collaborations with ICT Chamber Rwanda and their leading tech companies for mentorship and employment opportunities.", img: "ict.png" },
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

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About Global Nexus Institute</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Bridging the Digital Skills Gap — Empowering the next generation of tech leaders with world-class education and hands-on experience.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground">
          Global Nexus Institute is a leading educational institution dedicated to empowering the next generation of technology leaders. Founded with the vision of bridging the digital skills gap in Rwanda and East Africa, we provide world-class education in partnership with industry leaders.
        </p>
        <p className="text-muted-foreground mt-4">
          Our institute combines theoretical knowledge with practical, hands-on experience to prepare students for the demands of the modern tech industry. Through our partnerships with leading technology companies and research institutions, we ensure our curriculum remains cutting-edge and relevant.
        </p>
      </div>
    </section>

    {/* Partners */}
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Accreditation & Partnerships</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={`https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/${p.img}`}
                  alt={p.name}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">Our Passionate Team</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((t) => (
          <div key={t.name} className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
              <img
                src={`https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/src/pages/images/${t.img}`}
                alt={t.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
            <p className="text-sm text-primary font-medium">{t.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
