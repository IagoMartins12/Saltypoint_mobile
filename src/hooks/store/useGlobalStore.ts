import {create} from 'zustand';
import {Store} from '../../types/ComponentTypes';

const useGlobalStore = create<Store>(set => ({
  categorys: [],
  setCategorys: categorys => set({categorys: categorys}),
  products: [],
  setProducts: products => set({products: products}),
  typePagament: [],
  setTypePagament: typePagament => set({typePagament: typePagament}),
  states: [],
  setStates: states => set({states: states}),
  reward: [],
  setReward: reward => set({reward: reward}),
}));

export default useGlobalStore;
