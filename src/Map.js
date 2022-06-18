import { Wrapper, Status } from "@googlemaps/react-wrapper";
import DraggableMarker from "./DraggableMarker";
import Mapsetter from "./Mapsetter";

const Map = () => {
  const center = { lat: 23.85, lng: 77.6 };
  const zoom = 4;

  return (
    <div className="container">
      <Wrapper apiKey={"AIzaSyA9ZNsaoAQW1R8UlO8jaTb767HHNu80QJA"}>
        <Mapsetter center={center} zoom={zoom}>
          <DraggableMarker />
        </Mapsetter>
      </Wrapper>
    </div>
  );
};

export default Map;
