import {Pressable, useColorScheme} from 'react-native';
import CustomIcon from '../CustomIcon';
import {useState, useEffect} from 'react';
import useTheme from '../../hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeProps {
  moveView: () => void;
}

const ThemeSwitch: React.FC<ThemeProps> = ({moveView}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {setCurrentTheme, currentTheme} = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      console.log('savedTheme', savedTheme);
      if (!savedTheme) {
        const systemTheme = colorScheme === 'dark' ? 'dark' : 'light';
        setCurrentTheme(systemTheme);
      }
    };
    fetchTheme();
  }, []);

  const toggleSwitch = () => {
    moveView();
    setIsSwitchOn(prevValue => !prevValue);
    const newTheme = isSwitchOn ? 'dark' : 'light';
    setCurrentTheme(newTheme);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CustomIcon
        name={currentTheme === 'light' ? 'moon' : 'sunny'}
        size={30}
        pack="Ionicons"
        color={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
      />
    </Pressable>
  );
};

export default ThemeSwitch;
