"use client";
import React from "react";
import {
  startLocationState,
  radiusState,
  chargeNowState,
  navStates,
  
} from "../recoil/recoilState.js";
import { useRecoilState } from "recoil";
import Search from "@/components/searchbox_start";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";


export default function ChargeNowDialog() {
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
  const TempNav = () => {
    setNavState(3);
  };

  return (
    <dialog
      id="chargeNowDialog"
      open={chargeNow}
      style={{ backgroundColor: "black" }}
      className="rounded-lg w-80 h-96 p-4 absolute top-0 left-0 ml-4 mt-24 text-white"
    >
      <div className="p-2">
        <h1 className="mb-2 ml-2 font-extrabold">Charge Now</h1>
        

        <Search />
        <div className="flex flex-col items-center my-8">
          <p className="mt-4">or</p>
          <Button
            className="bg-transparent text- border-2 border-white hover:bg-white hover:text-black mt-4"
            onClick={getCurrentLocation}
          >
            Use Current Location
          </Button>
          <hr className=" border-gray-600"></hr>
          <div className="text-sm text-center mt-6">
            How far do you want your station to be
          </div>
          <div className="flex flex-row text-sm gap-2 mt-4">
            <p>1 km</p>
            <Slider
              className="w-48"
              value={sliderValue}
              onValueChange={(value) => {
                setSliderValue(value);
              }}
              step={10}
            />
            <p className="">10 km</p>
          </div>
          <p>{sliderValue[0] / 10} km</p>
        </div >
        <Button variant="plantravel" className="bg-transparent w-full "
        onClick={()=>{TempNav(); }}>
          Charge Now
        </Button>
      </div>
    </dialog>
  );
}
