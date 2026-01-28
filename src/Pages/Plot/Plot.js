import React from "react";
import { useNavigate } from "react-router-dom";
import "./Plot.css";
import ProjectCards from "../../components/Cards/ProjectCards";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";

const PlotList = () => {
  return (
    <div className="plot-container">
      <div className="table-filters">
        <h2>Trending Locations</h2>
        <SearchItems />
      </div>

      <div className="plot-grid ">
        {ProjectData.map((p) => (
          <ProjectCards p={p} />
        ))}
      </div>
    </div>
  );
};

export default PlotList;
