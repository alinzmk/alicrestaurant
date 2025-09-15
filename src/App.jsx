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
          //maps belki maps yorumları?
        */}
        
        <ParallaxHero />
        <Gallery />
        <GoogleMap embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.42001834358257!2d40.405225064184684!3d40.56985365785313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40658d00ea0a5687%3A0xc299ab6c8031856e!2zQWzEscOnIFJlc3RhdXJhbnQ!5e0!3m2!1sen!2str!4v1756387387560!5m2!1sen!2str" height={520} />
        <Contact />
      </main>
    </>
  );
}
