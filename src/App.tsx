import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import LanguageProvider from "./i18n/LanguageProvider";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import { initSmoothScroll, lockScroll } from "./lib/scroll";

function Site() {
  const [loading, setLoading] = useState(true);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    lockScroll(loading);
    if (!loading) window.scrollTo({ top: 0 });
  }, [loading]);

  return (
    <>
      <Cursor />
      <Grain />

      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Header />

      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
