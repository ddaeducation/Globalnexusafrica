import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Clock, ExternalLink, Loader2, GraduationCap, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

type Program = {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  focus: string;
  tools: string;
  price: string;
  lms_url: string;
  pay_url: string;
  accent: string;
  sort_order: number;
};

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: hero } = useSiteContent("programs", "hero", {
    title: "Professional Programs",
    subtitle: "Comprehensive programs designed to prepare you for success in the data-driven world.",
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await supabase
        .from("programs")
        .select("*")
        .order("sort_order", { ascending: true });
      if (data) setPrograms(data);
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  return (
    <Layout>
      <PageSEO title={hero.title} description={hero.subtitle} path="/programs" />
      <section className="hero-section py-20 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-up">{hero.title}</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90 animate-fade-up-delay-1">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <ScrollReveal>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((p) => (
                <div key={p.id} className="card-hover overflow-hidden group">
                  <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                  <div className="p-7">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {p.level}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{p.description}</p>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4 text-primary shrink-0" /> {p.duration}
                    </div>
                    {/* Learning Outcomes */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Learning Outcomes</h4>
                      <ul className="space-y-1.5">
                        {(p.focus || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 5).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                      <div className="flex items-center justify-between pt-5 border-t border-border">
                      <span className="text-3xl font-extrabold text-foreground">{p.price}</span>
                      <div className="flex gap-2">
                        <Link to="/apply" className="bg-muted text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" /> Apply
                        </Link>
                        <Link to={`/elearning?course=${encodeURIComponent(p.lms_url)}`} className="btn-primary !px-4 !py-2 text-sm flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" /> Go to Course
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </ScrollReveal>
    </Layout>
  );
};

export default Programs;
