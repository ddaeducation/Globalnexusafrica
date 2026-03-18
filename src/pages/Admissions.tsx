import Layout from "@/components/Layout";

const steps = [
  { num: 1, title: "Submit Application", desc: "Complete the online application form with your personal and academic information." },
  { num: 2, title: "Document Review", desc: "Our admissions team will review your application and supporting documents." },
  { num: 3, title: "Interview", desc: "Selected candidates will be invited for an interview with faculty members." },
];

const Admissions = () => (
  <Layout>
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Admissions Process</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Begin your journey towards a successful career in technology. Apply now to join our innovative learning community.
        </p>
      </div>
    </section>

    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How to Apply</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {s.num}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://forms.gle/B1vbHxjXeQMt4hDx9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>

    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Scholarships & Financial Aid</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Merit Scholarships</h3>
            <p className="text-sm text-gray-600">Available for outstanding academic achievers, covering up to 30% of tuition fees.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Installment Plans</h3>
            <p className="text-sm text-gray-600">Flexible payment options available to help manage your educational investment.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Admissions;
