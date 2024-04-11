import {create} from 'zustand';

interface Store {
  hasError: boolean | null;
  setHasError: (hasError: boolean) => void;
}

const useError = create<Store>(set => ({
  hasError: null,
  setHasError: hasError => set({hasError}),
}));

export default useError;
