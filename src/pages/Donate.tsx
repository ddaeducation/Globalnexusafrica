import PageSEO from "@/components/PageSEO";
import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { Heart, GraduationCap, Users, Globe, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const donationAmountsUSD = [25, 50, 100, 250];
const donationAmountsRWF = [5000, 10000, 25000, 50000];

const impactAreas = [
  { icon: GraduationCap, title: "Scholarships", desc: "Fund tuition for students who can't afford quality tech education.", color: "from-blue-500 to-cyan-400" },
  { icon: Users, title: "Women in Tech", desc: "Support programs empowering women and young mothers in technology careers.", color: "from-pink-500 to-rose-400" },
  { icon: Globe, title: "Community Programs", desc: "Bring digital literacy and tech skills to underserved communities across Africa.", color: "from-green-500 to-emerald-400" },
];

const impactItems = [
  "Fund scholarships for deserving students",
  "Support educational resources and equipment",
  "Enable impactful mentorship programs",
  "Create opportunities for vulnerable communities",
  "Provide access to modern technology and tools",
  "Empower women and youth through digital skills",
];

const Donate = () => {
  const [selectedDonation, setSelectedDonation] = useState<number | null>(50);
  const [donating, setDonating] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState<"USD" | "RWF">("USD");

  const handleDonate = async () => {
    const finalAmount = Number(customAmount) || selectedDonation || 50;
    if (finalAmount <= 0) {
      toast({ title: "Please select or enter a valid amount", variant: "destructive" });
      return;
    }
    setDonating(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { amount: finalAmount, currency },
      });
      if (error) throw error;
      if (data?.payment_link) {
        window.open(data.payment_link, "_blank");
      } else {
        throw new Error(data?.error || "Failed to create payment link");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({ title: "Payment error", description: err.message || "Could not create payment link.", variant: "destructive" });
    } finally {
      setDonating(false);
    }
  };

  return (
    <Layout>
      <PageSEO title="Donate" description="Support Global Nexus Institute's mission to provide accessible tech education across Africa. Every contribution makes a difference." path="/donate" />

      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">Support Our Mission</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            Your contribution directly impacts lives and creates lasting change in communities across Africa.
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="section-title">Where Your Donation Goes</h2>
            <p className="section-subtitle">Every contribution creates real, measurable impact</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {impactAreas.map((a, i) => (
                <div key={a.title} className="card-hover p-7 group text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <a.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Your Impact</h3>
                <ul className="space-y-3">
                  {impactItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-hover p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Make a Donation</h3>
                </div>
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

                <button
                  onClick={handleDonate}
                  disabled={donating}
                  className="block w-full text-center bg-accent text-accent-foreground py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-md shadow-accent/30 disabled:opacity-50"
                >
                  {donating ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Processing...</span>
                  ) : (
                    <>Donate Now — {currency === "USD" ? "$" : ""}{customAmount || selectedDonation || 50}{currency === "RWF" ? " RWF" : ""}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Donate;
