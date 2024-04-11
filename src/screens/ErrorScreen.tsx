import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, FONTSIZE} from '../theme/theme';

import {enableGoBack} from '../utils';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import EmptyAnimation from '../components/Lottie/EmptyAnimation';
import ErrorAnimation from '../components/Lottie/ErrorAnimation';

const ErrorScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {currentTheme} = useTheme();

  useEffect(() => {
    enableGoBack(navigation);
  }, []);

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          backgroundColor:
            currentTheme === 'light'
              ? COLORS.backgroundColorLight
              : COLORS.backgroundColorDark,
        },
      ]}>
      <View
        style={[
          {
            flex: 1,
            alignSelf: 'center',
          },
        ]}>
        <View
          style={{
            flex: 1,
          }}>
          <ErrorAnimation />
        </View>
        <View
          style={{
            flex: 1,
            gap: 8,
            alignItems: 'center',
          }}>
          <MyText
            style={{
              fontSize: 25,
              fontWeight: '700',
            }}>
            Ooops!
          </MyText>
          <MyText
            style={{
              fontSize: 18,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Ocorreu um erro na conexão. Tente novamente mais tarde!
          </MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ErrorScreen;
