import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import {global} from '../../style';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {useForm} from 'react-hook-form';
import StyledInputComponent from '../../components/Input';
import ComeBack from '../../components/ComeBack';
import ForgetPasswordModal from '../../components/Modals/ForgetPasswordModal';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import useTheme from '../../hooks/useTheme';
import MyText from '../../components/Text';
import usePrivateStore from '../../hooks/store/usePrivateStore';
import {UpdateUserDto} from '../../types/Dtos';
import {updatedMe} from '../../services';
import CallToast from '../../components/Toast';
import {User, User_Adress} from '../../types/ModelsType';
import PhoneInput from '../../components/PhoneInput';
import SelectComponent from '../../components/Select';

const ProfileScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [onChangeDropdown, setOnChangeDropdown] = useState<null | string>(null);
  const {control, handleSubmit, setValue} = useForm();
  const {currentTheme} = useTheme();
  const {user, setUser, address} = usePrivateStore();
  const {showToast} = CallToast();

  const setUserWithCallback = (callback: (user: User) => User) => {
    if (!user) return;

    const updatedUser = callback(user);

    setUser(updatedUser);
  };

  const onSubmit = async (data: any) => {
    if (!user) return;
    if (data.phone.length !== 15 && data.phone)
      return showToast('Insira um numero valido', 'error');

    const object = {
      name: data.name,
      phone: data.phone !== '' ? data.phone : null,
      user_Adress_id: onChangeDropdown !== '' ? onChangeDropdown : null,
    } as UpdateUserDto;

    try {
      await updatedMe(object);

      setUserWithCallback(oldUser => ({
        ...oldUser,
        phone: data.phone !== '' ? data.phone : null,
        user_Adress_id: onChangeDropdown !== '' ? onChangeDropdown : null,
        name: data.name,
      }));

      showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
      // Handle errors here
      console.error(error);
      showToast('Erro ao atualizar o perfil.', 'error');
    }
  };

  const addressArr = address
    .filter((c: User_Adress) => c.isActive === 0)
    .map((address, i) => {
      return {
        label: `${address.address}, ${address.number} / ${address.district}`,
        value: address.id,
      };
    });

  const translateY = useSharedValue(Dimensions.get('window').height);

  const onSwipeLeft = () => {
    // Navegar para a página desejada
    navigation.navigate('Settings');
  };

  const showModal = () => {
    translateY.value = withTiming(0, {duration: 500});
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('phone', user?.phone);
    setOnChangeDropdown(user.user_Adress_id);
  }, [user]);

  if (user) {
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
          <ScrollView
            contentContainerStyle={{}}
            style={[
              styles.mainContainer,
              {
                backgroundColor:
                  currentTheme === 'light'
                    ? COLORS.backgroundColorLight
                    : COLORS.backgroundColorDark,
              },
            ]}>
            <View style={[global.shadow, styles.profileContainer]}>
              <ComeBack navigation={navigation} />
              <View style={styles.photoContainer}>
                <View style={styles.profilePhotoDiv}>
                  <Image
                    style={styles.CartItemImage}
                    source={
                      user.image
                        ? user.image
                        : require('../../assets/profile.png')
                    }
                  />
                </View>
                <MyText
                  style={{
                    fontSize: FONTSIZE.size_18,
                    fontWeight: '500',
                    marginTop: 10,
                  }}>
                  {user.name}
                </MyText>
              </View>
            </View>

            <View style={styles.listContainer}>
              <View style={{gap: 12}}>
                <StyledInputComponent
                  control={control}
                  name="name"
                  icon="account-circle-outline"
                  placeholder="Nome: "
                />
                <StyledInputComponent
                  control={control}
                  name="email"
                  placeholder="Email: "
                  icon="email-outline"
                  disabled
                />
                <PhoneInput
                  control={control}
                  name="phone"
                  placeholder="Telefone: "
                />
                <SelectComponent
                  setOnChangeDropdown={setOnChangeDropdown}
                  value={onChangeDropdown}
                  arr={addressArr}
                />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={global.buttonStyle}>
                  <Text style={{color: '#FFFFFF'}}>Editar</Text>
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    showModal();
                    setModalOpen(true);
                  }}
                  style={{
                    color: COLORS.primaryRedHex,
                    textDecorationLine: 'underline',
                  }}>
                  Alterar senha
                </Text>
              </View>
            </View>
            <ForgetPasswordModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              hideModal={hideModal}
              translateY={translateY}
            />
          </ScrollView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },

  profileContainer: {
    height: Dimensions.get('screen').height * 0.3,
    paddingVertical: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoContainer: {
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  profilePhotoDiv: {
    height: 150,
    width: 150,
  },

  CartItemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    gap: 20,
  },
});

export default ProfileScreen;
