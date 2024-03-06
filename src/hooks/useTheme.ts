import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Store {
  currentTheme: 'light' | 'dark';
  setCurrentTheme: (theme: 'light' | 'dark') => void;
}

const useTheme = create<Store>(set => ({
  currentTheme: 'light',
  setCurrentTheme: async currentTheme => {
    set({currentTheme: currentTheme});
    await AsyncStorage.setItem('theme', currentTheme);
  },
}));

export default useTheme;
