"use client";
import React from "react";

import {
  planTravelState,
  startLocationState,
  endLocationState,
  radiusState,
  navStates,
} from "../recoil/recoilState.js";
import { useRecoilState } from "recoil";
import Search from "@/components/searchbox_start";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import DestinationSearchBox from "./searchbox.jsx";

export default function PlanTravelDialog() {
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  const [sliderValue, setSliderValue] = useState([50]);
  const [radius, setRadius] = useRecoilState(radiusState);
  const [planTravel, setPlanTravel] = useRecoilState(planTravelState);
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
  const getStations=()=>{
    
  };
  const Routing = () => {
    setNavState(2);
  };
  
  return (
    
    <dialog
      id="planTravelDialog"
      open={planTravel}
      style={{ backgroundColor: "black" }}
      className="rounded-lg w-80 h-70  p-6 absolute top-0 left-0 ml-4 mt-24 text-white"
    >
      <div className="rounded-lg w-100 h-100 flex flex-col items-center">
        <div>
          <h1 className="font-extrabold">Plan Travel</h1>
          <p>Plan you travel and charging together</p>
        </div>
        <div className="mt-2">
          <Search />
          <p className="text-white mt-10">or</p>
        </div>
        <Button
          className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black mt-2"
          onClick={getCurrentLocation}
        >
          Use Current Location
        </Button>
        <div className="mt-4">
          <DestinationSearchBox />
        </div>
        <div className="mt-12 text-sm items-center mb-4">
          <p>How much detour is acceptable to you?</p>
          <div className="flex flex-row">
            <p className="mt-4 mr-2">1km</p>
            <Slider
              className="w-48 mt-4"
              value={sliderValue}
              onValueChange={(value) => {
                setSliderValue(value);
              }}
              step={10}
            />
            <p className="mt-4 ml-2">10Km</p>
          </div>
        </div>
        <Button
          variant="plantravel"
          className="bg-transparent w-full"
          onClick={()=>{Routing();}}          
        >
          Plan Travel
        </Button>
      </div>
    </dialog>
  );
}
