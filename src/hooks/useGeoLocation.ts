import {useState, useEffect} from 'react';
import {Location} from '../types/GeolocationType';
import Geolocation from '@react-native-community/geolocation';

const useGeoLocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
  });

  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: error,
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  }, []);

  return location;
};

export default useGeoLocation;
