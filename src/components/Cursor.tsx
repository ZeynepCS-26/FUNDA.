import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';

export const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const darkMode = useStore((state) => state.darkMode);
  const [isOverProject, setIsOverProject] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(true);

  useEffect(() => {
    // Check if the device has a fine pointer (like a mouse). Touch screens typically have 'coarse'.
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: any) => {
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') setIsHovered(true);
        if(e.target.closest('section')?.className.includes('bg-charcoal')) setIsOverProject(true);
    };
    const handleMouseOut = (e: any) => {
        setIsHovered(false);
        if(e.target.closest('section')?.className.includes('bg-charcoal')) setIsOverProject(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] flex items-center justify-center ${isOverProject ? 'bg-alabaster' : darkMode ? 'bg-alabaster' : 'bg-charcoal'}`}
      animate={{
        x: mousePos.x - 6,
        y: mousePos.y - 6,
        scale: isHovered ? 2 : 1,
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
    />
  );
};
