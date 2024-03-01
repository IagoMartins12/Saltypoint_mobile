import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon, {PackNames} from '../CustomIcon';
import {COLORS, FONTSIZE} from '../../theme/theme';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';

interface optionProps {
  icon: string;
  label: string;
  onClick?: () => void;
  pack?: PackNames;
}
const SettingsOption: React.FC<optionProps> = ({
  icon,
  label,
  onClick,
  pack = 'FontAwesome',
}) => {
  const {currentTheme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      <View style={styles.mainContainer}>
        <CustomIcon
          name={icon}
          size={20}
          pack={pack}
          color={
            currentTheme === 'dark'
              ? COLORS.iconColorDark
              : COLORS.iconColorLight
          }
        />
        <MyText
          style={{
            fontSize: FONTSIZE.size_16,
            fontWeight: '500',
          }}>
          {' '}
          {label}{' '}
        </MyText>
      </View>

      <View>
        <CustomIcon
          name="arrow-right"
          size={20}
          pack="SimpleLineIcons"
          color={
            currentTheme === 'dark'
              ? COLORS.iconColorDark
              : COLORS.iconColorLight
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});

export default SettingsOption;
