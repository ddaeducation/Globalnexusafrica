import { useState } from "react";
import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, HelpCircle, Heart, Briefcase, Building2, Handshake, Award, ArrowLeft } from "lucide-react";
import WhyUsPage from "./WhyUs";
import CareerPage from "./Career";
import CorporatePage from "./Corporate";
import CollaboratePage from "./Collaborate";
import FAQsPage from "./FAQs";
import DonatePage from "./Donate";

const subPages = [
  { key: "portal", label: "Portal", icon: BookOpen },
  { key: "why-us", label: "Why Us", icon: Award },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "corporate", label: "Corporate", icon: Building2 },
  { key: "collaborate", label: "Collaborate", icon: Handshake },
  { key: "faqs", label: "FAQs", icon: HelpCircle },
  { key: "donate", label: "Donate", icon: Heart },
];

const pageComponents: Record<string, React.FC> = {
  "why-us": WhyUsPage,
  "career": CareerPage,
  "corporate": CorporatePage,
  "collaborate": CollaboratePage,
  "faqs": FAQsPage,
  "donate": DonatePage,
};

const ELearning = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "portal";

  const setTab = (key: string) => {
    setSearchParams(key === "portal" ? {} : { tab: key });
    window.scrollTo(0, 0);
  };

  const PageComponent = pageComponents[activeTab];

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      {/* Sub-navigation */}
      <div className="fixed top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground shrink-0 mr-1"
              title="Back to main site"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-6 w-px bg-border shrink-0 mr-1" />
            {subPages.map((page) => (
              <button
                key={page.key}
                onClick={() => setTab(page.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeTab === page.key
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <page.icon className="h-4 w-4" />
                {page.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-12">
        {activeTab === "portal" ? (
          <div className="h-[calc(100vh-3rem)] w-full">
            <iframe
              src="https://skilla.africa/"
              title="eLearning Portal - Skilla"
              className="w-full h-full border-0"
              allow="fullscreen; clipboard-write; encrypted-media"
            />
          </div>
        ) : PageComponent ? (
          <PageComponent />
        ) : null}
      </div>
    </>
  );
};

export default ELearning;
