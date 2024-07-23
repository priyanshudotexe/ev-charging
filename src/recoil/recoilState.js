import { atom } from "recoil";

export const startLocationState = atom({
  key: "startLocationState",
  default: {},
});

export const endLocationState = atom({
  key: "endLocationState",
  default: { lat: 0, lng: 0 },
});

export const locationListState = atom({
  key: "locationListState",
  default: [],
});

export const chargeNowRadiusState = atom({
  key: "radiusState",
  default: 0,
});
export const detourState = atom({
  key: "detourState",
  default: 0,
}); 

export const directionState = atom({
  key: "directionState",
  default: null
});

export const planTravelState= atom({
  key: "planTravelState",
  default: false
});
export const chargeNowState = atom({
  key: "chargeNowState",
  default: false
});
export const navStates = atom({
  key: "navStates",
  default: 1,
});
export const etaState = atom({
  key: "etaState",
  default: {
    eta: "",
    distance: "",
  },
});
export const stationDataState = atom({
  key: "stationDataState",
  default: "Choose a station to view details",
});
