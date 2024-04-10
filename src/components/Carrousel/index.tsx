import React, {useRef} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const MyCarousel = ({entries}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{
            uri: item.image,
            cache: 'only-if-cached',
          }}
          resizeMode="stretch"
          style={styles.image}
          borderRadius={8}
        />
      </View>
    );
  };

  const sliderWidth = Dimensions.get('screen').width * 0.87;

  return (
    <Carousel
      ref={carouselRef}
      data={entries}
      vertical={false}
      width={sliderWidth}
      autoPlay
      autoPlayInterval={1000 * 5}
      renderItem={renderItem}
      loop
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
