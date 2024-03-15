import {Pressable, TouchableOpacity} from 'react-native';
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
        zIndex: 50,
      }}>
      <TouchableOpacity
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            width: 35,
            borderRadius: 100,
            top: 15,
            left: 20,
            position: 'absolute',
            backgroundColor:
              currentTheme === 'light' ? COLORS.iconBgLight : COLORS.iconBgDark,
          },
        ]}
        onPress={() => {
          handleOverlayPress();
        }}>
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

export default ModalIcon;
