import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { GeolocateControl, Marker } from "mapbox-gl";

const Task2 = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5rdXIyMCIsImEiOiJja2tiOW4wNGIwNDh5MnBsY3EzeDNmcTV4In0.d4LelcSFDElA3BctgWvs1A";
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(87.27721567619342);
  const [lat, setLat] = useState(26.449432670637346);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/ankur20/cklq3agbe6tc918ny8hlc7ch6",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("load", function () {
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          map.addSource("points", {
            type: "geojson",
            data: {
              features: [
                {
                  type: "Feature",
                  properties: {
                    title: "Selected Pointer",
                  },
                  geometry: {
                    coordinates: [lng, lat],
                    type: "Point",
                  },
                },
              ],
              type: "FeatureCollection",
            },
          });
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, [lat, lng]);
  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "90vh",width:"90vw" }}
      />
      <div />
    </div>
  );
};

export default Task2;
