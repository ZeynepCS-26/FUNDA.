import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isAuthorizedAdmin } from "../lib/firebase";
import { useStore } from "../store/useStore";
import { Menu, X, Moon, Sun, ShieldCheck } from "lucide-react";

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!(user && isAuthorizedAdmin(user.email)));
    });
    return () => unsubscribe();
  }, []);

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
      <div className="font-bold text-xl tracking-tighter relative z-10">FUNDA.</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-sm font-medium relative z-10">
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
      <div className="hidden md:flex items-center gap-6 text-xs font-mono relative z-10">
        {isAdmin && (
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-clay text-white hover:bg-clay/90 transition-all font-mono text-xs font-semibold shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMIN</span>
          </Link>
        )}
        {availableForHire}
        {darkModeToggle}
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden relative z-10 p-2 -mr-2 text-charcoal dark:text-alabaster"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-full left-0 w-full bg-alabaster dark:bg-charcoal border-b border-charcoal/10 dark:border-alabaster/10 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-96 py-8' : 'max-h-0 py-0 border-transparent'}`}
      >
        <div className="flex flex-col items-center gap-6 text-lg font-medium">
          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay text-white text-sm font-mono font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ADMIN PANEL</span>
            </Link>
          )}
          {['WORK', 'ABOUT', 'PROCESS', 'CONTACT'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`transition-colors ${activeSection === item.toLowerCase() ? 'text-clay/50' : 'hover:text-clay'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-sm font-mono opacity-80">
          {availableForHire}
          {darkModeToggle}
        </div>
      </div>
    </nav>
  );
};
