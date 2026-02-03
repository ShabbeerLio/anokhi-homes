import React, { useState } from "react";
import "./Plot.css";
import ProjectCards from "../../components/Cards/ProjectCards";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";

const PlotList = ({ mood }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="plot-container">
            <div className="table-filters">
                <h2>Trending Locations</h2>
                <div className="page-tools">
                    <SearchItems />
                    {mood === "admin" && (
                        <button className="add-button" onClick={() => setOpen(true)}>
                            <LucidePlus />
                        </button>
                    )}
                </div>
            </div>
            <Breadcrumb />

            <div className="plot-grid ">
                {ProjectData.map((p) => (
                    <ProjectCards p={p} />
                ))}
            </div>
            {/* ADD LOCATION MODAL */}
            <AddLocationModal open={open} onClose={() => setOpen(false)} title="Add Location">
                <div className="field">
                    <label>Location Name</label>
                    <input placeholder="Location Name" />
                </div>
                <div className="field">
                    <label>Image URL</label>
                    <input placeholder="Image URL" />
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea placeholder="Description" />
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="modal-actions">
                    <button onClick={() => setOpen(false)}>Add Location</button>
                </div>
            </AddLocationModal>
        </div>
    );
};

export default PlotList;
