import {Appearance, Pressable, View} from 'react-native';
import CustomIcon from '../CustomIcon';
import {useEffect, useState} from 'react';
import {darkTheme, lightTheme} from '../../theme/theme';
import useTheme from '../../hooks/useTheme';

interface ThemeProps {
  moveView: () => void;
}
const ThemeSwitch: React.FC<ThemeProps> = ({moveView}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {setCurrentTheme} = useTheme();

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }
  }, []);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    const newTheme = isSwitchOn ? darkTheme : lightTheme;
    setCurrentTheme(newTheme);
    moveView();
  };

  const appearance = Appearance.getColorScheme(); // Corrigindo o nome da variável

  return (
    <Pressable
      onPress={toggleSwitch}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CustomIcon
        name={isSwitchOn ? 'moon' : 'sunny'}
        size={30}
        pack="Ionicons"
      />
    </Pressable>
  );
};

export default ThemeSwitch;
