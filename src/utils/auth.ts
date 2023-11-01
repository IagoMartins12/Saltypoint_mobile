import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserLocalStorage = async () => {
  try {
    const json = await AsyncStorage.getItem('secret');

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);
    return user ?? null;
  } catch (error) {
    // Lidar com possíveis erros, por exemplo:
    console.error('Erro ao obter dados do armazenamento:', error);
    return null;
  }
};

export const removeFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('secret');
  } catch (error) {
    // Lidar com possíveis erros, por exemplo:
    console.error('Erro ao remover dados do armazenamento:', error);
  }
};
