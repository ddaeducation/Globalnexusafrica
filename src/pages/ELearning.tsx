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
      <div className="fixed top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 py-2">
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0 group"
              title="Back to main site"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              <span className="text-sm font-display font-bold text-foreground group-hover:text-primary transition">
                Portal
              </span>
            </Link>
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
