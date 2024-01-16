import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {global} from '../style';
import {FONTSIZE} from '../theme/theme';
import SettingsOption from '../components/SettingsOption';
import {PackNames} from '../components/CustomIcon';

const SettingsScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const handleNavigate = (name: string) => {
    navigation.push(name);
  };

  const settingsOptions = [
    {
      label: 'Minha conta',
      icon: 'user',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Meus endereços',
      icon: 'home',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Meus pedidos',
      icon: 'briefcase',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Meus cupons',
      icon: 'tag',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Programa de fidelidade',
      icon: 'badge',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Termos de uso e privacidade',
      icon: 'shield',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
    {
      label: 'Sair',
      icon: 'logout',
      pack: 'SimpleLineIcons' as PackNames,
      onClick: handleNavigate('house'),
    },
  ];

  return (
    <View style={global.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePhotoDiv}>
          <Image
            style={styles.CartItemImage}
            source={require('../assets/avatar.png')}
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

      <View style={styles.listContainar}>
        {settingsOptions.map((option, key) => (
          <SettingsOption
            icon={option.icon}
            label={option.label}
            pack={option.pack}
            key={key}
          />
        ))}
      </View>
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
    gap: 8,
  },
});

export default SettingsScreen;
