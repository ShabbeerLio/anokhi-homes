import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Plot.css";
import PlotCard from "../../components/Cards/PlotCard";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";

const Projects = () => {
  const { plotId } = useParams();
  const navigate = useNavigate();

  const plot = ProjectData.find((p) => p.id === plotId);

  if (!plot) return <p>Plot not found</p>;

  return (
    <div className="plot-container">
      <div className="table-filters">
        <h2>{plot.title} Projects</h2>
        <SearchItems />
      </div>

      <div className="plot-grid ">
        {plot.plots.map((p) => (
          <PlotCard p={p} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
