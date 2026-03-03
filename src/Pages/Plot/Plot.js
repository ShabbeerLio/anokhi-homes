import React, { useEffect, useState } from "react";
import "./Plot.css";
import ProjectCards from "../../components/Cards/ProjectCards";
import ProjectData from "./PlotData";
import SearchItems from "../../components/SearchItems/SearchItems";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";

const PlotList = ({ mood, setAlert }) => {
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [search, setSearch] = useState();

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        desc: "",
        img: "",
    });

    useEffect(() => {
        if (selectedLocation) {
            setFormData(selectedLocation);
        } else {
            setFormData({
                id: "",
                title: "",
                desc: "",
                img: "",
            });
        }
    }, [selectedLocation]);

    const handleAddLocation = () => {
        console.log("Adding location:", formData);
        setOpen(false);
        setAlert({ message: "Location added successfully!", status: "Success" });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };
    const handleEditLocation = () => {
        console.log("Editing location:", formData);
        setOpen(false);
        setAlert({ message: "Location updated successfully!", status: "Success" });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

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
                    <ProjectCards
                        p={p}
                        setSelectedLocation={setSelectedLocation}
                        setIsEditMode={setIsEditMode}
                        setOpen={setOpen}
                        mood={mood} 
                        setAlert={setAlert}
                        />
                        
                ))}
            </div>
            {/* ADD LOCATION MODAL */}
            <AddLocationModal
                open={open}
                onClose={() => setOpen(false)}
                title={isEditMode ? "Edit Location" : "Add Location"}
            >
                <div className="field">
                    <label>Location Name</label>
                    <input
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Location Name"
                    />
                </div>
                <div className="field">
                    <label>Image URL</label>
                    <input
                        value={formData.img}
                        onChange={(e) =>
                            setFormData({ ...formData, img: e.target.value })
                        }
                        placeholder="Image URL"
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea
                        value={formData.desc}
                        onChange={(e) =>
                            setFormData({ ...formData, desc: e.target.value })
                        }
                        placeholder="Description"
                    />
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="modal-actions">
                    <button onClick={isEditMode ? handleEditLocation : handleAddLocation}>
                        {isEditMode ? "Update Location" : "Add Location"}
                    </button>
                </div>
            </AddLocationModal>
        </div>
    );
};

export default PlotList;
