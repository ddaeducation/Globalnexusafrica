import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background font-sans">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
