import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { PORTFOLIO_CONTENT } from "../data/content";
import { useStore } from "../store/useStore";
import Balatro from "./Balatro";

export const Hero = () => {
  const { soundEnabled, toggleSound, darkMode } = useStore();
  const [resumeUrl, setResumeUrl] = useState("https://drive.google.com/file/d/1218xc2x2GOhihEKooGNznU3u8UsKerQy/view?usp=sharing");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'global'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().resumeUrl) {
        setResumeUrl(docSnap.data().resumeUrl);
      }
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <Balatro
          isRotate={false}
          mouseInteraction={false}
          pixelFilter={darkMode ? 2000 : 1000}
          color1={darkMode ? "#000000" : "#e4cecd"}
          color2={darkMode ? "#3c2c2b" : "#87a7bd"}
          color3={darkMode ? "#20232c" : "#f1f4e4"}
        />
      </div>
      <div className="max-w-4xl z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-4 md:mb-6 leading-[1.1]">
          {PORTFOLIO_CONTENT.hero.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-charcoal/80 dark:text-alabaster/80 mb-6 md:mb-8 max-w-2xl leading-relaxed">
          {PORTFOLIO_CONTENT.hero.manifesto}
        </p>
        <div className="flex gap-4">
          <a href="#work" className="bg-clay text-white px-6 py-3 rounded-sm text-sm hover:opacity-90">View Work ↓</a>
          <a href={resumeUrl} target="_blank" rel="noreferrer" className="border border-charcoal/20 dark:border-alabaster/20 dark:text-alabaster px-6 py-3 rounded-sm text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Resume.pdf ↑</a>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-6 md:right-12 z-10">
        <button 
          onClick={toggleSound}
          className="text-xs font-mono border border-charcoal/20 dark:border-alabaster/20 text-charcoal dark:text-alabaster bg-alabaster/50 dark:bg-charcoal/50 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-charcoal/10 dark:hover:bg-alabaster/10 transition-colors"
        >
          SOUND: {soundEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
    </section>
  );
};
