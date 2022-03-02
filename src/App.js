import React from 'react'
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '500px',
  height: '500px'
};

//Vidhan Souda location
// const center = {
//   lat: 12.9797,
//   lng: 77.5912
// };

const onPolylineLoad = polyline => {
  console.log('polyline: ', polyline)
};

const path = [
  { "lat": 12.9802347063322, "lng": 77.5907760360903 },
  { "lat": 12.9793774204024, "lng": 77.5910979011596 },
  { "lat": 12.9795865148043, "lng": 77.5911622741734 },
  { "lat": 12.9797746996155, "lng": 77.5916987159555 },
  { "lat": 12.9801301594259, "lng": 77.5919776656823 },
  { "lat": 12.9798374278543, "lng": 77.5922780730802 },
  { "lat": 12.9791683258247, "lng": 77.5920849540387 },
  { "lat": 12.9787501361417, "lng": 77.5917845466407 },
  { "lat": 12.9784155838887, "lng": 77.5912481048586 },
  { "lat": 12.9784783124705, "lng": 77.5913768508863 },
  { "lat": 12.9783319457552, "lng": 77.5912266471873 },
  { "lat": 12.978394674358, "lng": 77.591054985817 },
  { "lat": 12.9779555738058, "lng": 77.5909262397893 },
  { "lat": 12.9776210204837, "lng": 77.5904541710211 },
  { "lat": 12.9774746532636, "lng": 77.5901537636231 },
  { "lat": 12.9761573444059, "lng": 77.5872569779997 },
  { "lat": 12.9764291706147, "lng": 77.5866347055324 },
  { "lat": 12.9766382674962, "lng": 77.5863986711483 },
  { "lat": 12.9771191896563, "lng": 77.5857120256672 }];

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 5,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: path,
  zIndex: 1
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCS5lxXokXhrweKCnihH7h2mfkwXrbuROc"
  });

  const [map, setMap] = React.useState(null);
  const [active, setActive] = React.useState(false);
  const [currentPos, setCurrentPos] = React.useState(-1);
  const [isUpSide, setIsUpSide] = React.useState(true);

  React.useEffect(() => {
    const interval = active && window.setTimeout(moveObject, 2000);
    return () => clearTimeout(interval);
  }, [active, currentPos]);

  const moveObject = function () {
    if (isUpSide) {
      if (currentPos === path.length - 2) setIsUpSide(!isUpSide);
      setCurrentPos(currentPos + 1);
    } else {
      if (currentPos === 1) setIsUpSide(!isUpSide);
      setCurrentPos(currentPos - 1);
    }
  };


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    const SW = new window.google.maps.LatLng(12.98372780684526, 77.58072336198057);
    const NE = new window.google.maps.LatLng(12.972163755478755, 77.59683187962094);
    bounds.extend(SW);
    bounds.extend(NE);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  const renderStopMarker = function () {
    const stops = [{ "lat": 12.9802347063322, "lng": 77.5907760360903, "id": "stop1" }, { "lat": 12.9787501361417, "lng": 77.5917845466407, "id": "stop2" }, { "lat": 12.9771191896563, "lng": 77.5857120256672, "id": "stop3" }];
    return (
      <>
        {stops && stops.map(item => <Marker key={item.id} position={item} icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        />)}
      </>
    );
  }

  return isLoaded ? (
    <>
      <button onClick={() => setActive(!active)}>
        {active ? "Stop" : "Start"}
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultZoom={15}
        defaultCenter={{
          lat: 12.9797,
          lng: 77.5912
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Polyline
          onLoad={onPolylineLoad}
          path={path}
          options={options}
        />
        {renderStopMarker()}
        <Marker
          position={path[currentPos]}
        />
        <></>
      </GoogleMap>
    </>

  ) : <></>
}

export default App;