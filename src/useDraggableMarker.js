import { useEffect, useRef, useState } from "react";
import Tooltipdetails from "./Tooltipdetails";

const useDraggableMarker = (map) => {
  const ref = useRef(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [position, setPosition] = useState({ lat: 23.8, lng: 77.6 });
  let radius = 100000;
  // console.log(map);

  const [address, setAddress] = useState();

  const Geocoding = (coordinates) => {
    let geocoder = new window.google.maps.Geocoder();

    let add;

    geocoder
      .geocode({ location: coordinates })
      .then((result) => {
        const { results } = result;

        add = results[0].formatted_address;
        console.log(add);
        setAddress(add);
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  };

  const infowindow = new window.google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  useEffect(() => {
    if (map) {
      setMarker(new window.google.maps.Marker());
    }
  }, [map]);

  useEffect(() => {
    if (marker) {
      marker.setPosition(position);
      marker.setMap(map);
      marker.setDraggable(true);

      console.log("marker", marker);

      let instance = new window.google.maps.Circle({
        strokeColor: "#34c0eb",
        fillColor: "#34c0eb",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.2,
      });

      setCircle(instance);

      marker.addListener("click", (e) => {
        Geocoding(e.latLng);
      });

      marker.addListener("drag", (e) => {
        setPosition(e.latLng);
      });

      marker.addListener("dragend", (e) => {
        setPosition(e.latLng);
      });
    }
  }, [marker]);

  useEffect(() => {
    if (marker) {
      const info = Tooltipdetails({
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        add: address,
      });
      infowindow.setContent(info);

      infowindow.open(map, marker);
    }
  }, [address]);

  useEffect(() => {
    console.log("circle");
    if (circle) {
      circle.setCenter(position);
      circle.setRadius(radius);
      circle.setMap(map);
    }
    if (map) {
      map.setCenter(position);
    }
  }, [position, circle]);
};

export default useDraggableMarker;
