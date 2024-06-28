import useToast from '../useToast';

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
