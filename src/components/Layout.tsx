import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background font-sans">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
    <CookieConsent />
  </div>
);

export default Layout;
