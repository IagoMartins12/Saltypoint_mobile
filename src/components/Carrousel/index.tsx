import React, {useRef} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MyCarousel = ({entries}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          resizeMode="stretch"
          style={styles.image}
          borderRadius={8}
        />
      </View>
    );
  };

  const sliderWidth = Dimensions.get('screen').width * 0.87;
  const itemWidth = sliderWidth; // Defina o valor apropriado

  return (
    <Carousel
      ref={carouselRef}
      data={entries}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      layout="stack"
      layoutCardOffset={18}
      itemWidth={itemWidth}
      autoplay={true} // Ativar o autoplay
      autoplayDelay={1000} // Definir o atraso entre os slides em milissegundos
      autoplayInterval={3000} // Definir o intervalo entre os slides em milissegundos    />
    />
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
