import {create} from 'zustand';

interface Store {
  currentTheme: 'light' | 'dark';
  setCurrentTheme: (theme: 'light' | 'dark') => void;
}
const useTheme = create<Store>(set => ({
  currentTheme: 'light',
  setCurrentTheme: currentTheme => set({currentTheme: currentTheme}),
}));

export default useTheme;
