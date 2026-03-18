import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/programs", label: "Programs" },
  { path: "/services", label: "Services" },
  { path: "/admissions", label: "Admissions" },
  
  { path: "/news", label: "News" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-lg py-2" : "bg-white shadow-md py-0"
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/lgo.png"
              alt="Global Nexus Institute Logo"
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-tight hidden sm:block">
              <span className="block text-sm md:text-base font-bold text-gray-900">
                Global Nexus Institute
              </span>
              <span className="block text-xs text-gray-500 tracking-wider uppercase">
                Innovation & Excellence
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://skilla.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 btn-primary text-sm !px-5 !py-2"
            >
              eLearning Portal
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 lg:hidden border-t border-gray-100 pt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://skilla.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary text-sm text-center"
              >
                eLearning Portal
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
