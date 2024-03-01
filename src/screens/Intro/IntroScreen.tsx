import React, {useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IMAGES from '../../assets/index';
import CustomIcon from '../../components/CustomIcon';
import MyText from '../../components/Text';
import {COLORS} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';

const IntroScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const _carousel = useRef<Carousel<any>>(null);
  const [activeDotIndex, setActiveDotIndex] = useState<number>(0);
  const {currentTheme} = useTheme();

  const data = [
    {
      id: 1,
      title: 'Faça seu pedido facilmente!',
      image: IMAGES.ORDER,
      description:
        'Com vontade de comer algo? Faça seu pedido através do nosso aplicativo! Navegue pelo nosso cardápio, personalize os ingredientes da sua pizza e receba seu pedido quentinho entregue diretamente na sua porta. Satisfação garantida!',
    },
    {
      id: 2,
      title: 'Receba informações do seu pedido em tempo real!',
      image: IMAGES.PUSH,
      description:
        'Não perca nenhum detalhe! Receba atualizações em tempo real sobre o status do seu pedido, desde a preparação até a entrega. Acompanhe a jornada da sua pizza, do nosso forno até a sua mesa, garantindo que ela chegue fresca e quentinha.',
    },
    {
      id: 3,
      title: 'Experiência Personalizada!',
      image: IMAGES.PROFILE,
      description:
        'Crie seu perfil, adicione seu endereço e salve seus produtos favoritos. Com recomendações personalizadas e histórico de pedidos ao seu alcance, desfrute de uma experiência de pizza personalizada de acordo com seu paladar.',
    },
    {
      id: 4,
      title: 'Economize com o app!',
      image: IMAGES.WALLET,
      description:
        'Para cada R$1,00 gasto, ganhe 1 ponto. Troque seus pontos por cupons de descontos exclusivos e brindes deliciosos! Acompanhe nossos canais de atendimento para ficar atualizado sobre nossos cupons também.',
    },
  ];

  const renderItem = ({item}: {item: any}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get('window').width * 0.95,
            width: Dimensions.get('window').width * 0.9,
            alignSelf: 'center',
          }}
        />

        <View style={{padding: 15, marginTop: 10}}>
          <MyText style={{fontSize: 18}}>{item.title}</MyText>
          <MyText style={{marginTop: 20, fontSize: 16}}>
            {item.description}
          </MyText>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (activeDotIndex === 3) {
      navigation.navigate('Tab');
    } else {
      _carousel.current?.snapToItem(activeDotIndex + 1);
    }
  };

  const handlePrevious = () => {
    _carousel.current?.snapToItem(activeDotIndex - 1);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor:
          currentTheme === 'dark'
            ? COLORS.backgroundColorDark
            : COLORS.backgroundColorLight,
      }}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '98%',
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 15,
          }}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <MyText
            textSize="mediumText2"
            style={{
              color: COLORS.primaryRedHex,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Pular
          </MyText>
        </TouchableOpacity>
      </View>
      <Carousel
        ref={_carousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveDotIndex(index)}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pagination
          carouselRef={_carousel}
          activeDotIndex={activeDotIndex}
          dotsLength={data.length}
          dotStyle={{
            width: 15,
            backgroundColor: COLORS.primaryRedHex,
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            backgroundColor: 'gray',
          }}
        />
        <View style={{padding: 15, flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={handlePrevious}>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: 'lightgray',
                marginEnd: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                name="arrow-left"
                size={25}
                color="#FFF"
                pack="Feather"
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleNext}>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: COLORS.primaryRedHex,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                name="arrow-right"
                size={25}
                color="#FFF"
                pack="Feather"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;
