import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Store {
  isOpen: boolean;
  setIsOpen: (isOpen) => void;
  onOpen: () => void;
  onClose: () => void;
  title: string | null;
  setTitle: (title: string) => void;
  type: 'success' | 'error' | null;
  setType: (type: 'success' | 'error') => void;
}

const useToast = create<Store>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({isOpen}),
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
  title: null,
  setTitle: (title: string) => set({title}),
  type: null,
  setType: (type: 'success' | 'error') => set({type}),
}));

export default useToast;
