import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';

export const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const darkMode = useStore((state) => state.darkMode);
  const [isOverProject, setIsOverProject] = useState(false);

  useEffect(() => {
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
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

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
