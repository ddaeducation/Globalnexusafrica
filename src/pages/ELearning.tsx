import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const elearningLinks = [
  { path: "/", label: "Home" },
  { path: "/why-us", label: "Why Us" },
  { path: "/career", label: "Career" },
  { path: "/corporate", label: "Corporate" },
  { path: "/collaborate", label: "Collaborate" },
  { path: "/faqs", label: "FAQs" },
];

const ELearning = () => {
  const [searchParams] = useSearchParams();
  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: "https://skilla.africa/",
    back_label: "Portal",
  });

  const courseUrl = searchParams.get("course");
  const iframeUrl = courseUrl || settings.iframe_url;

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      {/* Sub-navigation */}
      <div className="fixed top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-2 flex items-center gap-4 overflow-x-auto">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <img
              src="https://www.globalnexus.africa/images/lgo.png"
              alt="Global Nexus Institute Logo"
              className="h-8 w-auto"
            />
          </Link>

          <Link
            to="/"
            className="flex-shrink-0 inline-flex items-center gap-1 group"
            title="Back to main site"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
            <span className="text-sm font-display font-bold text-foreground group-hover:text-primary transition">
              {settings.back_label}
            </span>
          </Link>

          {elearningLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex-shrink-0 px-2 py-1 text-sm font-medium text-muted-foreground hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-12">
        <div className="h-[calc(100vh-3rem)] w-full">
          <iframe
            src={iframeUrl}
            title="eLearning Portal - Skilla"
            className="w-full h-full border-0"
            allow="fullscreen; clipboard-write; encrypted-media"
          />
        </div>
      </div>
    </>
  );
};

export default ELearning;
