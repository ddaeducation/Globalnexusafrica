import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, email, name, redirect_url, payment_type, program_title } = await req.json();

    // Validate input
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return new Response(
        JSON.stringify({ error: "A valid positive amount is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validCurrencies = ["USD", "RWF", "KES", "NGN", "GHS", "TZS", "UGX", "ZAR", "EUR", "GBP"];
    const cur = (currency || "USD").toUpperCase();
    if (!validCurrencies.includes(cur)) {
      return new Response(
        JSON.stringify({ error: `Unsupported currency: ${cur}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
    if (!FLUTTERWAVE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Payment service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isCoursePay = payment_type === "course";
    const txRef = `${isCoursePay ? "course" : "donation"}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      tx_ref: txRef,
      amount: parsedAmount,
      currency: cur,
      redirect_url: redirect_url || "https://globalnexusafrica.lovable.app/programs",
      customer: {
        email: email || "student@globalnexus.africa",
        name: name || "Student",
      },
      customizations: {
        title: isCoursePay
          ? `Global Nexus Institute — ${program_title || "Course Payment"}`
          : "Global Nexus Institute — Donation",
        description: isCoursePay
          ? `Payment of ${cur} ${amount} for ${program_title || "course"}`
          : `Donation of ${cur} ${amount} to Global Nexus Institute`,
        logo: "https://www.globalnexus.africa/images/logo.png",
      },
    };

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status === "success" && data.data?.link) {
      return new Response(
        JSON.stringify({ payment_link: data.data.link }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.error("Flutterwave error:", JSON.stringify(data));
    return new Response(
      JSON.stringify({ error: data.message || "Failed to create payment link" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Payment creation error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
