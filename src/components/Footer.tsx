import React from 'react';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-12 border-t border-charcoal/10 dark:border-alabaster/10 flex justify-center items-center">
      <button 
        onClick={handleScrollToTop}
        className="text-sm font-medium tracking-wide text-charcoal/60 dark:text-alabaster/60 hover:text-charcoal dark:hover:text-alabaster transition-colors"
      >
        designed by Funda Zeynep Sarkisla
      </button>
    </footer>
  );
};
