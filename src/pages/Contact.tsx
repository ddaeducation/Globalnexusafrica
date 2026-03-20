import Layout from "@/components/Layout";
import { useState } from "react";
import { MapPin, Mail, Phone, Heart, Send, Facebook, Linkedin, Twitter, Instagram, Loader2 } from "lucide-react";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const donationAmountsUSD = [25, 50, 100, 250];
const donationAmountsRWF = [5000, 10000, 25000, 50000];

const Contact = () => {
  const [selectedDonation, setSelectedDonation] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState<"USD" | "RWF">("USD");
  const { content: c } = useAllSiteContent("contact");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const [form, setForm] = useState({ full_name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Failed to send message", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ full_name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <Layout>
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">
            {g("hero", "title", "Contact Us")}
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {g("hero", "subtitle", "Get in touch for inquiries about programs, admissions, or partnerships.")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", text: g("info", "address", "Kigali, Rwanda\nKN 78 St, Norrsken House") },
                  { icon: Mail, title: "Email", text: g("info", "email", "info@globalnexus.africa") },
                  { icon: Phone, title: "Phone", text: g("info", "phone", "+250 787 406 140\n+254 707 825 181") },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                      <p className="text-gray-500 text-sm whitespace-pre-line">{item.text}</p>
                    </div>
                  </div>
                ))}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300">
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
                <textarea placeholder="Message *" rows={4} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <button type="submit" disabled={sending} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Support Our Mission</h2>
              </div>
              <p className="text-gray-500 mb-6">
                Help us provide education to underrepresented groups including females, young mothers, and people with disabilities.
              </p>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Your Impact</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {["Fund scholarships for deserving students", "Support educational resources and equipment", "Enable impactful mentorship programs", "Create opportunities for vulnerable communities"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card-hover p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Make a Donation</h3>
              {/* Currency toggle */}
              <div className="flex gap-2 mb-4">
                {(["USD", "RWF"] as const).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      currency === cur
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
              {/* Preset amounts */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {(currency === "USD" ? donationAmountsUSD : donationAmountsRWF).map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedDonation(amt); setCustomAmount(""); }}
                    className={`py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedDonation === amt && !customAmount
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {currency === "USD" ? `$${amt}` : `${amt.toLocaleString()} RWF`}
                  </button>
                ))}
              </div>
              {/* Custom amount */}
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                  {currency === "USD" ? "$" : "RWF"}
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedDonation(null); }}
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-input bg-muted/30 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition"
                />
              </div>
              <a
                href="https://flutterwave.com/pay/8atwd1q3u556"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-accent text-accent-foreground py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-md shadow-accent/30"
              >
                Donate Now — {currency === "USD" ? "$" : ""}{customAmount || selectedDonation || 50}{currency === "RWF" ? " RWF" : ""}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
