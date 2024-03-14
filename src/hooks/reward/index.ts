import {create} from 'zustand';
import {RewardHookStore} from '../../types/ComponentTypes';

const useCurrrentCode = create<RewardHookStore>(set => ({
  currentCode: null,
  setCurrentCode: currentCode => set({currentCode}),
}));

export default useCurrrentCode;
