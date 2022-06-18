import { useEffect, useRef, useState } from "react";

const DraggableMarker = ({ map }) => {
  const ref = useRef(null);
  const [marker, setMarker] = useState();
  const position = { lat: 23.8, lng: 77.6 };
  //console.log(map);

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
        infowindow.setContent(
          `Latitude : ${marker.position.lat()} Longitude : ${marker.position.lng()}`
        );

        infowindow.open(map, marker);
      });
    }
  }, [marker]);

  return null;
};

export default DraggableMarker;
