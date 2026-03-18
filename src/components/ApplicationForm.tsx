import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

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
type CustomQuestion = {
  id: string;
  question_text: string;
  question_type: "text" | "textarea";
  is_required: boolean;
  sort_order: number;
};

const ApplicationForm = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
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

    supabase
      .from("custom_questions")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCustomQuestions(data as CustomQuestion[]);
      });
  }, []);

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.gender || !form.email || !form.phone_number || !form.program_applying_for) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
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

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <Send className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground">Thank you for applying. We'll review your application and contact you soon.</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className={labelClass}>Full Name *</label>
        <input className={inputClass} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} required />
      </div>

      {/* Gender & DOB */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Gender *</label>
          <select className={inputClass} value={form.gender} onChange={(e) => set("gender", e.target.value)} required>
            <option value="">Select gender</option>
            {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input type="date" className={inputClass} value={form.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} />
        </div>
      </div>

      {/* Nationality & Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nationality *</label>
          <input className={inputClass} value={form.nationality} onChange={(e) => set("nationality", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input type="tel" className={inputClass} value={form.phone_number} onChange={(e) => set("phone_number", e.target.value)} required />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address *</label>
        <input type="email" className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} required />
      </div>

      {/* Address & District */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Home Address</label>
          <input className={inputClass} value={form.home_address} onChange={(e) => set("home_address", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>District</label>
          <input className={inputClass} value={form.district} onChange={(e) => set("district", e.target.value)} />
        </div>
      </div>

      {/* Location Type */}
      <div>
        <label className={labelClass}>Location Type</label>
        <select className={inputClass} value={form.location_type} onChange={(e) => set("location_type", e.target.value)}>
          <option value="">Select location type</option>
          {locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Education */}
      <div>
        <label className={labelClass}>Highest Level of Education</label>
        <select className={inputClass} value={form.highest_education} onChange={(e) => set("highest_education", e.target.value)}>
          <option value="">Select education level</option>
          {educationOptions.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      {/* Program */}
      <div>
        <label className={labelClass}>Program Applying For *</label>
        <select className={inputClass} value={form.program_applying_for} onChange={(e) => set("program_applying_for", e.target.value)} required>
          <option value="">Select a program</option>
          {programs.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
        </select>
      </div>

      {/* Employment & Income */}
      <div className="grid sm:grid-cols-2 gap-4">
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
      </div>

      {/* Disability */}
      <div>
        <label className={labelClass}>Do you have a disability?</label>
        <select className={inputClass} value={form.has_disability ? "Yes" : "No"} onChange={(e) => set("has_disability", e.target.value === "Yes")}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-lg flex items-center justify-center gap-2 !py-4 disabled:opacity-50"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
