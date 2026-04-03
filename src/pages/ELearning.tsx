import PageSEO from "@/components/PageSEO";
import { useSearchParams } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import Layout from "@/components/Layout";

const ELearning = () => {
  const [searchParams] = useSearchParams();
  const { data: settings } = useSiteContent("elearning", "settings", {
    iframe_url: "https://skilla.africa/",
    back_label: "Portal",
  });

  const courseUrl = searchParams.get("course");
  const iframeUrl = courseUrl || settings.iframe_url;

  return (
    <Layout>
      <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform — courses, career paths, corporate training, and more." path="/elearning" />
      <div className="h-[calc(100vh-4rem)] w-full">
        <iframe
          src={iframeUrl}
          title="eLearning Portal - Skilla"
          className="w-full h-full border-0"
          allow="fullscreen; clipboard-write; encrypted-media"
        />
      </div>
    </Layout>
  );
};

export default ELearning;
