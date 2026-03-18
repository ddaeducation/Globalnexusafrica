import Layout from "@/components/Layout";

const areas = [
  { title: "AI Solutions", desc: "Custom AI implementations for business optimization and automation.", items: ["Chatbot Development", "Image Recognition Systems", "Process Automation"] },
  { title: "Data Analytics", desc: "End-to-end data analytics solutions for business intelligence.", items: ["Business Intelligence Dashboards", "Predictive Analytics Tools", "Data Visualization Platforms"] },
  { title: "Digital Transformation", desc: "Comprehensive digital solutions for business modernization.", items: ["Process Digitization", "Cloud Migration", "Digital Workflow Solutions"] },
];

const Research = () => (
  <Layout>
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Projects & Innovation</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Delivering innovative solutions and transformative projects that create real-world impact across various industries.
        </p>
      </div>
    </section>

    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Project Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((a) => (
            <div key={a.title} className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{a.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{a.desc}</p>
              <ul className="space-y-2">
                {a.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Project Partners</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="font-semibold text-gray-900 mb-3">Technology Partners</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Sand Technologies</li>
              <li>• NCC Education (UK)</li>
              <li>• African Leadership Experience (Alx)</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="font-semibold text-gray-900 mb-3">Industry Partners</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• ICT Chamber Rwanda</li>
              <li>• Solvit Africa-Rwanda</li>
              <li>• Rwanda Management Institute</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Research;
