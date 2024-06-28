import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import useProfileLoading from '../../hooks/useProfileLoading';
import LoadingIndicator from '../Loading';

interface Props {
  testee?: string;
}
const UserImage: React.FC<Props> = ({testee}) => {
  const {user} = usePrivateStore();
  const {loading} = useProfileLoading();

  if (loading) {
    return (
      <View
        style={[
          styles.CartItemImage,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <ActivityIndicator size={'large'} color="#FFFFFF" />
      </View>
    );
  }
  return (
    <Image
      style={styles.CartItemImage}
      source={{
        uri: user.image,
      }}
    />
  );
};

const styles = StyleSheet.create({
  CartItemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100000,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
});

export default UserImage;
