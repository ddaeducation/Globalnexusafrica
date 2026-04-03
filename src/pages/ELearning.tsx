import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const portalLinks = [
  { path: "/", label: "Home" },
  { path: "/why-us", label: "Why Us" },
  { path: "/career", label: "Career" },
  { path: "/corporate", label: "Corporate" },
  { path: "/collaborate", label: "Collaborate" },
  { path: "/faqs", label: "FAQs" },
];

const ELearning = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: "https://skilla.africa/",
    back_label: "Portal",
  });

  const courseUrl = searchParams.get("course");
  const iframeUrl = courseUrl || settings.iframe_url;

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />

      <header className="fixed top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-md">
        <nav className="container mx-auto px-4 md:px-6 py-2 flex items-center gap-1">
          <Link to="/" className="flex items-center gap-2 group shrink-0 mr-2">
            <img
              src="https://www.globalnexus.africa/images/lgo.png"
              alt="Global Nexus Institute Logo"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <Link
            to="/elearning"
            className="text-sm font-display font-bold text-primary mr-3 shrink-0"
          >
            Portal
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {portalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

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