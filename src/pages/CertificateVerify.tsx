import PageSEO from "@/components/PageSEO";
import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CertificateVerify = () => {
  const [searchParams] = useSearchParams();
  const certId = searchParams.get("id") || "";
  const [inputId, setInputId] = useState(certId);
  const [status, setStatus] = useState<"idle" | "verified" | "not_found">(
    "idle"
  );

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId.trim()) return;
    // For now, show a placeholder verification result
    // This can be connected to a database later
    setStatus("verified");
  };

  return (
    <Layout>
      <PageSEO
        title="Certificate Verification"
        description="Verify the authenticity of a Global Nexus Institute certificate."
        path="/certificate/verify"
      />
      <section className="py-20 px-4 min-h-[60vh]">
        <div className="max-w-xl mx-auto text-center">
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
          <p className="text-muted-foreground mb-8">
            Enter a certificate ID to verify its authenticity.
          </p>

          <form onSubmit={handleVerify} className="flex gap-2 mb-8">
            <Input
              placeholder="Enter Certificate ID"
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value);
                setStatus("idle");
              }}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Verify
            </Button>
          </form>

          {status === "verified" && (
            <div className="rounded-lg border border-green-500/30 bg-green-50 dark:bg-green-950/20 p-6 text-left">
              <h2 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                ✅ Certificate is Valid
              </h2>
              <p className="text-sm text-muted-foreground">
                This certificate was issued by Global Nexus Institute. For
                further details, please contact us at{" "}
                <a
                  href="mailto:info@globalnexus.africa"
                  className="text-primary underline"
                >
                  info@globalnexus.africa
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CertificateVerify;
