import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useClickSound = (soundUrl: string = 'https://assets.mixkit.co/active_storage/sfx/3124/3124-preview.mp3') => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundEnabled = useStore(state => state.soundEnabled);

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(soundUrl);
    audioRef.current.volume = 0.5; // adjust volume as needed
  }, [soundUrl]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!soundEnabled) return;
      
      // Find closest clickable element (button or link)
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('button, a');

      if (clickableElement) {
        // Play the sound
        if (audioRef.current) {
          // Reset time to allow rapid clicking
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((err) => {
            console.error("Audio playback failed", err);
          });
        }
      }
    };

    // Listen to document clicks
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [soundEnabled]);
};
