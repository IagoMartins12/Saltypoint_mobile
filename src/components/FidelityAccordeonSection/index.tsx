import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import {COLORS, FONTSIZE} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import AccordeonText from '../AccordeonText';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ListInfo from '../ListInfo';
import {
  FrequentDoubts,
  RegulamentTexts,
  RegulamentTextsRewards,
  RegulamentTextsRules,
} from './data';
import ContactModal from '../Modals/ContactModal';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';

const FidelityAccordeonSection = ({
  showAllContent,
}: {
  showAllContent?: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [frequentDoubtsOpen, setFrequentDoubtsOpen] = useState(false);
  const [regulamentOpen, setRegulamentOpen] = useState(false);

  const translateY = useSharedValue(Dimensions.get('window').height);

  const frequentDoubtsHeight = useSharedValue(0);
  const frequentDoubtsOpacity = useSharedValue(0);

  const regulamentHeight = useSharedValue(0);
  const regulamentOpacity = useSharedValue(0);

  const showModal = () => {
    translateY.value = withTiming(0, {duration: 500});
  };

  const hideModal = () => {
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  const toggleFrequentDoubts = () => {
    setFrequentDoubtsOpen(!frequentDoubtsOpen);

    if (frequentDoubtsOpen) {
      frequentDoubtsHeight.value = withTiming(0, {
        duration: 800,
        easing: Easing.ease,
      });
      frequentDoubtsOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
    } else {
      frequentDoubtsHeight.value = withTiming(1000, {
        duration: 300,
        easing: Easing.ease,
      });
      frequentDoubtsOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.ease,
      });
    }
  };

  const toggleRegulamentOpen = () => {
    setRegulamentOpen(!regulamentOpen);

    if (regulamentOpen) {
      regulamentHeight.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
      regulamentOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.ease,
      });
    } else {
      regulamentHeight.value = withTiming(1000, {
        duration: 300,
        easing: Easing.ease,
      });
      regulamentOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.ease,
      });
    }
  };

  const animatedFrequentDoubtsStyles = useAnimatedStyle(() => {
    return {
      maxHeight: frequentDoubtsHeight.value * 2,
      opacity: frequentDoubtsOpacity.value,
    };
  });

  const animatedRegulamentStyles = useAnimatedStyle(() => {
    return {
      maxHeight: regulamentHeight.value * 2,
      opacity: regulamentOpacity.value,
    };
  });

  const {currentTheme} = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor:
          currentTheme === 'light'
            ? COLORS.cardColorLight
            : COLORS.cardColorDark,
      }}>
      <View>
        {showAllContent ? (
          <MyText style={styles.accordeonBoxTittle}>Mais informações</MyText>
        ) : null}
        <Pressable onPress={toggleFrequentDoubts} style={styles.accordeonBox}>
          <MyText style={styles.accordeonTitle}>Dúvidas frequentes</MyText>
          <CustomIcon
            name={frequentDoubtsOpen ? 'chevron-down' : 'chevron-right'}
            size={20}
            pack="Feather"
            color={
              currentTheme === 'light'
                ? COLORS.iconColorLight
                : COLORS.iconColorDark
            }
          />
        </Pressable>
        <Animated.View
          style={[
            {overflow: 'hidden', display: frequentDoubtsOpen ? 'flex' : 'none'},
            animatedFrequentDoubtsStyles,
          ]}>
          {FrequentDoubts.map((item, key) => (
            <AccordeonText label={item.label} text={item.text} key={key} />
          ))}
        </Animated.View>
      </View>

      {showAllContent ? (
        <>
          <View>
            <Pressable
              onPress={toggleRegulamentOpen}
              style={styles.accordeonBox}>
              <MyText style={styles.accordeonTitle}>Regulamento</MyText>
              <CustomIcon
                name={regulamentOpen ? 'chevron-down' : 'chevron-right'}
                size={20}
                pack="Feather"
                color={
                  currentTheme === 'light'
                    ? COLORS.iconColorLight
                    : COLORS.iconColorDark
                }
              />
            </Pressable>
            <Animated.View
              style={[
                {
                  overflow: 'hidden',
                  display: regulamentOpen ? 'flex' : 'none',
                  gap: 25,
                  paddingLeft: 5,
                },
                animatedRegulamentStyles,
              ]}>
              <View style={{gap: 15}}>
                <MyText
                  style={{
                    fontSize: FONTSIZE.size_16,
                    fontWeight: 'bold',
                  }}>
                  1. Elegibilidade
                </MyText>
                <View style={{gap: 10}}>
                  {RegulamentTexts.map((i, key) => (
                    <ListInfo text={i.text} key={key} />
                  ))}
                </View>
              </View>

              <View style={{gap: 15}}>
                <MyText
                  style={{
                    fontSize: FONTSIZE.size_16,
                    fontWeight: 'bold',
                  }}>
                  2. Regras e premiação
                </MyText>
                <View style={{gap: 10}}>
                  {RegulamentTextsRules.map((i, key) => (
                    <ListInfo text={i.text} key={key} />
                  ))}
                </View>
              </View>

              <View style={{gap: 15}}>
                <MyText
                  style={{
                    fontSize: FONTSIZE.size_16,
                    fontWeight: 'bold',
                  }}>
                  3. Resgate de prêmios
                </MyText>
                <View style={{gap: 10}}>
                  {RegulamentTextsRewards.map((i, key) => (
                    <ListInfo text={i.text} key={key} />
                  ))}
                  <View style={styles.hrStyle} />
                </View>
              </View>
            </Animated.View>
          </View>

          <View>
            <MyText style={styles.accordeonBoxTittle}>
              Ainda precisa de ajuda?
            </MyText>
            <MyText
              style={{
                fontSize: FONTSIZE.size_16,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                showModal();
                setModalOpen(true);
              }}>
              Entre em contato com a gente!
            </MyText>
          </View>
        </>
      ) : null}

      <ContactModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        hideModal={hideModal}
        translateY={translateY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accordeonBoxTittle: {
    paddingVertical: 20,
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
  accordeonBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  accordeonTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
  },
  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    marginHorizontal: 10,
  },
});

export default FidelityAccordeonSection;
