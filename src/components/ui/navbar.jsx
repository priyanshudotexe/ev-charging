"use client";
import { useState,useCallback,useRef } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../../public/logo1.png";
import ChargeNow from "../../../public/chargenow.png";
import Car from "../../../public/car.png";
import Route from "../../../public/route.png";
import Avatar from "../../../public/avatar.png";
import {
  
  useJsApiLoader,
  
} from "@react-google-maps/api";

import { startLocationState, planTravelState, chargeNowState,navStates } from "../../recoil/recoilState";
import { useRecoilState } from "recoil";
const Navbar = () => {
  const libraries = ["places"];
  const [planTravel, setplanTravelState] = useRecoilState(planTravelState);
  const [chargeNow, setChargeNow] = useRecoilState(chargeNowState);
  const toggleChargeNow = () => {
    setChargeNow(!chargeNow);
  };
  
  const [sliderValue, setSliderValue] = useState([50]);
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  const [navState, setNavState] = useRecoilState(navStates);
  
  const searchBoxRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const togglePlanTravel = () => {
    setplanTravelState(!planTravel);
  }
  function updateStartLocation(newLat, newLng) {
    setStartLocation({ lat: newLat, lng: newLng });
  }
  function updateEndLocation(newLat, newLng) {
    setEndLocation({ lat: newLat, lng: newLng });
  }

  function onPlacesChanged() {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) {
      return;
    }
    const place = places[0];
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    console.log(coordinates);
    updateStartLocation(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
  }
  
  const onLoadsearch = useCallback((searchBox) => {
    searchBoxRef.current = searchBox;
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
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
  
  return (
    <div className="flex flex-row justify-between items-center relative z-10">
      {/* Left Logo */}
      <div className="flex-shrink-0 pl-4 pt-4">
        <Button size="logo" onClick={()=>{setNavState(1)}}>
          <Image src={Logo} alt="logo" className="h-12 w-12" />
        </Button>
      </div>
      
      {/* Center Navigation Buttons */}
      <div className="relative flex justify-center items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            asChild
            size="plantravel"
            onClick={() => {
              toggleChargeNow();
              setplanTravelState(false);
            }}
          >
            <div className="flex justify-end items-center">
              <div className="mr-1">Charge Now</div>
              <div>
                <Image
                  src={ChargeNow}
                  alt="charge now icon"
                  className="h-6 w-6"
                />
              </div>
            </div>
          </Button>
          <Button
            asChild
            size="plantravel"
            onClick={() => {
              togglePlanTravel();
              setChargeNow(false);
            }}
          >
            <div className="flex justify-end items-center">
              <div className="mr-2">Plan Travel</div>
              <div>
                <Image src={Route} alt="plan travel icon" className="h-6 w-6" />
              </div>
            </div>
          </Button>
          <Button size="plantravel">
            <div className="flex justify-end items-center">
              <div className="text">Your Vehicle</div>
              <div>
                <Image src={Car} alt="car icon" className="h-6 w-6" />
              </div>
            </div>
          </Button>
        </div>
      </div>
      {/* Right Avatar */}
      <div className="flex-shrink-0 pt-4 pr-4">
        <Button className="mr-1" size="logo">
          <Image src={Avatar} alt="avatar icon" className="h-12 w-12" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
