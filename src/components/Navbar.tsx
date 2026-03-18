import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/programs", label: "Programs" },
  { path: "/services", label: "Services" },
  { path: "/admissions", label: "Admissions" },
  { path: "/research", label: "Research" },
  { path: "/news", label: "News" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/lgo.png"
              alt="Global Nexus Institute Logo"
              className="h-14 md:h-16 w-auto"
            />
            <span className="leading-tight">
              <span className="block text-sm md:text-lg font-semibold text-gray-900">
                Global Nexus Institute
              </span>
              <span className="block text-center text-xs text-gray-600 tracking-wide">
                Innovation & Excellence
              </span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-primary transition-colors ${
                  location.pathname === link.path ? "text-primary font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://skilla.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              eLearning Portal
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`hover:text-primary transition-colors ${
                    location.pathname === link.path ? "text-primary font-medium" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
