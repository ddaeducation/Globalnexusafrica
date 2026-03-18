import Layout from "@/components/Layout";

const IMG_BASE = "https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images";

const programs = [
  {
    title: "Professional Data Analytics & GenAI",
    level: "Intermediate",
    desc: 'Master the Advanced of Python programming and its powerful data analysis tools, Excel, Python, VScode, and PowerBI. Accredited by Institute of Analytics (United Kingdom).',
    duration: "3 months",
    focus: "Comprehensive Data Analysis Tools",
    tools: "Python, Excel, MySQL, and PowerBI",
    price: "$120",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Professional Business Data Analytics",
    level: "Intermediate",
    desc: "Learn to create powerful dashboards and reports using SQL, Python, and Power BI for business insights.",
    duration: "6 months",
    focus: "Visualization/Business Intelligence",
    tools: "Python, Excel, MySQL, VsCode, and PowerBI",
    price: "$600",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Professional Data Science & AI",
    level: "Intermediate",
    desc: "Bridge the gap between data science and business strategy with practical applications and case studies.",
    duration: "8 months",
    focus: "Data Science, AI Integration",
    tools: "Python, SQL, Excel, PowerBI, Machine Learning, and NLP",
    price: "$800",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
  {
    title: "Data Management Professional",
    level: "Intermediate",
    desc: "Master essential data management skills to efficiently collect, clean, organize, privacy, and analyze business data.",
    duration: "1 month",
    focus: "Data Collection, Privacy and Storage",
    tools: "Data Cleaning and Analyzing",
    price: "$100",
    lms: "https://skilla.africa/",
    pay: "https://store.pesapal.com/globalnexusinstituteltd",
  },
];

const Programs = () => (
  <Layout>
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Professional Programs</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Discover our comprehensive range of professional programs designed to prepare you for success in the data-driven world.
        </p>
      </div>
    </section>

    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((p) => (
            <div key={p.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {p.level}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm text-gray-600">• Duration: {p.duration}</li>
                  <li className="text-sm text-gray-600">• {p.focus}</li>
                  <li className="text-sm text-gray-600">• {p.tools}</li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-primary">{p.price}</span>
                  <div className="flex gap-2">
                    <a href={p.lms} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                      Open LMS
                    </a>
                    <a href="https://skilla.africa/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
                      Sign In
                    </a>
                    <a href={p.pay} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                      Pay Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Programs;
