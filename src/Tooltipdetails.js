const Tooltipdetails = ({ lat, lng, add }) => {
  const info = `<div><h3>Tooltip</h3> <hr /> <div className="lat">Latitude : ${lat}</div><div className="lng">Longitude : ${lng}</div><div className="add">Address : ${add}</div</div>`;

  return info;
};

export default Tooltipdetails;
