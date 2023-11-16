import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

type MapComponentProps = {
  coordinates: {
    name: string;
    latitude: number;
    longitude: number;
  }[];
};

function MapComponent({ coordinates }: MapComponentProps) {
  const [viewport, setViewport] = useState({
    latitude: 43.7,
    longitude: -79.42,
    zoom: 12,
  });

  return (
    <Map
      {...viewport}
      mapLib={mapboxgl}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      dragPan={true}
      onDrag={(event) => setViewport(event.viewState)}
      onMove={(event) => setViewport(event.viewState)}
      scrollZoom={true}
    >
      {coordinates.map((coordinate, index) => (
        <Marker
          key={index}
          latitude={coordinate.latitude}
          longitude={coordinate.longitude}
        >
          📍{coordinate.name}
        </Marker>
      ))}
    </Map>
  );
}

export default MapComponent;
