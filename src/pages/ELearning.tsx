import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

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
        <div className="container mx-auto px-4 md:px-6 py-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 group"
            title="Back to main site"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
            <span className="text-sm font-display font-bold text-foreground group-hover:text-primary transition">
              {settings.back_label}
            </span>
          </Link>
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
            allow="fullscreen; clipboard-write; encrypted-media"
          />
        </div>
      </div>
    </>
  );
};

export default ELearning;