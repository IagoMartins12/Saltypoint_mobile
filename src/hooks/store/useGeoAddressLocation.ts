import {create} from 'zustand';
import {GeoLocationStore} from '../../types/ComponentTypes';

const useGeoAddressLocation = create<GeoLocationStore>(set => ({
  GeoAddress: null,
  setGeoAddress: GeoAddress => set({GeoAddress: GeoAddress}),
}));

export default useGeoAddressLocation;
