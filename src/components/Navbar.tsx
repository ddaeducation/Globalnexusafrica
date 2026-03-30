import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/programs", label: "Programs" },
  { path: "/services", label: "Services" },
  { path: "/admissions", label: "Admissions" },
  { path: "/news", label: "News" },
  { path: "/contact", label: "Contact" },
];

const moreLinks = [
  { path: "/why-us", label: "Why Us" },
  { path: "/career", label: "Career" },
  { path: "/corporate", label: "Corporate" },
  { path: "/collaborate", label: "Collaborate" },
  { path: "/faqs", label: "FAQs" },
  { path: "/donate", label: "Donate" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMoreOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const isMoreActive = moreLinks.some((l) => location.pathname === l.path);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-2" : "bg-card shadow-md py-0"
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="https://www.globalnexus.africa/images/lgo.png"
                alt="Global Nexus Institute Logo"
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="leading-tight hidden sm:block">
                <span className="block text-sm md:text-base font-bold text-foreground">
                  Global Nexus Institute
                </span>
                <span className="block text-xs text-muted-foreground tracking-wider">
                  —Innovation & Excellence—
                </span>
              </span>
            </Link>
            <Link
              to="/elearning"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/elearning"
                  ? "text-primary bg-primary/5 font-semibold"
                  : "text-muted-foreground hover:text-primary hover:bg-muted"
              }`}
            >
              Portal
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isMoreActive
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-lg py-1 animate-fade-in z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2.5 text-sm font-medium transition-all ${
                        location.pathname === link.path
                          ? "text-primary bg-primary/5 font-semibold"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleDark}
              className="ml-1 p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 lg:hidden border-t border-border pt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">More</div>
              {moreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleDark}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-all flex items-center gap-2"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {dark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
