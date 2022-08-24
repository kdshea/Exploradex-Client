import mapboxgl from "mapbox-gl";
import { useEffect } from "react";



const BaseMap = () => {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  
  useEffect(() => {
    new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });
  }, []);

  return <div id="mapContainer" className="map"></div>;
};

export default BaseMap;