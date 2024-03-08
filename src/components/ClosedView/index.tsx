import {useEffect, useState} from 'react';
import {useGeneralDataInfo} from '../../hooks/generalData';
import NotOpenModal from '../Modals/NotOpenModal';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const ClosedView = () => {
  const [generalDataModalOpen, setGeneralDataModalOpen] = useState(false);
  const {systemOpening} = useGeneralDataInfo();

  const translateY = useSharedValue(Dimensions.get('window').height);

  const showModal = () => {
    setGeneralDataModalOpen(!generalDataModalOpen);
    translateY.value = withTiming(0, {duration: 500});
  };

  const hideModal = () => {
    console.log('cliocu');
    setGeneralDataModalOpen(false);
    translateY.value = withTiming(Dimensions.get('window').height, {
      duration: 500,
    });
  };

  useEffect(() => {
    if (systemOpening === false) {
      showModal();
    }
  }, [systemOpening]);

  return (
    <NotOpenModal
      hideModal={hideModal}
      modalOpen={generalDataModalOpen}
      setModalOpen={setGeneralDataModalOpen}
      translateY={translateY}
    />
  );
};

export default ClosedView;
