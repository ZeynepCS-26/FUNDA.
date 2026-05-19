import {create} from 'zustand';

interface AppState {
  soundEnabled: boolean;
  darkMode: boolean;
  toggleSound: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  soundEnabled: false,
  darkMode: false,
  toggleSound: () => set((state) => ({soundEnabled: !state.soundEnabled})),
  toggleDarkMode: () => set((state) => ({darkMode: !state.darkMode})),
}));
