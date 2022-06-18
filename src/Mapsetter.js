import React, { useEffect, useRef, useState } from "react";

const Mapsetter = ({ center, zoom, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  //console.log(map);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} style={{ display: "flex", height: "100%" }} id="map" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Mapsetter;
