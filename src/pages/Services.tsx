import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const services = [
  { title: "Training Enumerators", desc: "Our comprehensive enumerator training program combines theoretical knowledge with hands-on practice, covering survey methodologies, data quality protocols, and ethical guidelines." },
  { title: "Data Collection", desc: "Utilizing cutting-edge digital tools and methodologies, we conduct comprehensive data collection across various sectors with rigorous quality control measures." },
  { title: "Data Processing", desc: "Transform raw data into meaningful insights through our advanced processing services. We employ sophisticated cleaning algorithms, statistical validation techniques, and quality assurance protocols." },
  { title: "Report Writing", desc: "Our expert report writing service transforms complex data into clear, actionable insights with detailed analysis, visual representations, and strategic recommendations." },
  { title: "Internship", desc: "We offer academic and professional internship to students in Data Analytics, Data Science, Software Development and IT, providing hands-on experience in real-world projects." },
  { title: "Interns to Companies", desc: "We connect companies in tech and data-driven fields with skilled interns proficient in data analytics, machine learning, software development, and IT." },
];

const Services = () => (
  <Layout>
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Professional Services</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          We deliver comprehensive data solutions and actionable insights to drive informed business decisions.
        </p>
      </div>
    </section>

    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-lg p-10 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Contact us to discuss your project requirements and how we can help you achieve your goals.
          </p>
          <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
