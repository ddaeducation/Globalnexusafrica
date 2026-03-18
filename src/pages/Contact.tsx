import Layout from "@/components/Layout";
import { MapPin, Mail, Phone, Heart, Users } from "lucide-react";
import { useState } from "react";

const donationAmounts = [25, 50, 100, 250];

const Contact = () => {
  const [selectedDonation, setSelectedDonation] = useState(50);

  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Get in touch with us for any inquiries about our programs, admissions, or partnerships.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">Kigali, Rwanda<br />KN 78 St, Kigali Norrsken House</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">info@globalnexus.africa</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+250 787 406 140 / +254 707 825 181</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground" />
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground" />
              <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground resize-none" />
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-destructive" />
                <h2 className="font-display text-2xl font-bold text-foreground">Support Our Mission</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Help us provide education opportunities to underrepresented groups including females, young mothers, and people with disabilities.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Your Impact</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Fund scholarships for deserving students</li>
                <li>✓ Support educational resources and equipment</li>
                <li>✓ Enable impactful mentorship programs</li>
                <li>✓ Create opportunities for vulnerable communities</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Make a Donation</h3>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {donationAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedDonation(amt)}
                    className={`py-3 rounded-lg font-semibold transition ${
                      selectedDonation === amt
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border hover:border-primary"
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
                className="block w-full text-center bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
