import React, { useEffect, useState } from 'react'
import LandingCard from './LandingCard'
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import Icon2 from "../../Assets/icons/Liasoning Services.png"
import Icon3 from "../../Assets/icons/Property Services.png"
import Icon4 from "../../Assets/icons/Construction Services.png"
import { LucidePlus } from 'lucide-react'
import NiEdit from '../../icons/ni-edit'
import NiDelete from '../../icons/ni-delete'
import AddLocationModal from '../Modals/AddLocationModal'

const Home = ({ setAlert }) => {

    const [open, setOpen] = useState(false);
    const [type, setType] = useState(""); // "banner" | "service" | "testimonial"
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [visibleCount, setVisibleCount] = useState(5);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
                preview: URL.createObjectURL(file), // for preview
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
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
        banner: {
            title: "Build Beautiful Applications",
            description:
                "Components, plugins, blocks, and layouts built with MUI, styled with Tailwind, and packaged with Vite in a beautiful harmony.",
        },

        services: [
            {
                id: 1,
                title: "Plot Sale Services",
                image: Icon1,
            },
            {
                id: 2,
                title: "Liasoning Services",
                image: Icon2,
            },
            {
                id: 3,
                title: "Property Services",
                image: Icon3,
            },
            {
                id: 4,
                title: "Construction Services",
                image: Icon4,
            },
        ],

        testimonials: [
            {
                id: 1,
                name: "Rahul Sharma",
                position: "Investor",
                image: Icon1,
                content:
                    "Excellent service and smooth experience in buying plots. Highly recommended!",
            },
            {
                id: 2,
                name: "Amit Verma",
                position: "Business Owner",
                image: Icon2,
                content:
                    "Very professional team with great support throughout the process.",
            },
            {
                id: 3,
                name: "Sneha Gupta",
                position: "Home Buyer",
                image: Icon3,
                content:
                    "Helped me find the perfect property. Trustworthy and transparent.",
            },
            {
                id: 3,
                name: "Sneha Gupta",
                position: "Home Buyer",
                image: Icon3,
                content:
                    "Helped me find the perfect property. Trustworthy and transparent.",
            },
            {
                id: 3,
                name: "Sneha Gupta",
                position: "Home Buyer",
                image: Icon3,
                content:
                    "Helped me find the perfect property. Trustworthy and transparent.",
            },
            {
                id: 3,
                name: "Sneha Gupta",
                position: "Home Buyer",
                image: Icon3,
                content:
                    "Helped me find the perfect property. Trustworthy and transparent.",
            },
            {
                id: 3,
                name: "Sneha Gupta",
                position: "Home Buyer",
                image: Icon3,
                content:
                    "Helped me find the perfect property. Trustworthy and transparent.",
            },
        ],
    });

    const handleSave = () => {
        if (type === "service") {
            if (isEditMode) {
                setHomePageData((prev) => ({
                    ...prev,
                    services: prev.services.map((item) =>
                        item.id === selectedItem.id
                            ? { ...item, ...formData, image: formData.preview || item.image }
                            : item
                    ),
                }));
            } else {
                setHomePageData((prev) => ({
                    ...prev,
                    services: [
                        ...prev.services,
                        {
                            id: Date.now(),
                            ...formData,
                            image: formData.preview,
                        },
                    ],
                }));
            }
        }

        if (type === "testimonial") {
            if (isEditMode) {
                setHomePageData((prev) => ({
                    ...prev,
                    testimonials: prev.testimonials.map((item) =>
                        item.id === selectedItem.id
                            ? { ...item, ...formData, image: formData.preview || item.image }
                            : item
                    ),
                }));
            } else {
                setHomePageData((prev) => ({
                    ...prev,
                    testimonials: [
                        ...prev.testimonials,
                        {
                            id: Date.now(),
                            ...formData,
                            image: formData.preview,
                        },
                    ],
                }));
            }
        }

        if (type === "banner") {
            setHomePageData((prev) => ({
                ...prev,
                banner: { ...prev.banner, ...formData },
            }));
        }

        setAlert({
            message: `${isEditMode ? "Updated" : "Added"} successfully!`,
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
        setFormData({});
        setOpen(false);
    };

    const handleDelete = (section, id) => {
        if (section === "service") {
            setHomePageData((prev) => ({
                ...prev,
                services: prev.services.filter((item) => item.id !== id),
            }));
        }

        if (section === "testimonial") {
            setHomePageData((prev) => ({
                ...prev,
                testimonials: prev.testimonials.filter((item) => item.id !== id),
            }));
        }

        setAlert({
            message: "Deleted successfully!",
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <>
            <h4>Banner</h4>
            <LandingCard
                p={homePageData.banner}
                onEdit={() => handleEdit("banner", homePageData.banner)}
            />
            <div className="table-filters">
                <h4>Services</h4>
                <div className="page-tools">
                    <button
                        className="add-button"
                        onClick={() => handleAdd("service")}
                    >
                        <LucidePlus /> Add
                    </button>
                </div>
            </div>
            <div className="user-card-box">
                {homePageData.services.map((service) => (
                    <LandingCard
                        key={service.id}
                        p={service}
                        action="delete"
                        onEdit={() => handleEdit("service", service)}
                        onDelete={() => handleDelete("service", service.id)}
                    />
                ))}
            </div>
            <div className="table-filters">
                <h4>Testimonial</h4>
                <div className="page-tools">
                    <button
                        className="add-button"
                        onClick={() => handleAdd("testimonial")}
                    >
                        <LucidePlus /> Add
                    </button>
                </div>
            </div>
            <div className="">
                {homePageData.testimonials.slice(0, visibleCount).map((p) => (
                    <div className="Testimonial-card plot-card card" style={{ marginBottom: "1rem" }}>
                        <div className="Testimonial-img">
                            <img src={p.image} alt="" />
                            <div className="testimonial-title">
                                <h3>{p.name}</h3>
                                <p>{p.position}</p>
                            </div>
                        </div>
                        <div className="Testimonial-details">
                            <p>{p.content}</p>
                        </div>
                        <div className="plot-card-actions dots">
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit("testimonial", p)
                                }}
                            >
                                <NiEdit />
                            </span>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete("testimonial", p.id)
                                }}
                            >
                                <NiDelete />
                            </span>
                        </div>
                    </div>
                ))}
                <div className="table-filters" style={{ justifyContent:"center"}}>
                    <div className="page-tools" >
                        {visibleCount < homePageData.testimonials.length && (
                            <div >
                                <button
                                    className="add-button"
                                    onClick={() => setVisibleCount((prev) => prev + 5)}
                                >
                                    View More
                                </button>
                            </div>
                        )}
                    </div>
                </div>

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
                    {type === "service" && (
                        <>
                            <input type="file" name="image" onChange={handleChange} />
                            <input
                                name="title"
                                value={formData.title || ""}
                                onChange={handleChange}
                                placeholder="Service Title"
                            />

                            {formData.preview && <img src={formData.preview} width="80" />}
                        </>
                    )}

                    {type === "testimonial" && (
                        <>
                            <input type="file" name="image" onChange={handleChange} />
                            <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
                            <input name="position" value={formData.position || ""} onChange={handleChange} placeholder="Position" />
                            <textarea name="content" value={formData.content || ""} onChange={handleChange} placeholder="Feedback" />

                            {formData.preview && <img src={formData.preview} width="80" />}
                        </>
                    )}

                    {type === "banner" && (
                        <>
                            <input name="title" value={formData.title || ""} onChange={handleChange} />
                            <textarea name="description" value={formData.description || ""} onChange={handleChange} />
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
        </>
    )
}

export default Home
