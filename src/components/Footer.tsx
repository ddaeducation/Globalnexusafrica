import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="hero-gradient text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-7 w-7" />
            <span className="font-display font-bold text-lg">Global Nexus Institute</span>
          </div>
          <p className="text-sm opacity-80">
            Empowering the next generation of tech leaders with world-class education and hands-on experience.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/programs" className="hover:opacity-100 transition">Programs</Link></li>
            <li><Link to="/admissions" className="hover:opacity-100 transition">Admissions</Link></li>
            <li><Link to="/research" className="hover:opacity-100 transition">Projects</Link></li>
            <li><Link to="/news" className="hover:opacity-100 transition">News & Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              Kigali, Rwanda — KN 78 St, Norrsken House
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              info@globalnexus.africa
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              +250 787 406 140
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Partners</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>NCC Education (UK)</li>
            <li>Institute of Analytics</li>
            <li>Rwanda Management Institute</li>
            <li>Solvit Africa</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Global Nexus Institute. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
