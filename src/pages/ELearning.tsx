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
          <div className="flex items-center justify-between py-2">
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0 group"
              title="Back to main site"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
            </Link>

            {/* Logo + Portal branding */}
            <div className="flex items-center gap-2">
              <img
                src="https://www.globalnexus.africa/images/logo.png"
                alt="Global Nexus Institute"
                className="h-8 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-sm font-display font-bold text-foreground">
                Portal
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-primary hover:text-primary/80 transition">
                Home
              </Link>
              <Link to="/why-us" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
                Why Us
              </Link>
            </nav>
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
