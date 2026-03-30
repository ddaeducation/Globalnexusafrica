import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";

const ELearning = () => (
  <Layout>
    <PageSEO title="eLearning Portal" description="Access the Global Nexus Institute eLearning platform powered by Skilla." path="/elearning" />
    <div className="-mt-20 h-screen w-full">
      <iframe
        src="https://skilla.africa/"
        title="eLearning Portal - Skilla"
        className="w-full h-full border-0"
        allow="fullscreen; clipboard-write; encrypted-media"
      />
    </div>
  </Layout>
);

export default ELearning;
