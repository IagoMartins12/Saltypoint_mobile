import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {COLORS, FONTSIZE} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';

interface TextProps {
  textSize?: 'largeText' | 'mediumText' | 'mediumText2' | 'smallText';
  style?: TextStyle | TextStyle[]; // Alterado para aceitar qualquer tipo de estilo
  onPress?: () => void;
  children?: ReactNode; // Adicionando a propriedade children
}

const MyText: React.FC<TextProps> = ({
  textSize = 'mediumText',
  style,
  onPress,
  children, // Adicionando children à desestruturação
  ...props
}) => {
  const getTextStyles = () => {
    switch (textSize) {
      case 'largeText':
        return styles.largeText;
      case 'mediumText':
        return styles.mediumText;
      case 'smallText':
        return styles.smallText;
      case 'mediumText2':
        return styles.mediumText2;
      default:
        return styles.mediumText;
    }
  };

  const {currentTheme} = useTheme();
  const textStyles = [
    getTextStyles(),
    {
      color:
        currentTheme === 'light' ? COLORS.textColorLight : COLORS.textColorDark,
    },
    style,
  ]; // Combinando estilos dinâmicos com os estilos adicionais

  return (
    <Text style={[textStyles]} {...props} onPress={onPress}>
      {children}
    </Text>
  ); // Passando children para o componente Text
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '700',
  },
  mediumText: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '500',
  },

  mediumText2: {
    fontSize: FONTSIZE.size_14,
    fontWeight: '500',
  },
  smallText: {
    fontSize: FONTSIZE.size_12,
    fontWeight: '400',
  },
});

export default MyText;
