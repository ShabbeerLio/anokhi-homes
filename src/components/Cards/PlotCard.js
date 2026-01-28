import React from "react";
import { useNavigate } from "react-router-dom";

const PlotCard = ({ p }) => {
  const navigate = useNavigate();
  return (
    <div
      key={p.id}
      className="plot-card card"
      onClick={() => navigate(`/projects/${p.id}`)}
    >
      <div className="plot-img">
        <img src={p.img} alt={p.title} />
        <span className="offer">{p.offer}</span>
      </div>
      <div className="plot-details">
        <h3>{p.name}</h3>
        <p>{p.price}</p>
      </div>
    </div>
  );
};

export default PlotCard;
