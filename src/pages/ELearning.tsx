import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSEO from "@/components/PageSEO";

const LMS_BASE = "https://skilla.africa";

const ELearning = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: LMS_BASE + "/",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/elearning/login", { replace: true });
      } else {
        setChecking(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/elearning/login", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const iframeUrl = courseSlug
    ? `${LMS_BASE}/course/${courseSlug}`
    : settings.iframe_url;

  return (
    <>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[50px] bg-transparent pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto absolute top-[10px] left-[calc(520px-3cm)] inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-900 bg-white/80 backdrop-blur-sm rounded-md shadow-sm hover:text-primary transition-all"
          title="Back to Main Site"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Main Site</span>
        </Link>
      </div>
      <div className="h-screen w-full">
        <iframe
          src={iframeUrl}
          title="eLearning Portal"
          className="w-full h-full border-0"
          allow="fullscreen; clipboard-write; encrypted-media"
        />
      </div>
    </>
  );
};

export default ELearning;
