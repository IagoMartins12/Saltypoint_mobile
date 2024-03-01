import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useTheme from '../../hooks/useTheme';
import MyText from '../Text';

interface SearchProps {
  width?: any;
  onFocus: boolean;
  setOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  buttonPressHandler: () => void;
}

const SearchComponent: React.FC<SearchProps> = ({
  setOnFocus,
  onFocus,
  searchText,
  setSearchText,
  buttonPressHandler,
  width = '100%',
}) => {
  const onCancelPress = () => {
    setOnFocus(false);
    setSearchText('');
    Keyboard.dismiss(); // Fecha o teclado
  };

  const {currentTheme} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        alignSelf: onFocus ? 'flex-start' : 'flex-end',
        position: 'relative',
      }}>
      {!onFocus ? (
        <TouchableOpacity onPress={buttonPressHandler}>
          <CustomIcon
            name="chevron-left"
            pack="Feather"
            size={18}
            color={
              currentTheme === 'dark'
                ? COLORS.textColorDark
                : COLORS.textColorLight
            }
          />
        </TouchableOpacity>
      ) : null}
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignSelf: 'flex-end',
        }}>
        <View
          style={[
            styles.InputContainerComponent,
            {
              borderColor:
                currentTheme === 'dark'
                  ? COLORS.textColorDark
                  : COLORS.textColorLight,
            },
          ]}>
          <TextInput
            placeholder="Calabresa / Mussarela"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
            }}
            onFocus={() => {
              setOnFocus(true);
            }}
            focusable={onFocus}
            placeholderTextColor={
              currentTheme === 'dark'
                ? COLORS.textColorDark
                : COLORS.textColorLight
            }
            style={[
              styles.TextInputContainer,
              {
                color:
                  currentTheme === 'dark'
                    ? COLORS.textColorDark
                    : COLORS.textColorLight,
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              // searchCoffee(searchText);
            }}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : currentTheme === 'dark'
                  ? COLORS.iconColorDark
                  : COLORS.iconColorLight
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {onFocus ? (
        <MyText style={styles.cancelText} onPress={onCancelPress}>
          Cancelar
        </MyText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },

  TextInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },

  cancelText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
  },
});

export default SearchComponent;
