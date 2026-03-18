import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const genderOptions = ["Male", "Female", "Other"];
const locationOptions = ["Urban", "Rural"];
const educationOptions = [
  "Primary School",
  "Secondary School / O-Level",
  "High School / A-Level",
  "Diploma / Certificate",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Other",
];
const employmentOptions = ["Student", "Employed", "Unemployed"];
const incomeOptions = [
  "Below 50,000 RWF",
  "50,000 – 150,000 RWF",
  "150,000 – 300,000 RWF",
  "300,000 – 500,000 RWF",
  "Above 500,000 RWF",
  "Prefer not to say",
];

type Program = { id: string; title: string };

const TOTAL_STEPS = 4;

const Apply = () => {
  const [step, setStep] = useState(1);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    nationality: "",
    phone_number: "",
    email: "",
    home_address: "",
    district: "",
    location_type: "",
    highest_education: "",
    program_applying_for: "",
    employment_status: "",
    monthly_income_range: "",
    has_disability: false,
  });

  useEffect(() => {
    supabase
      .from("programs")
      .select("id, title")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setPrograms(data);
      });
  }, []);

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!form.full_name || !form.gender) {
        toast({ title: "Missing fields", description: "Please fill in Full Name and Gender.", variant: "destructive" });
        return false;
      }
    }
    if (s === 2) {
      if (!form.phone_number || !form.email) {
        toast({ title: "Missing fields", description: "Please fill in Phone Number and Email.", variant: "destructive" });
        return false;
      }
    }
    if (s === 3) {
      if (!form.program_applying_for) {
        toast({ title: "Missing fields", description: "Please select a program.", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setSubmitting(true);
    const { error } = await supabase.from("applications").insert({
      ...form,
      date_of_birth: form.date_of_birth || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit application. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Application Submitted!", description: "We will review your application and get back to you." });
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  const stepLabels = ["Personal Info", "Contact Details", "Education & Program", "Employment & More"];

  return (
    <Layout>
      <section className="hero-section py-16 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 animate-fade-up">Application Form</h1>
          <p className="text-lg opacity-90 animate-fade-up-delay-1">Apply to Global Nexus Institute</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6">Thank you for applying. We'll review your application and contact you soon.</p>
              <a href="/admissions" className="btn-primary inline-flex items-center gap-2 !px-8 !py-3">
                Back to Admissions
              </a>
            </div>
          ) : (
            <div className="card-hover p-6 md:p-8">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  {stepLabels.map((label, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          i + 1 <= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1 < step ? "✓" : i + 1}
                      </div>
                      <span className="text-[10px] md:text-xs text-muted-foreground mt-1 text-center hidden sm:block">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-up">
                  <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input className={inputClass} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className={labelClass}>Gender *</label>
                    <select className={inputClass} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                      <option value="">Select gender</option>
                      {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="date" className={inputClass} value={form.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Nationality</label>
                    <input className={inputClass} value={form.nationality} onChange={(e) => set("nationality", e.target.value)} placeholder="e.g. Rwandan" />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-up">
                  <h3 className="text-lg font-bold text-foreground">Contact Details</h3>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" className={inputClass} value={form.phone_number} onChange={(e) => set("phone_number", e.target.value)} placeholder="+250 7XX XXX XXX" />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Home Address</label>
                    <input className={inputClass} value={form.home_address} onChange={(e) => set("home_address", e.target.value)} placeholder="Street, neighborhood" />
                  </div>
                  <div>
                    <label className={labelClass}>District</label>
                    <input className={inputClass} value={form.district} onChange={(e) => set("district", e.target.value)} placeholder="e.g. Gasabo" />
                  </div>
                </div>
              )}

              {/* Step 3: Education & Program */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-up">
                  <h3 className="text-lg font-bold text-foreground">Education & Program</h3>
                  <div>
                    <label className={labelClass}>Location Type</label>
                    <select className={inputClass} value={form.location_type} onChange={(e) => set("location_type", e.target.value)}>
                      <option value="">Select location type</option>
                      {locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Highest Level of Education</label>
                    <select className={inputClass} value={form.highest_education} onChange={(e) => set("highest_education", e.target.value)}>
                      <option value="">Select education level</option>
                      {educationOptions.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Program Applying For *</label>
                    <select className={inputClass} value={form.program_applying_for} onChange={(e) => set("program_applying_for", e.target.value)}>
                      <option value="">Select a program</option>
                      {programs.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Do you have a disability?</label>
                    <select className={inputClass} value={form.has_disability ? "Yes" : "No"} onChange={(e) => set("has_disability", e.target.value === "Yes")}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Employment & More */}
              {step === 4 && (
                <div className="space-y-5 animate-fade-up">
                  <h3 className="text-lg font-bold text-foreground">Employment & Additional Info</h3>
                  <div>
                    <label className={labelClass}>Employment Status</label>
                    <select className={inputClass} value={form.employment_status} onChange={(e) => set("employment_status", e.target.value)}>
                      <option value="">Select status</option>
                      {employmentOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Income Range</label>
                    <select className={inputClass} value={form.monthly_income_range} onChange={(e) => set("monthly_income_range", e.target.value)}>
                      <option value="">Select range</option>
                      {incomeOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/50 rounded-xl p-4 mt-2">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Review Summary</h4>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
                      <span className="text-muted-foreground">Name:</span><span className="text-foreground font-medium">{form.full_name || "—"}</span>
                      <span className="text-muted-foreground">Email:</span><span className="text-foreground font-medium">{form.email || "—"}</span>
                      <span className="text-muted-foreground">Phone:</span><span className="text-foreground font-medium">{form.phone_number || "—"}</span>
                      <span className="text-muted-foreground">Program:</span><span className="text-foreground font-medium">{form.program_applying_for || "—"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-input text-foreground hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {step < TOTAL_STEPS ? (
                  <button onClick={next} className="btn-primary flex items-center gap-2 text-sm !px-6 !py-2.5">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary flex items-center gap-2 text-sm !px-6 !py-2.5 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
