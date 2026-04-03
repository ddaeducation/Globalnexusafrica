import { useState, useEffect } from "react";
import PageSEO from "@/components/PageSEO";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, LogOut } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

const LMS_BASE = "https://skilla.africa";

const ELearning = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: LMS_BASE + "/",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/elearning/login");
        return;
      }

      // Check if onboarding is completed
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile && !profile.onboarding_completed) {
        navigate("/elearning/onboarding");
        return;
      }

      setAuthChecked(true);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/elearning/login");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
        <div className="pointer-events-auto absolute top-[10px] left-[calc(520px-3cm)] inline-flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-900 bg-white/80 backdrop-blur-sm rounded-md shadow-sm hover:text-primary transition-all"
            title="Back to Main Site"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Main Site</span>
          </Link>
          <Link
            to="/elearning/profile"
            className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-gray-900 bg-white/80 backdrop-blur-sm rounded-md shadow-sm hover:text-primary transition-all"
            title="Profile"
          >
            <User className="h-4 w-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-gray-900 bg-white/80 backdrop-blur-sm rounded-md shadow-sm hover:text-destructive transition-all"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
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
