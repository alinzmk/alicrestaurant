import { Accordion, AccordionItem } from "@heroui/react";
import { main } from "framer-motion/client";
import ParallaxHero from "./components/ParallaxHero.jsx";
import Gallery from "./components/Gallery.jsx";
import GoogleMap from "./components/GoogleMap.jsx";
import Navbar from "./components/Navbar.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* 
          //başlık
          //font renk
          //video
          //galeri
          //maps belki maps yorumları?
          //aos effect (framer motion ile yap)
          //footer
        */}
        
        <ParallaxHero />
        <Gallery />
        <GoogleMap embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.097497749308!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c2bae9bfb%3A0x4a0d3b3f1e0!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1712345678901" height={520} />
        <Contact />
      </main>
    </>
  );
}
