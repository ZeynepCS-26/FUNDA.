import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-6 md:px-12 border-t border-charcoal/10 dark:border-alabaster/10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <button 
        onClick={handleScrollToTop}
        className="text-sm font-medium tracking-wide text-charcoal/60 dark:text-alabaster/60 hover:text-charcoal dark:hover:text-alabaster transition-colors cursor-pointer"
      >
        designed by Funda Zeynep Sarkisla
      </button>

      <Link 
        to="/admin" 
        className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal/40 dark:text-alabaster/40 hover:text-clay dark:hover:text-clay transition-colors"
        title="Admin Portal"
      >
        <Lock className="w-3 h-3" />
        <span>Admin Portal</span>
      </Link>
    </footer>
  );
};

