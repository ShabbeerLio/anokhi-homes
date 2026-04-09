import React, { useEffect, useState } from 'react'
import LandingCard from './LandingCard'
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import Icon2 from "../../Assets/icons/Liasoning Services.png"
import Icon3 from "../../Assets/icons/Property Services.png"
import Icon4 from "../../Assets/icons/Construction Services.png"
import AddLocationModal from '../Modals/AddLocationModal'
import { LucidePlus } from 'lucide-react'
import ViewModal from '../Modals/ViewModal'
import NiDelete from '../../icons/ni-delete'
import NiEdit from '../../icons/ni-edit'

const Gallery = ({ setAlert }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [previewPdf, setPreviewPdf] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreviewPdf = (file) => {
        setPreviewPdf(file);
        setPreviewOpen(true);
    };

    const handleChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (!file) return;

        // IMAGE (thumbnail)
        if (type === "thumbnail") {
            setFormData((prev) => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(file),
            }));
        }

        // PDF
        if (type === "pdf") {
            setFormData((prev) => ({
                ...prev,
                file: file,
                fileName: file.name,
            }));
        }
    };

    useEffect(() => {
        if (selectedItem) {
            setFormData(selectedItem);
        } else {
            setFormData({});
        }
    }, [selectedItem]);

    const handleAdd = (section) => {
        setType(section);
        setSelectedItem(null);
        setIsEditMode(false);
        setOpen(true);
    };

    const handleEdit = (section, item) => {
        setType(section);
        setSelectedItem(item);
        setIsEditMode(true);
        setOpen(true);
    };

    const [homePageData, setHomePageData] = useState({
        thumbnail: [
            { id: 1, image: Icon1 },
            { id: 2, image: Icon2 },
            { id: 3, image: Icon3 },
            { id: 4, image: Icon4 },
        ],
        pdf: [
            { id: 1, image: Icon1 },
            { id: 2, image: Icon2 },
            { id: 3, image: Icon3 },
            { id: 4, image: Icon4 },
        ],
    });

    const handleSave = () => {
        if (type === "thumbnail" || type === "pdf") {
            if (isEditMode) {
                setHomePageData((prev) => ({
                    ...prev,
                    [type]: prev[type].map((item) =>
                        item.id === selectedItem.id
                            ? {
                                ...item,
                                ...(type === "thumbnail" && {
                                    image: formData.preview || item.image,
                                }),
                                ...(type === "pdf" && {
                                    file: formData.file || item.file,
                                    fileName: formData.fileName || item.fileName,
                                }),
                            }
                            : item
                    ),
                }));
            } else {
                setHomePageData((prev) => ({
                    ...prev,
                    [type]: [
                        ...prev[type],
                        {
                            id: Date.now(),
                            ...(type === "thumbnail" && {
                                image: formData.preview,
                            }),
                            ...(type === "pdf" && {
                                file: formData.file,
                                fileName: formData.fileName,
                            }),
                        },
                    ],
                }));
            }
        }
        console.log(homePageData,"homePageData")

        setAlert({
            message: `${isEditMode ? "Updated" : "Added"} successfully!`,
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
        setFormData({});
        setOpen(false);
    };

    const handleDelete = (section, id) => {
        setHomePageData((prev) => ({
            ...prev,
            [section]: prev[section].filter((item) => item.id !== id),
        }));

        setAlert({
            message: "Deleted successfully!",
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <>
            <div className="table-filters">
                <h4>Thumbnail</h4>
                <div className="page-tools">
                    <button
                        className="add-button"
                        onClick={() => handleAdd("thumbnail")}
                    >
                        <LucidePlus /> Add
                    </button>
                </div>
            </div>
            <div className="user-card-box">
                {homePageData.thumbnail.map((p) => (
                    <LandingCard
                        key={p.id}
                        p={p}
                        action="delete"
                        onEdit={() => handleEdit("thumbnail", p)}
                        onDelete={() => handleDelete("thumbnail", p.id)}
                    />
                ))}
            </div>
            <div className="table-filters">
                <h4>PDF</h4>
                <div className="page-tools">
                    <button
                        className="add-button"
                        onClick={() => handleAdd("pdf")}
                    >
                        <LucidePlus /> Add
                    </button>
                </div>
            </div>
            <div className="user-card-box">
                {homePageData.pdf.map((p) => (
                    <div
                        key={p.id}
                        className="plot-card card"
                        onClick={() => handlePreviewPdf(p.file)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="plot-details">
                            <h3>📄 {p.fileName || "PDF File"}</h3>
                            <p>Click to preview</p>
                        </div>

                        <div className="plot-card-actions dots">
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit("pdf", p);
                                }}
                            >
                                <NiEdit />
                            </span>

                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete("pdf", p.id);
                                }}
                            >
                                <NiDelete />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <AddLocationModal
                open={open}
                onClose={() => setOpen(false)}
                title={
                    isEditMode
                        ? `Edit ${type}`
                        : `Add ${type}`
                }
            >
                <div className="field">
                    {type === "thumbnail" && (
                        <>
                            <input type="file" accept="image/*" onChange={handleChange} />

                            {(formData.preview || formData.image) && (
                                <img src={formData.preview || formData.image} width="100" />
                            )}
                        </>
                    )}
                    {type === "pdf" && (
                        <>
                            <input type="file" accept="application/pdf" onChange={handleChange} />

                            {(formData.fileName || selectedItem?.fileName) && (
                                <p>📄 {formData.fileName || selectedItem?.fileName}</p>
                            )}
                        </>
                    )}
                </div>
                <div className="modal-actions">
                    <button
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        {isEditMode ? "Update " : "Add"}
                    </button>
                </div>
            </AddLocationModal>
            <ViewModal
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                title={previewOpen}
            >
                <div className="user-card-bottom view-box">
                    {previewPdf && (
                        <iframe
                            src={URL.createObjectURL(previewPdf)}
                            title="PDF Preview"
                            width="100%"
                            height="600px"
                        />
                    )}
                </div>
            </ViewModal>

        </>
    )
}

export default Gallery
