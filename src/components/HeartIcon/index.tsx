import {Pressable, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import {Favorite} from '../../types/ModelsType';
import {addFavorites, deleteFavorite} from '../../services';
import {DeleteFavoritesDto, FavoritesDto} from '../../types/Dtos';
import useShowToast from '../../hooks/customHooks/useShowToast';
import {useState} from 'react';
import LoadingIndicator from '../Loading';

const HeartIcon = ({
  productId,
  isProductPage,
}: {
  productId: string;
  isProductPage?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const {favorites, setFavorites, user} = usePrivateStore();

  const {showToast} = useShowToast();
  const checkFavorite = favorites?.find(
    (f: Favorite) => f.product_id === productId,
  );

  const handleFavorite = async () => {
    if (!user)
      return showToast('Faça o login para favoritar o produto', 'error');
    const isFavorite = checkFavorite;
    setLoading(true);
    try {
      if (isFavorite) {
        const findFavorite = favorites.find(
          (f: Favorite) => f.product_id === productId,
        );

        if (!findFavorite) return;

        await deleteFavorite({
          id: findFavorite.id,
        } as DeleteFavoritesDto);
        const updatedFavorites = favorites.filter(
          (f: Favorite) => f.product_id !== productId,
        );
        setFavorites(updatedFavorites);
        showToast('Produto removido', 'success');
      } else {
        const response = await addFavorites({
          product_id: productId,
        } as FavoritesDto);
        const updatedFavorites = [...favorites, response];
        setFavorites(updatedFavorites);
        showToast('Produto adicionado', 'success');
      }
    } catch (error) {
      showToast('Erro', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handleFavorite}
      disabled={loading}
      style={{
        position: 'absolute',
        top: isProductPage ? 25 : 10,
        right: isProductPage ? 20 : 10,
      }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <CustomIcon
          name={'heart'}
          color={checkFavorite ? 'red' : 'gray'}
          size={isProductPage ? 30 : 20}
        />
      )}
    </Pressable>
  );
};

export default HeartIcon;
