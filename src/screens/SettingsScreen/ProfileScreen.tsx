import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {global} from '../../style';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../components/Input';
import Dropdown from '../../components/Select';
import CustomIcon from '../../components/CustomIcon';
import ComeBack from '../../components/ComeBack';

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
        <View style={styles.mainContainer}>
          <View style={[styles.profileContainer, global.shadow]}>
            <ComeBack navigation={navigation} />
            <View
              style={{
                alignSelf: 'center',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}>
              <View style={styles.profilePhotoDiv}>
                <Image
                  style={styles.CartItemImage}
                  source={require('../../assets/avatar.png')}
                />
              </View>
              <Text
                style={{
                  fontSize: FONTSIZE.size_18,
                  fontWeight: '500',
                  color: '#000000',
                  marginTop: 10,
                }}>
                Iago martins
              </Text>
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

            <Dropdown />
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center', // Adicionado para centralizar a imagem
  },
  listContainar: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 3,
    gap: 12,
  },
});

export default ProfileScreen;
