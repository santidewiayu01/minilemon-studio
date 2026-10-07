import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import KegiatanStudio from "./pages/KegiatanStudio";
import Company from "./pages/Company";
import { FooterDividerProvider } from "./context/FooterDividerContext";
import LenisProvider from "./scroll/LenisProvider";
import ScrollToTop from "./scroll/ScrollToTop";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="font-body">
      <LenisProvider />
      <ScrollToTop />
      <FooterDividerProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kegiatan-studio" element={<KegiatanStudio />} />
            <Route path="/tentang" element={<Company />} />
          </Routes>
        </main>
        <Footer />
      </FooterDividerProvider>
    </div>
  );
}

export default App;
