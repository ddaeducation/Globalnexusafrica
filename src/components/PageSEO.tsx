import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
}

const PageSEO = ({ title, description, path = "" }: PageSEOProps) => (
  <Helmet>
    <title>{title} | Global Nexus Institute</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | Global Nexus Institute`} />
    <meta property="og:description" content={description} />
    {path && <link rel="canonical" href={`https://globalnexusafrica.lovable.app${path}`} />}
  </Helmet>
);

export default PageSEO;
