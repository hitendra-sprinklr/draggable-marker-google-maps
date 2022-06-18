import { useEffect } from "react";

const Geocoding = ({ coordinates, fetchAddress }) => {
  console.log("hi");
  useEffect(() => {
    let geocoder = new window.google.maps.Geocoder();

    let add;

    geocoder
      .geocode({ location: coordinates })
      .then((result) => {
        const { results } = result;

        //console.log("result", results[0].formatted_address);
        add = results[0].formatted_address;
        console.log(add);
        fetchAddress(add);
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }, [coordinates]);

  return null;
};

export default Geocoding;
