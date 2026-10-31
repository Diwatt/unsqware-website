import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { About } from "./About";
import { Music } from "./Music";
import { Videos } from "./Videos";
import { Gigs } from "./Gigs";
import { Socials } from "./Socials";
import { Contact } from "./Contact";

import "./App.scss";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "fr";
  }, [i18n.resolvedLanguage]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <Videos />
        <Gigs />
        <Socials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
