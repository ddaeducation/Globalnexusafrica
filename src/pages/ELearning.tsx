import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ELearning = () => {
  const [searchParams] = useSearchParams();
  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: "https://skilla.africa/",
  });

  const courseUrl = searchParams.get("course");
  const iframeUrl = courseUrl || settings.iframe_url;

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      <Link
        to="/"
        className="fixed top-3 left-[calc(3rem+2cm)] z-[9999] inline-flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border shadow-lg rounded-full px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:border-primary transition-all"
        title="Back to Main Site"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Main Site</span>
      </Link>
      <div className="h-screen w-full">
        <iframe
          src={iframeUrl}
          title="eLearning Portal - Skilla"
          className="w-full h-full border-0"
          allow="fullscreen; clipboard-write; encrypted-media"
        />
      </div>
    </>
  );
};

export default ELearning;