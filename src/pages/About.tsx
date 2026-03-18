import Layout from "@/components/Layout";

const IMG_BASE = "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images";

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
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">About Global Nexus Institute</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Global Nexus Institute: Bridging the Digital Skills Gap Empowering the next generation of tech leaders with world-class education and hands-on experience.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-gray-600 text-lg mb-4">
          Global Nexus Institute is a leading educational institution dedicated to empowering the next generation of technology leaders. Founded with the vision of bridging the digital skills gap in Rwanda and East Africa, we provide world-class education in partnership with industry leaders.
        </p>
        <p className="text-gray-600 text-lg">
          Our institute combines theoretical knowledge with practical, hands-on experience to prepare students for the demands of the modern tech industry. Through our partnerships with leading technology companies and research institutions, we ensure our curriculum remains cutting-edge and relevant.
        </p>
      </div>
    </section>

    {/* Partners */}
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Accreditation & Partnerships</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((p) => (
            <div key={p.name} className="bg-white rounded-lg p-6 shadow-md text-center">
              <img src={`${IMG_BASE}/${p.img}`} alt={p.name} className="h-20 w-20 mx-auto mb-4 object-contain" loading="lazy" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Our Passionate Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition">
              <img
                src={`${IMG_BASE}/${t.img}`}
                alt={t.name}
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-primary font-medium">{t.role}</p>
              <p className="text-xs text-gray-600 mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
