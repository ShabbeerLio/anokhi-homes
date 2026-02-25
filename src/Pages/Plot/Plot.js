import React, { useState } from "react";
import "./Plot.css";
import ProjectCards from "../../components/Cards/ProjectCards";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";

const PlotList = ({ mood }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState();
    return (
        <div className="plot-container">
            <div className="table-filters">
                <div className="page-head-title">
                    <h2>Trending Locations</h2>
                    <Breadcrumb />
                </div>
                <div className="page-tools">
                    <div className="searchItem">
                        <NiSearch />
                        <input
                            placeholder="Search Location..."
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
