import {create} from 'zustand';

interface Store {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useProfileLoading = create<Store>(set => ({
  loading: false,
  setLoading: loading => set({loading}),
}));

export default useProfileLoading;
