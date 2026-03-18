import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-20 bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* About */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/lgo.png"
              alt="Global Nexus Institute"
              className="h-12 w-auto rounded-lg bg-white p-1"
            />
            <h2 className="text-sm font-medium">
              Global Nexus Institute
              <span className="block text-center">of Technology</span>
            </h2>
          </div>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Earn global certifications</p>
            <p>Master key tech skills</p>
            <p>Connect with tech leaders</p>
            <p>Soft skills & job readiness</p>
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Quick Access</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/Refund-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Refund Policy</a></li>
            <li><a href="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/Terms-and-Conditions.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms and Conditions</a></li>
            <li><Link to="/research" className="hover:text-white transition-colors">Research</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Kigali, Rwanda</li>
            <li>Norrsken House</li>
            <li>info@globalnexus.africa</li>
            <li>+250 787 406 140</li>
            <li>+254 707 825 181</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Stay Updated</h4>
          <p className="mb-4 text-gray-400 text-sm">
            Subscribe to receive updates and opportunities.
          </p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-8 text-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <a
            href="https://certification.dbi.rw/public?name=Global Nexus Institute Ltd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://raw.githubusercontent.com/ddaeducation/globalnexus.africa/main/public/images/seal.png"
              alt="Global Nexus Institute Certification"
              className="h-30 sm:h-36 md:h-42 w-auto"
            />
          </a>
          <p className="text-sm">
            © {new Date().getFullYear()} Global Nexus Institute. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
