import React, {ReactNode} from 'react';
import {Text, TextStyle} from 'react-native';
import {COLORS} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import {scale} from '../../hooks/scale';

interface TextProps {
  style?: TextStyle | TextStyle[];
  onPress?: () => void;
  numberLines?: number;
  children?: ReactNode;
}

const MyText: React.FC<TextProps> = ({style, onPress, children, ...props}) => {
  const {currentTheme} = useTheme();

  const applyScaleToFontSize = (styles: TextStyle | TextStyle[]) => {
    if (Array.isArray(styles)) {
      return styles.map(style => {
        if (style?.fontSize) {
          return {...style, fontSize: scale(style.fontSize)};
        }
        return style;
      });
    } else if (styles?.fontSize) {
      return {...styles, fontSize: scale(styles.fontSize)};
    }
    return styles;
  };

  const dynamicStyles = {
    color:
      currentTheme === 'light' ? COLORS.textColorLight : COLORS.textColorDark,
  };

  // Combinar estilos e aplicar escala de fontSize
  const combinedStyles = Array.isArray(style)
    ? [dynamicStyles, ...style]
    : [dynamicStyles, style];

  const scaledStyles = applyScaleToFontSize(combinedStyles);

  return (
    <Text
      style={[
        scaledStyles,
        {
          fontFamily: 'Inter',
        },
      ]}
      {...props}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export default MyText;
