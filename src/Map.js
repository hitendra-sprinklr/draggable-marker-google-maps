import { Wrapper, Status } from "@googlemaps/react-wrapper";
import DraggableMarker from "./DraggableMarker";
import Mapsetter from "./Mapsetter";

const Map = () => {
  const center = { lat: 23.85, lng: 77.6 };
  const zoom = 8;

  return (
    <div className="container">
      <Wrapper apiKey={"AIzaSyBD7x-Hg9Yfzwn6sEpO39RD32nkJkSpdj8"}>
        <Mapsetter center={center} zoom={zoom}>
          {/* <DraggableMarker /> */}
        </Mapsetter>
      </Wrapper>
    </div>
  );
};

export default Map;
