import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {global} from '../style';
import {COLORS, FONTSIZE} from '../theme/theme';
import SettingsOption from '../components/SettingsOption';
import {PackNames} from '../components/CustomIcon';
import ThemeSwitch from '../components/ThemeSwitch';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';

const SettingsScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [animation] = useState(new Animated.Value(5));
  const [isMoving, setIsMoving] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [imageBackground, setImageBackground] = useState(null);

  const {currentTheme} = useTheme();
  const handleNavigate = (name: string) => {
    navigation.push(name);
  };

  const settingsOptions = [
    {
      label: 'Minha conta',
      icon: 'user',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Profile');
      },
    },
    {
      label: 'Meus endereços',
      icon: 'home',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Address');
      },
    },
    {
      label: 'Meus pedidos',
      icon: 'briefcase',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Order');
      },
    },
    {
      label: 'Meus cupons',
      icon: 'tag',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Coupons');
      },
    },
    {
      label: 'Programa de fidelidade',
      icon: 'badge',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Fidelity');
      },
    },
    {
      label: 'Termos de uso e privacidade',
      icon: 'shield',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Term');
      },
    },
    {
      label: 'Sair',
      icon: 'logout',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: () => {
        handleNavigate('Main');
      },
    },
  ];

  const moveView = () => {
    setIsMoving(!isMoving);
    const toValue = isMoving ? 5 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      // Define o background da imagem com base no estado de isMoving
      setImageBackground(isMoving ? COLORS.backgroundColorDark : null); // Defina COLORS.someColor conforme necessário
    });
  };

  return (
    <View
      style={[
        global.mainContainer,
        {
          backgroundColor: COLORS.backgroundColorLight,
        },
      ]}>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor:
              currentTheme === 'dark'
                ? COLORS.backgroundColorDark
                : imageBackground,
            transform: [
              {
                scaleX: animation.interpolate({
                  inputRange: [1, 5],
                  outputRange: [1, 2000],
                }),
              }, // Vary scaleX between 1 and 2
              {
                scaleY: animation.interpolate({
                  inputRange: [1, 5],
                  outputRange: [1, 2000],
                }),
              }, // Vary scaleY between 1 and 3
            ],
          },
        ]}
      />
      <View style={styles.profileContainer}>
        <View style={styles.profilePhotoDiv}>
          <TouchableOpacity
            onPress={() => setImageModalVisible(true)}
            style={styles.profilePhotoDiv}>
            <Image
              style={styles.CartItemImage}
              source={require('../assets/profile.png')}
            />
          </TouchableOpacity>
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

      <View style={styles.listContainar}>
        <View style={{gap: 8}}>
          {settingsOptions.map((option, key) => (
            <SettingsOption
              icon={option.icon}
              label={option.label}
              pack={option.pack}
              key={key}
              onClick={option.onClick}
            />
          ))}
        </View>
        <ThemeSwitch moveView={moveView} />
      </View>

      <Modal
        animationType={isImageModalVisible ? 'fade' : 'none'}
        transparent={true}
        visible={isImageModalVisible}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setImageModalVisible(false)}>
          <Image
            style={styles.modalImage}
            source={require('../assets/profile.png')}
          />
        </Pressable>
      </Modal>
    </View>
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
    height: 130,
    width: 130,
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
    gap: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalImage: {
    height: 350,
    width: 350,
    borderRadius: 1000,
  },
  box: {
    width: 1,
    height: 1,
    borderRadius: 50,
  },
});

export default SettingsScreen;
