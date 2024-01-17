import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {global} from '../../style';
import {FONTSIZE} from '../../theme/theme';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../components/Input';

const ProfileScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);

  const onSwipeLeft = () => {
    // Navegar para a página desejada
    navigation.navigate('Settings');
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX > 50
          ) {
            onSwipeLeft();
          }
        }}>
        <View style={global.mainContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePhotoDiv}>
              <Image
                style={styles.CartItemImage}
                source={require('../../assets/avatar.png')}
              />
            </View>
          </View>

          <View style={styles.listContainar}>
            <StyledInputComponent
              control={control}
              name="name"
              placeholder="Nome: "
            />
            <StyledInputComponent
              control={control}
              name="Email"
              placeholder="Email: "
            />
            <StyledInputComponent
              control={control}
              name="cellphone"
              placeholder="Telefone: "
            />
            <StyledInputComponent
              control={control}
              name="Email"
              placeholder="Email: "
            />
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  },

  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.25,
  },

  profilePhotoDiv: {
    height: 100,
    width: 100,
    borderRadius: 100000,
  },

  CartItemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100000,
    overflow: 'hidden',
  },
  listContainar: {
    flex: 3,
    gap: 12,
  },
});

export default ProfileScreen;
