import useToast from '../useToast';

interface ShowToastProps {
  text: string;
  type: 'sucess' | 'error';
}
const useShowToast = () => {
  const {onOpen, setTitle, setType} = useToast();

  const showToast = (text, type: 'success' | 'error') => {
    setTitle(text);
    setType(type);
    onOpen();
  };

  return {
    showToast,
  };
};

export default useShowToast;
