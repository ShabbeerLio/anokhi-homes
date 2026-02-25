import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Plot.css";
import PlotCard from "../../components/Cards/PlotCard";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";
import { ChevronLeft, LucidePlus } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";

const Projects = ({ mood }) => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();

  const plot = ProjectData.find((p) => p.id === plotId);

  if (!plot) return <p>Plot not found</p>;

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <div className="page-tools">
            <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
            <h2>{plot.title} Projects</h2>
          </div>
            <Breadcrumb />
        </div>
        <div className="page-tools">
          <div className="searchItem">
            <NiSearch />
            <input
              placeholder="Search Project..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {mood === "admin" && (
            <button className="add-button" onClick={() => setOpen(true)}>
              <LucidePlus /> Add
            </button>
          )}
        </div>
      </div>

      <div className="plot-grid ">
        {plot.plots.map((p) => (
          <PlotCard p={p} plotId={plotId} />
        ))}
      </div>

      {/* ADD PLOT MODAL */}
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Plot"
      >
        <div className="field">
          <label>Plot Name</label>
          <input placeholder="Plot Name" />
        </div>
        <div className="field">
          <label>Image URL</label>
          <input placeholder="Image URL" />
        </div>
        <div className="field">
          <label>Price Range</label>
          <input placeholder="Price (₹)" />
        </div>
        <div className="field">
          <label>Area in sqft</label>
          <input placeholder="Area (sqft)" />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea placeholder="Details" />
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button onClick={() => setOpen(false)}>Add Plot</button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default Projects;
