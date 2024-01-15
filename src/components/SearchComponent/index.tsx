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

interface SearchProps {
  width?: any;
  onFocus: boolean;
  setOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchProps> = ({
  setOnFocus,
  onFocus,
  searchText,
  setSearchText,
  width = '100%',
}) => {
  const onCancelPress = () => {
    setOnFocus(false);
    setSearchText('');
    Keyboard.dismiss(); // Fecha o teclado
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        gap: 15,
      }}>
      <KeyboardAwareScrollView>
        <View style={[styles.InputContainerComponent]}>
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
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
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
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {onFocus ? (
        <Text style={styles.cancelText} onPress={onCancelPress}>
          Cancelar
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
  },

  TextInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: '#000000',
  },

  cancelText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default SearchComponent;
