import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../theme/theme';
import CustomIcon from '../../CustomIcon';
import useTheme from '../../../hooks/useTheme';

const ModalIcon = ({
  handleOverlayPress,
  height,
}: {
  handleOverlayPress: () => void;
  height: '5%' | '10%' | '15%';
}) => {
  const {currentTheme} = useTheme();

  return (
    <Pressable
      style={{
        width: '100%',
        height: height,
        position: 'relative',
      }}>
      <TouchableOpacity
        style={[
          styles.iconStyle,
          {
            backgroundColor:
              currentTheme === 'light' ? COLORS.iconBgLight : COLORS.iconBgDark,
          },
        ]}
        onPress={handleOverlayPress}>
        <CustomIcon
          name="arrow-down"
          size={20}
          pack="SimpleLineIcons"
          color={
            currentTheme === 'light'
              ? COLORS.iconColorLight
              : COLORS.iconColorDark
          }
        />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#f0efef',
    borderRadius: 100,
    top: 15,
    left: 20,
    position: 'absolute',
  },
});

export default ModalIcon;