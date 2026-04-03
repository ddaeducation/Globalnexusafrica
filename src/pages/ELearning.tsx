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
    <div className="h-screen w-full flex flex-col">
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      <nav className="w-full bg-background border-b border-border px-4 py-2 flex items-center gap-4 shrink-0 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          title="Back to Main Site"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Main Site</span>
        </Link>
      </nav>
      <iframe
        src={iframeUrl}
        title="eLearning Portal - Skilla"
        className="w-full flex-1 border-0"
        allow="fullscreen; clipboard-write; encrypted-media"
      />
    </div>
  );
};

export default ELearning;