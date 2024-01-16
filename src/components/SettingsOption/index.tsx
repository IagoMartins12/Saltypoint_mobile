import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon, {PackNames} from '../CustomIcon';
import {FONTSIZE} from '../../theme/theme';

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
        <CustomIcon name={icon} size={20} pack={pack} color="#000000" />
        <Text
          style={{
            fontSize: FONTSIZE.size_16,
            fontWeight: '500',
            color: '#000000',
          }}>
          {' '}
          {label}{' '}
        </Text>
      </View>

      <View>
        <CustomIcon
          name="arrow-right"
          size={20}
          pack="SimpleLineIcons"
          color="#000000f8"
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
