import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export const Background = () => {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className="fixed top-0 left-0 -z-10 w-full h-full bg-alabaster dark:bg-charcoal transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};
