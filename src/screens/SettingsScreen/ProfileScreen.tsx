import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import Dropdown from '../../components/Select';
import ComeBack from '../../components/ComeBack';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import ForgetPasswordModal from '../../components/Modals/ForgetPasswordModal';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import useTheme from '../../hooks/useTheme';
import MyText from '../../components/Text';

const ProfileScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {control, handleSubmit} = useForm();
  const onSubmit = (data: any) => console.log(data);
  const translateY = useSharedValue(Dimensions.get('window').height);
  const {currentTheme} = useTheme();
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
                  source={require('../../assets/profile.png')}
                />
              </View>
              <MyText
                style={{
                  fontSize: FONTSIZE.size_18,
                  fontWeight: '500',
                  marginTop: 10,
                }}>
                Iago martins
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
                name="Email"
                placeholder="Email: "
                icon="email-outline"
              />
              <StyledInputComponent
                control={control}
                name="cellphone"
                placeholder="Telefone: "
                icon="email-outline"
              />
              <Dropdown />
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
