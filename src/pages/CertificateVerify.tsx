import PageSEO from "@/components/PageSEO";
import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck, Search, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface CertificateRecord {
  certificate_id: string;
  student_name: string;
  program_title: string;
  issue_date: string;
}

const CertificateVerify = () => {
  const [searchParams] = useSearchParams();
  const certId = searchParams.get("id") || "";
  const [inputId, setInputId] = useState(certId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateRecord | null>(null);
  const [status, setStatus] = useState<"idle" | "found" | "not_found">("idle");

  const doVerify = async (id: string) => {
    if (!id.trim()) return;
    setInputId(id);
    setLoading(true);
    setStatus("idle");

    const { data, error } = await supabase
      .from("certificates")
      .select("certificate_id, student_name, program_title, issue_date")
      .eq("certificate_id", id.trim())
      .maybeSingle();

    setLoading(false);

    if (error || !data) {
      setStatus("not_found");
      setResult(null);
    } else {
      setStatus("found");
      setResult(data);
    }
  };

  // Auto-verify when QR code provides an id via query param
  useEffect(() => {
    if (certId) {
      doVerify(certId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certId]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    doVerify(inputId);

    setLoading(true);
    setStatus("idle");

    const { data, error } = await supabase
      .from("certificates")
      .select("certificate_id, student_name, program_title, issue_date")
      .eq("certificate_id", inputId.trim())
      .maybeSingle();

    setLoading(false);

    if (error || !data) {
      setStatus("not_found");
      setResult(null);
    } else {
      setStatus("found");
      setResult(data);
    }
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
            <Button type="submit" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Checking…" : "Verify"}
            </Button>
          </form>

          {status === "found" && result && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 text-left space-y-2">
              <h2 className="text-lg font-semibold text-primary mb-3">
                ✅ Certificate is Valid
              </h2>
              <p><span className="font-medium">Certificate ID:</span> {result.certificate_id}</p>
              <p><span className="font-medium">Student Name:</span> {result.student_name}</p>
              <p><span className="font-medium">Program:</span> {result.program_title}</p>
              <p><span className="font-medium">Issue Date:</span> {new Date(result.issue_date).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground pt-2">
                This certificate was issued by Global Nexus Institute. For
                further details, contact{" "}
                <a href="mailto:info@globalnexus.africa" className="text-primary underline">
                  info@globalnexus.africa
                </a>.
              </p>
            </div>
          )}

          {status === "not_found" && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <h2 className="text-lg font-semibold text-destructive">
                  Certificate Not Found
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                No certificate matches this ID. Please double-check the ID and try again, or contact{" "}
                <a href="mailto:info@globalnexus.africa" className="text-primary underline">
                  info@globalnexus.africa
                </a>{" "}
                for assistance.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CertificateVerify;
