import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Eye, EyeOff, GraduationCap, User, AtSign } from "lucide-react";

const StudentLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let email = identifier;
      if (!identifier.includes("@")) {
        const { data, error: rpcError } = await supabase.rpc("get_email_by_username", { _username: identifier });
        if (rpcError || !data) throw new Error("Username not found.");
        email = data;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      navigate("/elearning");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginShell
      icon={<GraduationCap className="h-7 w-7" />}
      title="Student Sign In"
      subtitle="Sign in to access courses and your learning dashboard"
      accentHue="200"
      footer={
        <p className="text-center text-sm" style={{ color: "hsl(220 10% 50%)" }}>
          Don't have an account?{" "}
          <Link to="/elearning" className="font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-5">
        {error && <ErrorBanner message={error} />}

        <InputField
          label="Email or Username"
          icon={<AtSign className="h-4 w-4" />}
          type="text"
          value={identifier}
          onChange={setIdentifier}
          placeholder="your@email.com or username"
        />

        <PasswordField
          value={password}
          onChange={setPassword}
          show={showPassword}
          toggle={() => setShowPassword(!showPassword)}
          forgotLink="/elearning"
        />

        <SubmitButton loading={loading} label="Sign In" />
      </form>
    </LoginShell>
  );
};

const InstructorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      navigate("/elearning");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginShell
      icon={<User className="h-7 w-7" />}
      title="Instructor Sign In"
      subtitle="Access your teaching dashboard and course management"
      accentHue="160"
      footer={
        <p className="text-center text-sm" style={{ color: "hsl(220 10% 50%)" }}>
          Need an instructor account?{" "}
          <Link to="/contact" className="font-semibold hover:underline" style={{ color: "hsl(var(--primary))" }}>
            Contact us
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-5">
        {error && <ErrorBanner message={error} />}

        <InputField
          label="Email"
          icon={<AtSign className="h-4 w-4" />}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="instructor@globalnexus.africa"
        />

        <PasswordField
          value={password}
          onChange={setPassword}
          show={showPassword}
          toggle={() => setShowPassword(!showPassword)}
          forgotLink="/elearning"
        />

        <SubmitButton loading={loading} label="Sign In" />
      </form>
    </LoginShell>
  );
};

export { StudentLogin, InstructorLogin };

/* ─── Shared components ─── */

function LoginShell({
  icon,
  title,
  subtitle,
  accentHue,
  footer,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentHue: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, hsl(220 20% 10%) 0%, hsl(220 25% 14%) 50%, hsl(220 20% 10%) 100%)",
      }}
    >
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: `hsl(${accentHue} 70% 50%)` }}
      />

      <div className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl border p-8 sm:p-10 shadow-2xl"
          style={{ background: "hsl(220 20% 13%)", borderColor: "hsl(220 15% 20%)" }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: `hsl(${accentHue} 70% 50% / 0.12)`,
              color: `hsl(${accentHue} 70% 60%)`,
            }}
          >
            {icon}
          </div>

          <h1 className="text-3xl font-bold italic mb-1" style={{ color: "hsl(0 0% 95%)" }}>
            {title}
          </h1>
          <p className="text-sm mb-8" style={{ color: "hsl(220 10% 55%)" }}>
            {subtitle}
          </p>

          <div className="relative flex items-center mb-8">
            <div className="flex-1 h-px" style={{ background: "hsl(220 15% 22%)" }} />
            <span className="px-4 text-xs uppercase tracking-widest font-medium" style={{ color: "hsl(220 10% 45%)" }}>
              Continue with email
            </span>
            <div className="flex-1 h-px" style={{ background: "hsl(220 15% 22%)" }} />
          </div>

          {children}

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-2 text-sm p-3 rounded-xl"
      style={{ background: "hsla(0 70% 50% / 0.12)", color: "hsl(0 80% 65%)" }}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}

function InputField({
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon?: React.ReactNode;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: "hsl(0 0% 85%)" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "hsl(220 10% 45%)" }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            paddingLeft: icon ? "2.75rem" : "1rem",
            paddingRight: "1rem",
            background: "hsl(220 20% 16%)",
            border: "1px solid hsl(220 15% 22%)",
            color: "hsl(0 0% 90%)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "hsl(var(--primary))";
            e.target.style.boxShadow = "0 0 0 3px hsla(var(--primary) / 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "hsl(220 15% 22%)";
            e.target.style.boxShadow = "none";
          }}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

function PasswordField({
  value,
  onChange,
  show,
  toggle,
  forgotLink,
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggle: () => void;
  forgotLink: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium" style={{ color: "hsl(0 0% 85%)" }}>
          Password
        </label>
        <Link
          to={forgotLink}
          className="text-xs font-medium transition-colors hover:underline"
          style={{ color: "hsl(var(--primary))" }}
          tabIndex={-1}
        >
          Forgot password?
        </Link>
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: "hsl(220 20% 16%)",
            border: "1px solid hsl(220 15% 22%)",
            color: "hsl(0 0% 90%)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "hsl(var(--primary))";
            e.target.style.boxShadow = "0 0 0 3px hsla(var(--primary) / 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "hsl(220 15% 22%)";
            e.target.style.boxShadow = "none";
          }}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
          style={{ color: "hsl(220 10% 45%)" }}
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: loading
          ? "hsl(var(--primary) / 0.7)"
          : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))",
        color: "hsl(0 0% 100%)",
        boxShadow: loading ? "none" : "0 4px 20px hsla(var(--primary) / 0.35)",
      }}
      onMouseEnter={(e) => {
        if (!loading) (e.target as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Signing in...
        </span>
      ) : (
        label
      )}
    </button>
  );
}
