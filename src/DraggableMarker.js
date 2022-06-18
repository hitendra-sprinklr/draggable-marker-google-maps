import { useEffect, useRef, useState } from "react";

const DraggableMarker = ({ map }) => {
  const ref = useRef(null);
  const [marker, setMarker] = useState();
  const position = { lat: 23.8, lng: 77.6 };
  //console.log(map);

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

      marker.addListener("click", (e) => {
        Geocoding(e.latLng);
      });
    }
  }, [marker]);

  useEffect(() => {
    if (marker) {
      infowindow.setContent(
        `Latitude : ${marker.position.lat()} Longitude : ${marker.position.lng()} Address : ${address}`
      );

      infowindow.open(map, marker);
    }
  }, [address]);

  return null;
};

export default DraggableMarker;
