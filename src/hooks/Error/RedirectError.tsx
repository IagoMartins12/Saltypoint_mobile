import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useError from './useError';

const RedirectError = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const {hasError} = useError();

  const redirectToErrorScreen = () => {
    if (hasError) return navigation.push('Error');
  };

  return {
    redirectToErrorScreen,
  };
};

export default RedirectError;
