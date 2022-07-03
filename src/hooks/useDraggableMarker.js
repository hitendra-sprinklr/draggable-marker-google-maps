import { useEffect, useRef, useState } from "react";
import Tooltipdetails from "../components/Tooltipdetails";

const useDraggableMarker = (map) => {
  const ref = useRef(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [address, setAddress] = useState();
  const [position, setPosition] = useState({ lat: 23.8, lng: 77.6 });
  let radius = 100000;
  // console.log(map);

  // Functions which accepts latlng of a location over the map and uses the google maps geocoding api to return the address of the location
  const Geocoding = (coordinates) => {
    let geocoder = new window.google.maps.Geocoder();
    let fetchedAddress;

    geocoder
      .geocode({ location: coordinates })
      .then((result) => {
        const { results } = result;

        fetchedAddress = results[0].formatted_address;
        // console.log(add);
        setAddress(fetchedAddress);
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  };

  // Infowindow which is used to set up the tooltip over the marker
  const infowindow = new window.google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Instantiates the marker when the map is loaded
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

      // console.log("marker", marker);

      // Creates a circle instance using google maps api
      let instance = new window.google.maps.Circle({
        strokeColor: "#34c0eb",
        fillColor: "#34c0eb",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.2,
      });

      // Sets the Circle to the above created instance of the circle
      setCircle(instance);

      // Updates the address over the tooltip using the geocoding api on click
      marker.addListener("click", (e) => {
        Geocoding(e.latLng);
      });

      // Sets the new position of the marker on continous dragging
      marker.addListener("drag", (e) => {
        setPosition(e.latLng);
      });

      // Sets the final position after the drag has ended
      marker.addListener("dragend", (e) => {
        setPosition(e.latLng);
      });
    }
  }, [marker]);

  // Sets the tooltip with the latitude, longitude and address of the location
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

  // Sets the circle over the map with the current position of the marker
  useEffect(() => {
    // console.log("circle");
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
