import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Shield className="h-6 w-6 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-semibold mb-1">We value your privacy</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept," you consent to our use of cookies.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition shadow-sm"
            >
              Accept
            </button>
          </div>
          <button
            onClick={decline}
            className="absolute top-3 right-3 sm:hidden p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
