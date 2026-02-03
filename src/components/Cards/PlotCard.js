import React from "react";
import { useNavigate } from "react-router-dom";

const PlotCard = ({ p, plotId }) => {
  const navigate = useNavigate();
  return (
    <div
      key={p.id}
      className="plot-card card"
      onClick={() => navigate(`/plot/${plotId}/${p.id}`)}
    >
      <div className="plot-img">
        <img src={p.img} alt={p.title} />
        {/* <span className="offer">{p.offer}</span> */}
      </div>
      <div className="plot-details">
        <h3>{p.name}</h3>
        <p className="plot-card-price">{p.price}</p>
        <p>{p.area}</p>
        <p>{p.details}</p>
      </div>
    </div>
  );
};

export default PlotCard;
