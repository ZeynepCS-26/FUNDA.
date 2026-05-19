import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'process', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex justify-between items-center py-6 px-6 md:px-12 fixed w-full top-0 z-50 backdrop-blur-sm bg-alabaster/80 dark:bg-charcoal/80 transition-colors duration-300">
      <div className="font-bold text-xl tracking-tighter">FUNDA.</div>
      <div className="hidden md:flex gap-8 text-sm font-medium">
        {['WORK', 'ABOUT', 'PROCESS', 'CONTACT'].map(item => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className={`transition-colors ${activeSection === item.toLowerCase() ? 'text-clay/50' : 'hover:text-clay'}`}
          >
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
          <span>Available for hire</span>
        </div>
        <button onClick={toggleDarkMode}>{darkMode ? '☀' : '☾'}</button>
      </div>
    </nav>
  );
};
