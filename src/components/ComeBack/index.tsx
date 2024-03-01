import {TouchableOpacity, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useTheme from '../../hooks/useTheme';
import {COLORS} from '../../theme/theme';

const ComeBack = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const comeBack = () => {
    navigation.pop();
  };

  const {currentTheme} = useTheme();
  return (
    <TouchableOpacity
      onPress={comeBack}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 35,
        backgroundColor:
          currentTheme === 'light' ? COLORS.iconBgLight : COLORS.iconBgDark,
        borderRadius: 100,
        top: 25,
        left: 20,
        position: 'absolute',
      }}>
      <CustomIcon
        name="arrow-left"
        size={17}
        pack="SimpleLineIcons"
        color={
          currentTheme === 'light'
            ? COLORS.iconColorLight
            : COLORS.iconColorDark
        }
      />
    </TouchableOpacity>
  );
};

export default ComeBack;
