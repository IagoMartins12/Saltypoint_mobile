import {PixelRatio} from 'react-native';

export const scale = (fontSize: number) => {
  const currentPixelFont = PixelRatio.getFontScale();

  if (currentPixelFont === 1 || currentPixelFont <= 1) {
    return fontSize; // Sem ajuste
  }

  if (currentPixelFont > 1 && currentPixelFont < 1.5) {
    return fontSize * 0.9;
  }

  if (currentPixelFont >= 1.5 && currentPixelFont <= 1.9) {
    return fontSize * 0.7;
  }

  return fontSize * 0.6;
};

// import {Dimensions} from 'react-native';
// const {width, height} = Dimensions.get('window');

// //Guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 350;
// const guidelineBaseHeight = 680;

// const scale = size => (width / guidelineBaseWidth) * size;
// const verticalScale = size => (height / guidelineBaseHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// export {scale, verticalScale, moderateScale};
