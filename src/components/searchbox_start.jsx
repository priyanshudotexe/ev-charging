"use client";
import React, { useCallback, useEffect, useRef } from "react";
import {
  StandaloneSearchBox,
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  MarkerClusterer,
  Circle,
  DirectionsRenderer,
  DistanceMatrixService,
  Places,
  InfoWindow,
} from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import {
  startLocationState,
  endLocationState,
  locationListState,
  radiusState,
  directionState,
} from "../recoil/recoilState.js";

const libraries = ["places"];

const SearchBoxStart = (props) => {
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  const [endLocation, setEndLocation] = useRecoilState(endLocationState);
  const [locationList, setLocationList] = useRecoilState(locationListState);
  const [radius, setRadius] = useRecoilState(radiusState);
  const [directions, setDirections] = useRecoilState(directionState);

  const searchBoxRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  useEffect(() => {
    if (isLoaded && endLocation) {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: startLocation,
          destination: endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [startLocation]);

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
    //console.log(coordinates);
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
  

  return (
    <StandaloneSearchBox
      ref={searchBoxRef}
      onPlacesChanged={onPlacesChanged}
      onLoad={onLoadsearch}
      className="relative text-black fill-transparent "
    >
      <input
        type="text"
        id="search"
        placeholder="Enter starting location or get current location"
        className="text-white self-start"
        style={{
          boxSizing: `border-box`,
          border: `1px solid green`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `10px`,
          outline: `green`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px",
          textcolor: "black",
          backgroundColor: "primary",
          colorScheme: "dark",
        }}
      />
    </StandaloneSearchBox>
  );
};

export default SearchBoxStart;
