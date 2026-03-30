import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const defaultFaqCategories = [
  {
    category: "Programs & Courses",
    faqs: [
      { q: "What programs does Global Nexus Institute offer?", a: "We offer professional certifications in Data Analytics, Data Science, AI & Machine Learning, Software Development, and Cybersecurity. Programs range from 4-week short courses to multi-month comprehensive certifications." },
      { q: "Are courses available online?", a: "Yes! We offer both online and in-person training. Online programs are delivered through our eLearning platform (skilla.africa) with live sessions, while in-person training is held at our Kigali campus." },
      { q: "How long do programs typically take?", a: "Program durations vary: short courses are 4–6 weeks, professional certificates are 8–12 weeks, and comprehensive programs can run for several months." },
      { q: "What tools and technologies will I learn?", a: "Depending on your program, you'll work with Python, SQL, Power BI, Excel, TensorFlow, R, JavaScript, React, and more — all industry-standard tools." },
    ],
  },
  {
    category: "Admissions & Requirements",
    faqs: [
      { q: "What are the entry requirements?", a: "Requirements vary by program. Generally, you need a high school diploma or equivalent. Some advanced programs may require prior experience or coursework in related fields." },
      { q: "How do I apply?", a: "Visit our Admissions page and click 'Apply Now' to fill out the online application form. Our team will review your application and contact you within a few days." },
      { q: "Can I apply for multiple programs?", a: "Yes, you can apply for multiple programs. However, we recommend focusing on one program at a time to maximize your learning experience." },
      { q: "Is there an application deadline?", a: "We accept rolling admissions for most programs. Specific cohort-based programs have deadlines which are announced on our website and social media." },
    ],
  },
  {
    category: "Fees & Payments",
    faqs: [
      { q: "What payment methods are accepted?", a: "We accept MoMo Pay, bank transfers, and online payments through our payment portal. Installment plans are available for most programs." },
      { q: "Are scholarships available?", a: "Yes! We offer merit-based scholarships covering up to 30% of tuition fees. We also have early-bird discounts for upfront payments and flexible installment plans." },
      { q: "Can I get a refund if I drop out?", a: "Please refer to our Refund Policy document for detailed information on refund eligibility and timelines." },
    ],
  },
  {
    category: "Certification & Career",
    faqs: [
      { q: "Do I get a certificate upon completion?", a: "Yes! All graduates receive a certificate of completion. Programs accredited by RTB Rwanda and NCC Education UK carry internationally recognized certifications." },
      { q: "Does Global Nexus help with job placement?", a: "We provide career guidance, CV reviews, and connect graduates with our industry partners for internship and job opportunities." },
      { q: "Can I become an instructor?", a: "Yes! If you have relevant expertise, visit our eLearning platform (skilla.africa) and apply through the 'Become an Instructor' option." },
    ],
  },
];

// Parse FAQ categories from CMS format (pipe-separated) back to objects
const parseFaqString = (str: string): { q: string; a: string }[] => {
  const pairs = str.split("||").filter(Boolean);
  return pairs.map((pair) => {
    const [q, a] = pair.split("|");
    return { q: q?.trim() || "", a: a?.trim() || "" };
  });
};

const FAQs = () => {
  const { content: c } = useAllSiteContent("faqs_page");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const cmsCategories = (c.categories as any)?.items;
  const faqCategories = cmsCategories
    ? cmsCategories.map((cat: any) => ({
        category: cat.category,
        faqs: typeof cat.faqs === "string" ? parseFaqString(cat.faqs) : cat.faqs || [],
      }))
    : defaultFaqCategories;

  return (
    <>
      <PageSEO title="FAQs" description="Frequently asked questions about Global Nexus Institute." path="/faqs" />

      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Frequently Asked Questions")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Find answers to common questions about our programs, admissions, and more.")}
          </p>
        </div>
      </section>

      {faqCategories.map((cat: any, catIdx: number) => (
        <ScrollReveal key={cat.category} delay={catIdx * 80}>
          <section className={`py-12 ${catIdx % 2 === 0 ? "bg-card" : "bg-muted"}`}>
            <div className="container mx-auto px-6 md:px-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                {cat.category}
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {cat.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-background rounded-xl border border-border overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-foreground hover:text-primary transition-colors list-none text-sm">
                      {faq.q}
                      <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal delay={200}>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {g("sections", "cta_title", "Still Have Questions?")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {g("sections", "cta_desc", "Can't find what you're looking for? Reach out to our team and we'll be happy to help.")}
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Us
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default FAQs;