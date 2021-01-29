import React, { useEffect } from "react";
import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function setupMap(center) {
  const mapId = document.getElementById("map");
  const map = new mapboxgl.Map({
    container: mapId,
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  });
  const nav = new mapboxgl.NavigationControl();

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });

  var directions = new Directions({
    accessToken: mapboxgl.accessToken,
  });

  var marker = new mapboxgl.Marker().setLngLat([30.5, 50.5]).addTo(map);
  var marker2 = new mapboxgl.Marker().setLngLat([32, 51]).addTo(map);

  map.addControl(geocoder, "top-left");
  map.addControl(nav);
  map.addControl(directions, "top-left");
}

function successLocation(position) {
  console.log("SUCCESS LOCATION");
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  console.log("FAILURE");
  setupMap([-2.24, 53.48]);
}

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });
  }, []);
  return (
    <>
      <div id="map"></div>
    </>
  );
}

export default App;
