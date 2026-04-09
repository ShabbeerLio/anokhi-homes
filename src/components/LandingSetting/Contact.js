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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
        address: [
            {
                id: 1,
                title: "Head Office",
                content: "406,4th Floor, Pandey Plaza, Exhibition Road, Patna - 800001",
                phone: "+919876543210",
            },
            {
                id: 2,
                title: "Branch Office 1",
                content: "Basement of Najo Bazar, JK Tower, Qamaruddin Gunj, Biharsharif, Nalanda - 803101",
            },
            {
                id: 3,
                title: "Branch Office 2",
                content: "Beside Prabha Inn, Baitarani Road Rajgir, Nalanda, Bihar - 803116",
                phone: "+919876543210",
            },
        ],

    });

    const handleSave = () => {
        if (type === "address") {
            if (isEditMode) {
                setHomePageData((prev) => ({
                    ...prev,
                    address: prev.address.map((item) =>
                        item.id === selectedItem.id
                            ? { ...item, ...formData }
                            : item
                    ),
                }));
            } else {
                setHomePageData((prev) => ({
                    ...prev,
                    address: [
                        ...prev.address,
                        {
                            id: Date.now(),
                            ...formData,
                        },
                    ],
                }));
            }
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
        if (section === "address") {
            setHomePageData((prev) => ({
                ...prev,
                address: prev.address.filter((item) => item.id !== id),
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
            <div className="table-filters">
                <h4>Contact</h4>
                <div className="page-tools">
                    <button
                        className="add-button"
                        onClick={() => handleAdd("address")}
                    >
                        <LucidePlus /> Add
                    </button>
                </div>
            </div>
            <div className="user-card-box">
                {homePageData.address.map((address) => (
                    <LandingCard
                        key={address.id}
                        p={address}
                        action="delete"
                        onEdit={() => handleEdit("address", address)}
                        onDelete={() => handleDelete("address", address.id)}
                    />
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
                    {type === "address" && (
                        <>
                            <input
                                name="title"
                                value={formData.title || ""}
                                onChange={handleChange}
                                placeholder="Office Title"
                            />
                            <input
                                name="title"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                placeholder="Office Phone"
                            />

                            <textarea
                                name="content"
                                value={formData.content || ""}
                                onChange={handleChange}
                                placeholder="Office Address"
                            />
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
