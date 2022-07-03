import React, { useEffect, useRef, useState } from "react";
import useDraggableMarker from "../hooks/useDraggableMarker";

const Mapsetter = ({ center, zoom }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  //console.log(map);

  // Sets the map with the given center and zoom
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  // Custom hook to add the draggable marker over the map
  useDraggableMarker(map);

  return (
    <>
      <div ref={ref} style={{ display: "flex", height: "100%" }} id="map" />
    </>
  );
};

export default Mapsetter;
