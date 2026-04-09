import React, { useEffect, useState } from 'react'
import LandingCard from './LandingCard'
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import AddLocationModal from '../Modals/AddLocationModal'

const About = ({ setAlert }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({});

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
        about: {
            image: Icon1,
            title: "Build Beautiful Applications",
            description:
                "Components, plugins, blocks, and layouts built with MUI, styled with Tailwind, and packaged with Vite in a beautiful harmony.",
            subdescription:
                "2Components, plugins, blocks, and layouts built with MUI, styled with Tailwind, and packaged with Vite in a beautiful harmony.",
        },
        mission: {
            description:
                "hfComponents, plugins, blocks, and layouts built with MUI, styled with Tailwind, and packaged with Vite in a beautiful harmony.",
        },
        vision: {
            description:
                "asdadComponents, plugins, blocks, and layouts built with MUI, styled with Tailwind, and packaged with Vite in a beautiful harmony.",
        },
    });

    const handleSave = () => {
        if (type === "about") {
            setHomePageData((prev) => ({
                ...prev,
                about: {
                    ...prev.about,
                    ...formData,
                    image: formData.preview || prev.about.image,
                },
            }));
        }

        if (type === "mission") {
            setHomePageData((prev) => ({
                ...prev,
                mission: {
                    ...prev.mission,
                    ...formData,
                },
            }));
        }

        if (type === "vision") {
            setHomePageData((prev) => ({
                ...prev,
                vision: {
                    ...prev.vision,
                    ...formData,
                },
            }));
        }

        setAlert({
            message: "Updated successfully!",
            status: "Success",
        });

        setTimeout(() => setAlert(null), 3000);
        setFormData({});
        setOpen(false);
    };

    return (
        <>
            <h4>About</h4>
            <LandingCard
                p={homePageData.about}
                onEdit={() => handleEdit("about", homePageData.about)}
            />
            <h4>Our Mission</h4>
            <LandingCard
                p={homePageData.mission}
                onEdit={() => handleEdit("mission", homePageData.mission)}
            />
            <h4>Our Vision</h4>
            <LandingCard
                p={homePageData.vision}
                onEdit={() => handleEdit("vision", homePageData.vision)}
            />
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
                    {type === "about" && (
                        <>
                            <input type="file" name="image" onChange={handleChange} />
                            <input
                                name="title"
                                value={formData.title || ""}
                                onChange={handleChange}
                                placeholder="Service Title"
                            />
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                                placeholder="Service Description"
                            />
                            <textarea
                                name="subdescription"
                                value={formData.subdescription || ""}
                                onChange={handleChange}
                                placeholder="Service Sub-Description"
                            />

                            {formData.preview && <img src={formData.preview} width="80" />}
                        </>
                    )}

                    {type === "mission" && (
                        <>
                            <textarea name="description" value={formData.description || ""} onChange={handleChange} />
                        </>
                    )}

                    {type === "vision" && (
                        <>
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

export default About
