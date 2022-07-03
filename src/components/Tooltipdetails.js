// Return a string for displaying the latitude,longitude and address over the marker

const Tooltipdetails = ({ lat, lng, add }) => {
  const info = `<div><h2>Location</h2> <hr /> <div className="lat"><b>Latitude</b> : ${lat}</div><div className="lng"><b>Longitude</b> : ${lng}</div><div className="add"><b>Address</b> : ${add}</div</div>`;

  return info;
};

export default Tooltipdetails;
