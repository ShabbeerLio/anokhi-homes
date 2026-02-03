import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCards = ({ p }) => {
  const navigate = useNavigate();
  return (
    <div
      key={p.id}
      className="plot-card card"
      onClick={() => navigate(`/plot/${p.id}`)}
    >
      <div className="plot-img">
        <img src={p.img} alt={p.title} />
        {/* <span className="offer">{p.offer}</span> */}
      </div>
      <div className="plot-details">
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
      </div>
    </div>
  );
};

export default ProjectCards;
