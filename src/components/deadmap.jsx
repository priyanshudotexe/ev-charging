'use client';
import React,{useCallback,useState,useRef} from 'react';
import process from 'process'

import { GoogleMap, useLoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
const libraries = ['places'];



const exampleMapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

//console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
const center = {
  lat: 28.6304, // default latitude
  lng: 77.2170, // default longitude
};

const locations= [{lat: 28.6327, lng: 77.2185}];


//,{lat: 28.7041, lng: 77.1025},{lat: 28.6139, lng: 77.209},{lat: 28.542718, lng: 77.225306},{lat: 28.6472799, lng: 76.813065},{lat: 28.567369, lng: 77.175281},{lat: 28.6020461, lng: 77.234953},{lat: 28.62932, lng: 77.21262},{lat: 28.583376, lng: 77.191379},{lat: 28.7324265, lng: 77.198624},{lat: 28.6179662, lng: 77.2487894},{lat: 28.637547, lng: 77.174571},{lat: 28.55773691, lng: 77.15794},{lat: 28.708659, lng: 77.136715},{lat: 28.582333, lng: 77.181061},{lat: 28.63243, lng: 77.175699},{lat: 28.586252, lng: 77.213194},{lat: 28.592914, lng: 77.220242},{lat: 28.61731, lng: 77.213658},{lat: 28.6177877, lng: 77.210801},{lat: 28.65740137, lng: 77.30219},{lat: 28.736887, lng: 77.263389},{lat: 28.627092, lng: 77.121841},{lat: 28.63733, lng: 77.221624},{lat: 28.6321091, lng: 77.137268},{lat: 28.6636726, lng: 77.156076},{lat: 28.638239, lng: 77.240158},{lat: 28.624363, lng: 77.204853},{lat: 28.60585, lng: 77.08133},{lat: 28.578701, lng: 77.203118},{lat: 28.7041, lng: 77.1025},{lat: 28.553, lng: 77.0944},{lat: 28.531119, lng: 77.311217},{lat: 28.55447, lng: 77.19563},{lat: 28.538666, lng: 77.266986},{lat: 28.640256, lng: 77.25728},{lat: 28.597071, lng: 77.195828},{lat: 28.727309, lng: 77.142992},{lat: 28.527934, lng: 77.215635},{lat: 28.578641, lng: 77.05962},{lat: 28.676246, lng: 77.31768},{lat: 28.686885, lng: 76.984929},{lat: 28.619703, lng: 77.341184},{lat: 28.85588, lng: 77.1245},{lat: 28.54948, lng: 77.12137},{lat: 28.738309, lng: 77.140492},{lat: 28.725041, lng: 77.125741},{lat: 28.625591, lng: 77.100933},{lat: 28.547217, lng: 77.244324},{lat: 28.556608, lng: 77.232732},{lat: 28.568632, lng: 77.219824},{lat: 28.572793, lng: 77.208662},{lat: 28.585367, lng: 77.17755},{lat: 28.580532, lng: 77.221048},{lat: 28.583518, lng: 77.222057},{lat: 28.588117, lng: 77.217564},{lat: 28.590402, lng: 77.220192},{lat: 28.600324, lng: 77.226883},{lat: 28.626695, lng: 77.231943},{lat: 28.622004, lng: 77.194962},{lat: 28.617517, lng: 77.213919},{lat: 28.627546, lng: 77.219769},{lat: 28.628528, lng: 77.21946},{lat: 28.6285, lng: 77.217046},{lat: 28.63407, lng: 77.217683},{lat: 28.633733, lng: 77.22353},{lat: 28.63388, lng: 77.221078},{lat: 28.634371, lng: 77.2195},{lat: 28.52687, lng: 77.27284},{lat: 28.60386, lng: 77.23944},{lat: 28.6459, lng: 77.12616},{lat: 28.657537, lng: 77.302279},{lat: 28.700703, lng: 77.213143},{lat: 28.660691, lng: 77.22356},{lat: 28.644917, lng: 77.202514},{lat: 28.708549, lng: 77.181948},{lat: 28.671177, lng: 77.270385},{lat: 28.628909, lng: 77.216117},{lat: 28.696323, lng: 77.152547},{lat: 28.653693, lng: 77.147393},{lat: 28.659123, lng: 77.143639},{lat: 28.689621, lng: 77.13288},{lat: 28.639002, lng: 77.138019},{lat: 28.6459, lng: 77.12616},{lat: 28.69947, lng: 77.115773},{lat: 28.638448, lng: 77.313066},{lat: 28.621452, lng: 77.305455},{lat: 28.716277, lng: 77.117874},{lat: 28.592995, lng: 77.162334},{lat: 28.688196, lng: 77.089945},{lat: 28.593617, lng: 77.134291},{lat: 28.692423, lng: 77.09186},{lat: 28.596473, lng: 77.132314},{lat: 28.735847, lng: 77.093263},{lat: 28.5954, lng: 77.133151},{lat: 28.596581, lng: 77.132439},{lat: 28.550243, lng: 77.267887},{lat: 28.547216, lng: 77.193781},{lat: 28.551949, lng: 77.121692},{lat: 28.550881, lng: 77.121356},{lat: 28.539177, lng: 77.269051},{lat: 28.525507, lng: 77.281536},{lat: 28.5263555, lng: 77.289903},{lat: 28.85564, lng: 77.119453},{lat: 28.5584184, lng: 77.062737},{lat: 28.513762, lng: 77.11461},{lat: 28.6459, lng: 77.12616},{lat: 28.720307, lng: 77.066223},{lat: 28.660625, lng: 77.22333},{lat: 28.645173, lng: 77.216749},{lat: 28.6053049, lng: 77.2238199},{lat: 28.588711, lng: 77.14504},{lat: 28.589836, lng: 77.195329},{lat: 28.573038, lng: 77.138737},{lat: 28.604943, lng: 77.192708},{lat: 28.628892, lng: 77.076182},{lat: 28.525841, lng: 77.144151},{lat: 28.703005, lng: 77.266429},{lat: 28.693908, lng: 77.121648},{lat: 28.647065, lng: 77.192235},{lat: 28.6608663, lng: 77.295529},{lat: 28.51439, lng: 77.296366},{lat: 28.587117, lng: 77.312835},{lat: 28.63429, lng: 77.219507},{lat: 28.4089, lng: 77.3178},{lat: 28.6654, lng: 77.3493},{lat: 28.660706, lng: 77.005696},{lat: 28.62145, lng: 77.293556},{lat: 28.5279341, lng: 77.2156347},{lat: 28.6472799, lng: 76.813065},{lat: 28.6198667, lng: 77.113982},{lat: 28.528526, lng: 77.27831},{lat: 28.556966, lng: 77.163741},{lat: 28.535712, lng: 77.21091},{lat: 28.568224, lng: 77.220178},{lat: 28.589878, lng: 77.1955},{lat: 28.581276, lng: 77.220043},{lat: 28.592914, lng: 77.220242},{lat: 28.602229, lng: 77.186064},{lat: 28.717566, lng: 77.129272},{lat: 28.626216, lng: 77.195399},{lat: 28.6143525, lng: 77.197236},{lat: 28.493396, lng: 77.288633},{lat: 28.645159, lng: 77.033645},{lat: 28.540697, lng: 77.116863},{lat: 28.631295, lng: 77.081362},{lat: 28.574742, lng: 77.236938},{lat: 28.549427, lng: 77.243591},{lat: 28.95592, lng: 77.203138},{lat: 28.709831, lng: 77.17765},{lat: 28.640528, lng: 77.185867},{lat: 28.632973, lng: 77.222937},{lat: 28.61546, lng: 77.021012},{lat: 28.591934, lng: 77.05855},{lat: 28.590747, lng: 77.034075},{lat: 28.587135, lng: 77.241353},{lat: 28.633301, lng: 77.126961},{lat: 28.603499, lng: 77.335422},{lat: 28.642219, lng: 77.105891},{lat: 28.691279, lng: 77.152396},{lat: 28.538217, lng: 77.283323},{lat: 28.570513, lng: 77.236889},{lat: 28.548646, lng: 77.104162},{lat: 28.54828, lng: 77.2512365},{lat: 28.588506, lng: 77.257024},{lat: 28.552074, lng: 77.203279},{lat: 28.577259, lng: 77.19692},{lat: 28.586638, lng: 77.193352},{lat: 28.622362, lng: 77.193671},{lat: 28.621724, lng: 77.219286},{lat: 28.633614, lng: 77.207691},{lat: 28.630256, lng: 77.225668},{lat: 28.631121, lng: 77.221654},{lat: 28.631848, lng: 77.217614},{lat: 28.633841, lng: 77.217664},{lat: 28.632973, lng: 77.222937},{lat: 28.63363, lng: 77.221949},{lat: 28.633867, lng: 77.22191},{lat: 28.634388, lng: 77.221038},{lat: 28.63491, lng: 77.219522},{lat: 28.703699, lng: 77.204473},{lat: 28.625974, lng: 77.101589},{lat: 28.5792424, lng: 77.055407},{lat: 28.54333, lng: 77.066524},{lat: 28.661723, lng: 77.147453},{lat: 28.580273, lng: 77.238549},{lat: 28.633154, lng: 77.213251},{lat: 28.525231, lng: 77.156944},{lat: 28.565915, lng: 77.18949},{lat: 28.550453, lng: 77.233698},{lat: 28.550331, lng: 77.233634},{lat: 28.691499, lng: 77.130338},{lat: 28.626154, lng: 77.245275},{lat: 28.705772, lng: 77.291743},{lat: 28.703764, lng: 77.292531},{lat: 28.539842, lng: 77.144261},{lat: 28.59666, lng: 77.036615},{lat: 28.604594, lng: 77.318364},{lat: 28.600332, lng: 77.311668},{lat: 28.603594, lng: 77.318761},{lat: 28.634309, lng: 77.220124},{lat: 28.644569, lng: 77.199961},{lat: 28.568872, lng: 77.221039},{lat: 28.590967, lng: 77.227824},{lat: 28.564647, lng: 77.239419},{lat: 28.618538, lng: 77.311861},{lat: 28.580931, lng: 77.059427},{lat: 28.59502, lng: 77.299741},{lat: 28.54641, lng: 77.196353},{lat: 28.566742, lng: 77.245479},{lat: 28.558039, lng: 77.163838},{lat: 28.477914, lng: 77.069834},{lat: 28.613029, lng: 76.922518},{lat: 28.522563, lng: 77.089012},{lat: 28.659682, lng: 77.15177},{lat: 28.625056, lng: 77.065171},{lat: 28.614619, lng: 77.056787},{lat: 28.624742, lng: 77.110952},{lat: 28.622027, lng: 77.056717},{lat: 28.530401, lng: 77.258674},{lat: 28.510389, lng: 77.171527},{lat: 28.535938, lng: 77.223114},{lat: 28.627041, lng: 77.121628},{lat: 28.733829, lng: 77.269066},{lat: 28.58254, lng: 77.049698},{lat: 28.610867, lng: 77.09308},{lat: 28.653899, lng: 77.190371},{lat: 28.645536, lng: 77.181638},{lat: 28.72636, lng: 77.084088},{lat: 28.795777, lng: 77.074671},{lat: 28.475238, lng: 77.191362},{lat: 28.726872, lng: 77.158459},{lat: 28.739506, lng: 77.149389},{lat: 28.641221, lng: 77.071104},{lat: 28.656449, lng: 77.297722},{lat: 28.550354, lng: 77.288438},{lat: 28.734545, lng: 77.094824},{lat: 28.534449, lng: 77.21938},{lat: 28.66584, lng: 77.293268},{lat: 28.672657, lng: 77.252795},{lat: 28.624736, lng: 77.283913},{lat: 28.6128, lng: 77.027931},{lat: 28.697447, lng: 77.215707},{lat: 28.548146, lng: 77.291446},{lat: 28.728128, lng: 77.046547},{lat: 28.702819, lng: 77.269849},{lat: 28.797157, lng: 77.086115},{lat: 28.711231, lng: 77.075368},{lat: 28.696017, lng: 77.265654},{lat: 28.5892, lng: 77.3021},{lat: 28.712653, lng: 77.122843},{lat: 28.637586, lng: 77.182174},{lat: 28.562905, lng: 77.286417},{lat: 28.532659, lng: 77.052969},{lat: 28.506769, lng: 77.22917},{lat: 28.520324, lng: 77.238888},{lat: 28.556582, lng: 77.237336},{lat: 28.530743, lng: 77.259396},{lat: 28.550329, lng: 77.233643},{lat: 28.535904, lng: 77.258542},{lat: 28.661275, lng: 77.191323},{lat: 28.5407, lng: 77.2757},{lat: 28.612471, lng: 77.054921},{lat: 28.532068, lng: 77.309132},{lat: 28.61299, lng: 77.029602},{lat: 28.716117, lng: 77.168335},{lat: 28.696372, lng: 77.11768},{lat: 28.710063, lng: 77.135522},{lat: 28.520493, lng: 77.294174},{lat: 28.520493, lng: 77.294174},{lat: 28.520493, lng: 77.294174},{lat: 28.605667, lng: 77.056809},{lat: 28.692859, lng: 77.157966},{lat: 28.562594, lng: 77.287435},{lat: 28.547081, lng: 77.206921},{lat: 28.57467, lng: 77.238403},{lat: 28.499635, lng: 77.287102},{lat: 28.731619, lng: 77.126785},{lat: 28.638723, lng: 77.072402},{lat: 28.662654, lng: 77.290119},{lat: 28.576241, lng: 77.069491},{lat: 28.682642, lng: 77.040983},{lat: 28.6823646, lng: 77.04292},{lat: 28.598549, lng: 77.064853},{lat: 28.521158, lng: 77.20217}





const Deadmap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [visibleMarkers, setVisibleMarkers] = useState(locations);
  const mapRef = useRef();
  
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    updateVisibleMarkers();
  }, []);

  const onBoundsChanged = useCallback(() => {
    updateVisibleMarkers();
  }, []);

  const updateVisibleMarkers = () => {
    const map = mapRef.current;
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

  return ( 
    <div className='main-container'>
      <GoogleMap 
        mapContainerClassName='map-container'
        zoom={16}
        center={center}
        options={{
          styles: exampleMapStyles,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          disableDefaultUI: true,
          gestureHandling: false,
          draggableCursor: false,
          draggingCursor: false,
          draggable: false,
        }}
      >
        {visibleMarkers.map((location, index) => (
        <MarkerF key={index} position={location} />
        ))}
      </GoogleMap>
    </div>
      );
};

export default Deadmap;