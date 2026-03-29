import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
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

  const donationUrl = g("donation", "donation_url", "https://flutterwave.com/pay/8atwd1q3u556");

  const socialLinks = {
    facebook: g("social", "facebook", ""),
    linkedin: g("social", "linkedin", ""),
    twitter: g("social", "twitter", ""),
    instagram: g("social", "instagram", ""),
  };

  const socialIcons = [
    { icon: Facebook, url: socialLinks.facebook },
    { icon: Linkedin, url: socialLinks.linkedin },
    { icon: Twitter, url: socialLinks.twitter },
    { icon: Instagram, url: socialLinks.instagram },
  ];

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
      <PageSEO title="Contact Us" description="Get in touch with Global Nexus Institute for inquiries about programs, admissions, partnerships, or donations." path="/contact" />
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

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", text: g("info", "address", "Kigali, Rwanda\nKN 78 St, Norrsken House") },
                  { icon: Mail, title: "Email", text: g("info", "email", "info@globalnexus.africa") },
                  { icon: Phone, title: "Phone", text: g("info", "phone", "+250 787 406 140\n+254 707 825 181"), whatsapp: "250787406140" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-0.5">{item.title}</h3>
                      {'whatsapp' in item && item.whatsapp ? (
                        <a href={`https://wa.me/${item.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm whitespace-pre-line">{item.text}</a>
                      ) : (
                        <p className="text-muted-foreground text-sm whitespace-pre-line">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div>
                  <h3 className="font-bold text-foreground mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialIcons.filter(s => s.url && s.url !== "#").map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                    {socialIcons.every(s => !s.url || s.url === "#") && (
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
                <textarea placeholder="Message *" rows={4} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" required />
                <button type="submit" disabled={sending} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Support Our Mission</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Help us provide education to underrepresented groups including females, young mothers, and people with disabilities. Your contribution directly impacts lives and creates lasting change in communities across Africa.
              </p>
              <div className="bg-card rounded-2xl p-6 border border-border mb-6">
                <h3 className="font-bold text-foreground mb-4">Your Impact</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Fund scholarships for deserving students",
                    "Support educational resources and equipment",
                    "Enable impactful mentorship programs",
                    "Create opportunities for vulnerable communities",
                    "Provide access to modern technology and tools",
                    "Empower women and youth through digital skills",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card-hover p-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Make a Donation</h3>
              <p className="text-sm text-muted-foreground mb-6">Choose an amount or enter a custom value below.</p>
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
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-accent text-accent-foreground py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-md shadow-accent/30"
              >
                Donate Now — {currency === "USD" ? "$" : ""}{customAmount || selectedDonation || 50}{currency === "RWF" ? " RWF" : ""}
              </a>
              <div className="mt-6 text-center bg-primary/5 rounded-xl p-4 border border-primary/10">
                <p className="text-sm font-semibold text-foreground mb-1">🙏 Thank You for Your Donation!</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your generosity makes a real difference. Every contribution helps us empower communities through education and technology across Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
