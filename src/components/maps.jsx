"use client";
import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  StandaloneSearchBox,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  MarkerClusterer,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Distance from "./distance";
import { useRecoilState } from "recoil";
import {
  startLocationState,
  endLocationState,
  locationListState,
  radiusState,
  directionState,
  navStates,
} from "../recoil/recoilState.js";

const libraries = ["places"];
const exampleMapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#BDBDBD",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2C2C2C",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8A8A8A",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3C3C3C",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4E4E4E",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3D3D3D",
      },
    ],
  },
];
//console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

// const requestOptions = {
//  method: "GET",
//  redirect: "follow",
// };
// let locations = [];
// fetch("http:///charging_app/map", requestOptions)
// .then((response) => response.json())
// .then((data) => {
// data.stations.forEach((station) => {
// locations.push({
// lat: station.station_location.coordinates[1],
// lng: station.station_location.coordinates[0],
// });
// });
// })
// .catch((error) => {
// console.error("Error fetching data:", error);
// });

const Map = ({}) => {
  //Recoil hooks for state management
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  //const [locationList, setLocationList] = useRecoilState(locationListState);
  const [directions, setDirections] = useRecoilState(directionState);
  const [endLocation, setEndLocation] = useRecoilState(endLocationState);
  //useRef is a React hook used to create a ref (reference) that can be attached to a React element or component. This allows you to directly access the DOM element or React component instance.
  const searchBoxRef = useRef(null);
  //visible markers are set to all the locations

  //reference to the map
  const [navState, setNavState] = useRecoilState(navStates);
  const [locations, setLocationList] = useRecoilState(locationListState);
  const [visibleMarkers, setVisibleMarkers] = useState(locations);
  const mapRef = useRef();
  //wrapper function for the setter of startLocation
  function updatestartLocation(newLat, newLng) {
    setStartLocation({ lat: newLat, lng: newLng });
  }
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //runs only after first render, gets the current location of the user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStartLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.log(error)
      );
    }
  }, []);
  useEffect(() => {
    // Side effect logic here
    if (navState == 1) {
      setDirections(null);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      setLocationList([]);
      const locationlist = [];
      fetch("http://3.89.187.23:8000/charging_app/map", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          data.stations.forEach((station) => {
            const location = {
              lat: station.station_location.coordinates[1],
              lng: station.station_location.coordinates[0],
            };

            locationlist.push(location);
            setLocationList((oldArray) => [...oldArray, location]);
          });
        })
        .then(() => {
          setVisibleMarkers(locationlist);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setNavState(4);
    } else if (navState == 2) {
      let path = { coordinates: [] };
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
            for (
              var i = 0;
              i < result?.routes[0]?.legs[0]?.steps?.length;
              i++
            ) {
              const tempPath = [
                result?.routes[0]?.legs[0]?.steps[i]?.end_location?.lng() ?? "",
                result?.routes[0]?.legs[0]?.steps[i]?.end_location?.lat() ?? "",
              ];

              path.coordinates.push(tempPath);
            }
            console.log(path);

            const requestOptionsPost = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ path }),
              redirect: "follow",
            };
            setLocationList([]);
            const locationlist = [];
            fetch(
              "http://3.89.187.23:8000/charging_app/map/plantravel/",
              requestOptionsPost
            )
              .then((response) => response.json())
              .then((data) => {
                if (Array.isArray(data.stations)) {
                  data.stations.forEach((station) => {
                    const location = {
                      lat: station.station_location.coordinates[1],
                      lng: station.station_location.coordinates[0],
                    };
                    locationlist.push(location);
                    setLocationList((oldArray) => [...oldArray, location]);
                  });
                }
              })
              .then(() => {
                setVisibleMarkers(locationlist);
              })

              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      setNavState(4);
    } else if (navState == 3) {
      setDirections(null);
      let chargenow = {
        latitude: startLocation.lat,
        longitude: startLocation.lng,
        preferred_distance: 1,
      };

      const requestOptionsPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chargenow),
        redirect: "follow",
      };
      setLocationList([]);
      setDirections(null);
      const locationlist = [];
      fetch(
        "http://3.89.187.23:8000/charging_app/map/chargenow/",
        requestOptionsPost
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.stations)) {
            data.stations.forEach((station) => {
              const location = {
                lat: station.station_location.coordinates[1],
                lng: station.station_location.coordinates[0],
              };
              locationlist.push(location);
              setLocationList((oldArray) => [...oldArray, location]);
            });
          }
        })
        .then(() => {
          //console.log(locations);
          setVisibleMarkers(locationlist);
          //setNavState(3);
          //console.log(visibleMarkers);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setNavState(4);
    } else if (navState == 4) {
    } else {
      console.error(`error fetching directions ${result}`);
    }

    return () => {};
  }, [navState]);

  //callback function for when the search box is changed, Retrieves a list of places from a searchBoxRef reference
  function onPlacesChanged() {
    const places = searchBoxRef.current.getPlaces();
    //places is a singleton array, all the location is stored in the first index
    if (places.length === 0) {
      return;
    }
    console.log(places);
    const place = places[0];
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    //the latitude and longitude are stored as follows
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    console.log(coordinates);
    //calls the setter function for startLocation
    updatestartLocation(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
  }
  //a callback that stores a reference to a search box
  // component or object when the component mounts, ensuring
  // that the reference doesn't change on subsequent renders.
  //This is useful for interacting with the search box later,
  //such as retrieving user input or manipulating the search box
  //programmatically, without causing unnecessary re-renders.
  const onLoadsearch = useCallback((searchBox) => {
    searchBoxRef.current = searchBox;
  }, []);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    updateVisibleMarkers();
  }, []);
  const onBoundsChanged = useCallback(() => {
    updateVisibleMarkers();
  }, []);

  //calls the current state of the map object, using mapRef
  //uses the map and calls its bounds object, which refers to
  //the viewport of the map
  const updateVisibleMarkers = () => {
    const map = mapRef.current;
    console.log(map);
    if (!map) return;
    const bounds = map.getBounds();
    if (!bounds) return;
    const visibleMarkers = locations.filter((location) =>
      bounds.contains(new window.google.maps.LatLng(location.lat, location.lng))
    );
    setVisibleMarkers(visibleMarkers);
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const fetchDirections = (visibleMarkers) => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startLocation,
        destination: visibleMarkers,
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
  };

  return (
    <div className="main-container overflow-hidden relative">
      {directions && <Distance leg={directions.routes[0].legs[0]} />}

      <GoogleMap
        mapContainerClassName="map-container"
        zoom={16}
        center={startLocation}
        className="absolute z-0 w-full h-full"
        options={{
          styles: exampleMapStyles,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          disableDefaultUI: true,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker
          position={startLocation}
          icon={{
            url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg", // URL to the custom icon image
            scaledSize: new window.google.maps.Size(30, 50), // Size of the icon
            origin: new window.google.maps.Point(0, 0), // Origin of the icon (useful in sprites)
            anchor: new window.google.maps.Point(0, 25), // Anchor point of the icon
          }}
        />

        <MarkerClusterer>
          {(clusterer) =>
            visibleMarkers.map((location, index) => (
              <MarkerF
                key={index}
                position={location}
                clusterer={clusterer}
                onClick={() => {
                  fetchDirections(location);
                }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
      <div className="absolute top-24 ml-6 mt-6">
        <StandaloneSearchBox
          ref={searchBoxRef}
          onPlacesChanged={onPlacesChanged}
          onLoad={onLoadsearch}
          className="relative"
        >
          <input
            type="text"
            id="searchh"
            placeholder="Enter your current location"
            className="text-white "
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `280px`,
              height: `48px`,
              padding: `0 12px`,
              borderRadius: `8px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              textcolor: "black",
              colorScheme: "dark",
            }}
          />
        </StandaloneSearchBox>
      </div>
    </div>
  );
};
export default Map;
