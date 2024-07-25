import {ActivityIndicator} from 'react-native';
import useTheme from '../../hooks/useTheme';

const LoadingIndicator = () => {
  const {currentTheme} = useTheme();
  return (
    <ActivityIndicator
      size={22}
      color={currentTheme === 'dark' ? '#FFFFFF' : '#00000'}
    />
  );
};

export default LoadingIndicator;
