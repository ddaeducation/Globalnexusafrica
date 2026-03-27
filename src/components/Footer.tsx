import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Mail, Phone, ArrowUpRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAllSiteContent, getContent } from "@/hooks/useSiteContent";

const defaultLinks = [
  { label: "Privacy Policy", url: "https://www.globalnexus.africa/images/Privacy-Policy.pdf", external: "yes" },
  { label: "Refund Policy", url: "https://www.globalnexus.africa/images/Refund-Policy.pdf", external: "yes" },
  { label: "Terms and Conditions", url: "https://www.globalnexus.africa/images/Terms-and-Conditions.pdf", external: "yes" },
  { label: "Research", url: "/research", external: "no" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { content: c } = useAllSiteContent("footer");
  const g = (section: string, key: string, fallback: string) => getContent(c, section, key, fallback);

  const links = (c.links as any)?.items || defaultLinks;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubscribing(true);
    const { error } = await supabase.from("subscribers").insert({ email: trimmed });
    setSubscribing(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already subscribed!", description: "This email is already on our list." });
      } else {
        toast({ title: "Failed to subscribe", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Subscribed!", description: "You'll receive our updates." });
      setEmail("");
    }
  };

  const whatsapp = g("contact", "whatsapp", "250787406140");

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img
                src="https://www.globalnexus.africa/images/lgo.png"
                alt="Global Nexus Institute"
                className="h-14 w-auto rounded-xl bg-white p-1.5 shadow-lg"
              />
              <div>
                <h2 className="text-base font-bold">Global Nexus Institute</h2>
                <span className="text-xs text-gray-400">—Innovation & Excellence—</span>
              </div>
            </div>
            <div className="space-y-2.5 text-gray-400 text-sm">
              <p className="flex items-center gap-2">✦ {g("highlights", "item1", "Earn global certifications")}</p>
              <p className="flex items-center gap-2">✦ {g("highlights", "item2", "Master key tech skills")}</p>
              <p className="flex items-center gap-2">✦ {g("highlights", "item3", "Connect with tech leaders")}</p>
              <p className="flex items-center gap-2">✦ {g("highlights", "item4", "Soft skills & job readiness")}</p>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="mb-5 text-base font-bold relative">
              Quick Access
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {links.map((link: any, i: number) => (
                <li key={i}>
                  {link.external === "yes" ? (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                      {link.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                    </a>
                  ) : (
                    <Link to={link.url} className="hover:text-white transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-base font-bold relative">
              Contact
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />{g("contact", "address", "Kigali, Rwanda — Norrsken House")}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary shrink-0" />{g("contact", "email", "info@globalnexus.africa")}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{g("contact", "phone1", "+250 787 406 140")}</a></li>
              {g("contact", "phone2", "+254 707 825 181") && (
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" />{g("contact", "phone2", "+254 707 825 181")}</li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-base font-bold relative">
              Stay Updated
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <p className="mb-4 text-gray-400 text-sm">
              Subscribe to receive updates and opportunities.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full btn-primary text-sm !rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {subscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <div className="flex flex-col items-center gap-4">
            <a
              href={g("seal", "seal_link", "https://certification.dbi.rw/public?name=Global Nexus Institute Ltd")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src={g("seal", "seal_image", "https://www.globalnexus.africa/images/seal.png")}
                alt="Global Nexus Institute Certification"
                className="h-28 sm:h-32 w-auto"
              />
            </a>
            <p className="text-xs">
              © {new Date().getFullYear()} Global Nexus Institute. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
