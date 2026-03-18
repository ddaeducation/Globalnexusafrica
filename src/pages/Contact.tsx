import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const donationAmounts = [25, 50, 100, 250];

const Contact = () => {
  const [selectedDonation, setSelectedDonation] = useState(50);

  return (
    <Layout>
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Get in touch with us for any inquiries about our programs, admissions, or partnerships.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Kigali, Rwanda<br />KN 78 St, Kigali Norrsken House</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@globalnexus.africa</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+250 787 406 140 / +254 707 825 181</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Follow Us</h3>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="text-primary hover:opacity-80">Facebook</a>
                    <a href="#" className="text-primary hover:opacity-80">LinkedIn</a>
                    <a href="#" className="text-primary hover:opacity-80">Twitter</a>
                    <a href="#" className="text-primary hover:opacity-80">Instagram</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-primary" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-primary" />
                <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-primary" />
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 resize-none focus:outline-none focus:border-primary" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Help us provide education opportunities to underrepresented groups including females, young mothers, and people with disabilities.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Your Impact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Fund scholarships for deserving students</li>
                <li>✓ Support educational resources and equipment</li>
                <li>✓ Enable impactful mentorship programs</li>
                <li>✓ Create opportunities for vulnerable communities</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Make a Donation</h3>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {donationAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedDonation(amt)}
                    className={`py-3 rounded-lg font-semibold transition ${
                      selectedDonation === amt
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <a
                href="https://flutterwave.com/pay/8atwd1q3u556"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
