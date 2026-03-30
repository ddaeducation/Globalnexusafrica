import { useState } from "react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, HelpCircle, Heart, Briefcase, Building2, Handshake, Award, ArrowLeft } from "lucide-react";

const subPages = [
  { key: "portal", label: "Portal", icon: BookOpen },
  { key: "why-us", label: "Why Us", icon: Award },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "corporate", label: "Corporate", icon: Building2 },
  { key: "collaborate", label: "Collaborate", icon: Handshake },
  { key: "faqs", label: "FAQs", icon: HelpCircle },
  { key: "donate", label: "Donate", icon: Heart },
];

// Lazy imports for sub-page content
import WhyUs from "./WhyUs";
import Career from "./Career";
import Corporate from "./Corporate";
import Collaborate from "./Collaborate";
import FAQs from "./FAQs";
import Donate from "./Donate";

const ELearning = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "portal";

  const setTab = (key: string) => {
    setSearchParams(key === "portal" ? {} : { tab: key });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "why-us": return <WhyUsContent />;
      case "career": return <CareerContent />;
      case "corporate": return <CorporateContent />;
      case "collaborate": return <CollaborateContent />;
      case "faqs": return <FAQsContent />;
      case "donate": return <DonateContent />;
      default:
        return (
          <div className="-mt-2 h-[calc(100vh-8rem)] w-full">
            <iframe
              src="https://skilla.africa/"
              title="eLearning Portal - Skilla"
              className="w-full h-full border-0"
              allow="fullscreen; clipboard-write; encrypted-media"
            />
          </div>
        );
    }
  };

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      {/* Sticky sub-navigation bar */}
      <div className="fixed top-0 z-50 w-full bg-card border-b border-border shadow-sm">
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
        {renderContent()}
      </div>
    </>
  );
};

// Wrapper components that render page content without Layout (since ELearning has its own nav)
const WhyUsContent = () => {
  // Re-use the WhyUs page but we import it directly
  return <WhyUs />;
};
const CareerContent = () => <Career />;
const CorporateContent = () => <Corporate />;
const CollaborateContent = () => <Collaborate />;
const FAQsContent = () => <FAQs />;
const DonateContent = () => <Donate />;

export default ELearning;
