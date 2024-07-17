"use client";
import Map from "@/components/maps.jsx";
import Navbar from "@/components/ui/navbar.jsx";
import { planTravelState,startLocationState,radiusState,chargeNowState,directionState, navStates, endLocationState } from "../../recoil/recoilState";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import  ChargeNowDialog from "@/components/chargeNowDialog.jsx";
import PlanTravelDialog from "@/components/planTravelDialog";

export default function Home() {
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  const [sliderValue, setSliderValue] = useState([50]);
  const [radius, setRadius] = useRecoilState(radiusState);
  const [chargeNow, setChargeNow] = useRecoilState(chargeNowState);
  const [navState, setNavState] = useRecoilState(navStates);
    
  function updateStartLocation(newLat, newLng) {
    setStartLocation({ lat: newLat, lng: newLng });
  }
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateStartLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const [planTravel, setplanTravelState] = useRecoilState(planTravelState);  


  
  return (
    <div className="relative">
      <div className="z-0 absolute">
      <Map/>
      </div>
      <Navbar />
      <ChargeNowDialog />
      <PlanTravelDialog/>
    </div>
  );
}
