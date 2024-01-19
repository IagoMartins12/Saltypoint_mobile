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

const FidelityAccordeonSection = () => {
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

  return (
    <View
      style={{
        backgroundColor: COLORS.primaryWhiteHex,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}>
      <View>
        <Text style={styles.accordeonBoxTittle}>Mais informações</Text>
        <Pressable onPress={toggleFrequentDoubts} style={styles.accordeonBox}>
          <Text style={styles.accordeonTitle}>Dúvidas frequentes</Text>
          <CustomIcon
            name={frequentDoubtsOpen ? 'chevron-down' : 'chevron-right'}
            size={20}
            pack="Feather"
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
      <View>
        <Pressable onPress={toggleRegulamentOpen} style={styles.accordeonBox}>
          <Text style={styles.accordeonTitle}>Regulamento</Text>
          <CustomIcon
            name={regulamentOpen ? 'chevron-down' : 'chevron-right'}
            size={20}
            pack="Feather"
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
            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                color: COLORS.primaryBlackHex,
                fontWeight: 'bold',
              }}>
              1. Elegibilidade
            </Text>
            <View style={{gap: 10}}>
              {RegulamentTexts.map((i, key) => (
                <ListInfo text={i.text} key={key} />
              ))}
              {/* <View style={styles.hrStyle} /> */}
            </View>
          </View>

          <View style={{gap: 15}}>
            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                color: COLORS.primaryBlackHex,
                fontWeight: 'bold',
              }}>
              2. Regras e premiação
            </Text>
            <View style={{gap: 10}}>
              {RegulamentTextsRules.map((i, key) => (
                <ListInfo text={i.text} key={key} />
              ))}
            </View>
          </View>

          <View style={{gap: 15}}>
            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                color: COLORS.primaryBlackHex,
                fontWeight: 'bold',
              }}>
              3. Resgate de prêmios
            </Text>
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
        <Text style={styles.accordeonBoxTittle}>Ainda precisa de ajuda?</Text>
        <Text
          style={{
            fontSize: FONTSIZE.size_16,
            fontWeight: '500',
            color: COLORS.primaryBlackHex,
            textDecorationLine: 'underline',
          }}
          onPress={() => {
            showModal();
            setModalOpen(true);
          }}>
          Entre em contato com a gente!
        </Text>
      </View>
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
    color: COLORS.primaryBlackHex,
  },
  hrStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    marginHorizontal: 10,
  },
});

export default FidelityAccordeonSection;
