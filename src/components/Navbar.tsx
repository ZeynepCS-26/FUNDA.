import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Menu, X, Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const availableForHire = (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
      <span>Available for hire</span>
    </div>
  );

  const darkModeToggle = (
    <button onClick={toggleDarkMode} className="flex items-center gap-2 group">
      {darkMode ? <Sun className="w-5 h-5 group-hover:text-clay transition-colors" /> : <Moon className="w-5 h-5 group-hover:text-clay transition-colors" />}
      <span className="group-hover:text-clay transition-colors">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );

  return (
    <nav className="flex justify-between items-center py-6 px-6 md:px-12 fixed w-full top-0 z-50 backdrop-blur-sm bg-alabaster/80 dark:bg-charcoal/80 transition-colors duration-300">
      <div className="font-bold text-xl tracking-tighter relative z-[60]">FUNDA.</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-sm font-medium relative z-[60]">
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
      
      {/* Desktop Toolbar */}
      <div className="hidden md:flex items-center gap-8 text-xs font-mono relative z-[60]">
        {availableForHire}
        {darkModeToggle}
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden relative z-[60] p-2 -mr-2 text-charcoal dark:text-alabaster"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-alabaster dark:bg-charcoal flex flex-col items-center justify-center gap-8 text-lg font-medium transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-50`}>
        <div className="flex flex-col items-center gap-8 mt-16">
          {['WORK', 'ABOUT', 'PROCESS', 'CONTACT'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`transition-colors text-2xl ${activeSection === item.toLowerCase() ? 'text-clay/50' : 'hover:text-clay'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-sm font-mono opacity-80">
          {availableForHire}
          {darkModeToggle}
        </div>
      </div>
    </nav>
  );
};
