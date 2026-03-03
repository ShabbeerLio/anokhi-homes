import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Plot.css";
import PlotCard from "../../components/Cards/PlotCard";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";
import { ChevronLeft, LucidePlus } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";

const Projects = ({ mood, setAlert }) => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    area: "",
    details: "",
    img: "",
  });
  useEffect(() => {
    if (selectedProject) {
      setFormData(selectedProject);
    } else {
      setFormData({
        id: "",
        name: "",
        price: "",
        area: "",
        details: "",
        img: "",
      });
    }
  }, [selectedProject]);

  const handleAddPlots = () => {
    console.log("Adding plot:", formData);
    setOpen(false);
    setAlert({ message: "Plot added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditPlots = () => {
    console.log("Editing plot:", formData);
    setOpen(false);
    setAlert({ message: "Plot updated successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

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
          <PlotCard
            p={p}
            plotId={plotId}
            mood={mood}
            setSelectedProject={setSelectedProject}
            setIsEditMode={setIsEditMode}
            setOpen={setOpen}
            setAlert={setAlert}
          />
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
