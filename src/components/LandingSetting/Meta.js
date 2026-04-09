import React, { useState } from "react";
import NiEdit from "../../icons/ni-edit";

const Meta = ({ setAlert }) => {
    const [activePage, setActivePage] = useState("home");
    const [isEditing, setIsEditing] = useState(false);

    const [metaData, setMetaData] = useState({
        home: { title: "Home Title", description: "Home Description", keywords: "Home Keywords", canonical: "Home Canonical" },
        about: { title: "About Title", description: "About Description", keywords: "About Keywords", canonical: "About Canonical" },
        gallery: { title: "Gallery Title", description: "Gallery Description", keywords: "Gallery Keywords", canonical: "Gallery Canonical" },
        documents: { title: "Documents Title", description: "Documents Description", keywords: "Documents Keywords", canonical: "Documents Canonical" },
        contact: { title: "Contact Title", description: "Contact Description", keywords: "Contact Keywords", canonical: "Contact Canonical" },
    });

    const [formData, setFormData] = useState(metaData.home);

    // switch page
    const handleTabChange = (page) => {
        setActivePage(page);
        setFormData(metaData[page]);
    };

    // input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // save
    const handleSave = () => {
        setMetaData((prev) => ({
            ...prev,
            [activePage]: formData,
        }));

        setIsEditing(false);

        setAlert({
            message: "Meta saved successfully!",
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
    };
    const handleEdit = () => {
        setIsEditing(true);
        setFormData(metaData[activePage]); // load current data
    };

    return (
        <>
            <div className="table-filters">
                <h4>SEO Meta Data</h4>
                <div className="page-tools">
                    {Object.keys(metaData).map((page) => (
                        <button
                            key={page}
                            className={activePage === page ? "active" : ""}
                            onClick={() => handleTabChange(page)}
                        >
                            {page.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <h4>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h4>
            <div className="plot-card card">
                <div className="plot-details meta-details">

                    {/* TITLE */}
                    <p className="plot-modal">
                        <strong>Title : </strong>

                        {isEditing ? (
                            <div className="field">
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <span>{metaData[activePage].title || "-"}</span>
                        )}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="plot-modal">
                        <strong>Meta Description : </strong>

                        {isEditing ? (
                            <div className="field">

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <span>{metaData[activePage].description || "-"}</span>
                        )}
                    </p>

                    {/* KEYWORDS */}
                    <p className="plot-modal">
                        <strong>Meta Keywords : </strong>

                        {isEditing ? (
                            <div className="field">

                                <input
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <span>{metaData[activePage].keywords || "-"}</span>
                        )}
                    </p>

                    {/* CANONICAL */}
                    <p className="plot-modal">
                        <strong>Canonical : </strong>

                        {isEditing ? (
                            <div className="field">

                                <input
                                    name="canonical"
                                    value={formData.canonical}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <span>{metaData[activePage].canonical || "-"}</span>
                        )}
                    </p>

                </div>
                <div className="plot-card-actions dots">
                    {!isEditing ? (
                        <span onClick={handleEdit}>
                            <NiEdit />
                        </span>
                    ) : (
                        <>
                        </>
                    )}
                </div>
                {isEditing && (
                    <div className="modal-actions">
                        <button
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Meta;
