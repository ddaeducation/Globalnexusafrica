import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ELearning = () => {
  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      {/* Sub-navigation */}
      <div className="fixed top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 py-2">
            <Link to="/" className="flex items-center gap-2 shrink-0 group" title="Back to main site">
              <img
                src="https://www.globalnexus.africa/images/lgo.png"
                alt="Global Nexus Institute"
                className="h-8 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </Link>
            <Link
              to="/elearning"
              className="text-sm font-display font-bold text-primary"
            >
              Portal
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-12">
        <div className="h-[calc(100vh-3rem)] w-full">
          <iframe
            src="https://skilla.africa/"
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
