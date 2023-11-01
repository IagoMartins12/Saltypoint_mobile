import {create} from 'zustand';
import {AuthStore} from '../../types/ComponentTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = create<AuthStore>(set => ({
  isLogged: false,
  setIsLogged: () => set({isLogged: true}),
  setLogout: () => set({isLogged: false}),
  token: null,
  setToken: (token: string | null) => set({token: token}),
}));

export const checkAndSetToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem('secret');

    if (storedToken) {
      useAuth.getState().setToken(storedToken);
      useAuth.getState().setIsLogged();
    }
  } catch (error) {
    // Lidar com possíveis erros, por exemplo:
    console.error('Erro ao verificar e definir o token:', error);
  }
};

export const removeToken = () => {
  try {
    AsyncStorage.removeItem('secret');
    useAuth.getState().setToken(null);
    useAuth.getState().setLogout();
  } catch (error) {
    // Lidar com possíveis erros, por exemplo:
    console.error('Erro ao remover o token:', error);
  }
};

export default useAuth;
