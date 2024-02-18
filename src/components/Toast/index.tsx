// Foo.jsx
import Toast from 'react-native-toast-message';
import {Button} from 'react-native';
import {COLORS, FONTSIZE} from '../../theme/theme';
import React from 'react';

const CallToast = () => {
  const showToast = (text: string, type: 'success' | 'error' | 'info') => {
    Toast.show({
      type: type,
      text2: text,
      text1Style: {
        fontSize: FONTSIZE.size_18,
      },
      text2Style: {
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
      },
    });
  };

  return {
    showToast,
  };
};

export default CallToast;
