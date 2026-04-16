import React, { useEffect, useState } from "react";
import LandingCard from "./LandingCard";
import Icon1 from "../../Assets/icons/Plot Sale Services.png";
import Icon2 from "../../Assets/icons/Liasoning Services.png";
import Icon3 from "../../Assets/icons/Property Services.png";
import Icon4 from "../../Assets/icons/Construction Services.png";
import { LucidePlus } from "lucide-react";
import NiEdit from "../../icons/ni-edit";
import NiDelete from "../../icons/ni-delete";
import AddLocationModal from "../Modals/AddLocationModal";

const Home = ({ setAlert }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(""); // "banner" | "service" | "testimonial"
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
    contact: [
      {
        id: 1,
        title: "Phone Number",
        content: "+91 1234567890",
      },
      {
        id: 2,
        title: "Email Address",
        content: "anokhihomesprivetlimted@gmail.com",
      },
      {
        id: 3,
        title: "Location",
        content: "Patna, Bihar",
      },
    ],
    socialmedia: [
      {
        id: 4,
        title: "Youtube",
        content: "https://www.youtube.com",
      },
      {
        id: 3,
        title: "Instagram",
        content: "https://www.instagram.com",
      },
      {
        id: 1,
        title: "Facebook",
        content: "https://www.facebook.com",
      },
      {
        id: 2,
        title: "Twitter",
        content: "https://www.twitter.com",
      },
      {
        id: 4,
        title: "LinkedIn",
        // content: "https://www.linkedin.com",
      },
    ],
  });

  const handleSave = () => {
    if (type === "contact" || type === "socialmedia") {
      if (isEditMode) {
        setHomePageData((prev) => ({
          ...prev,
          [type]: prev[type].map((item) =>
            item.id === selectedItem.id ? { ...item, ...formData } : item,
          ),
        }));
      } else {
        setHomePageData((prev) => ({
          ...prev,
          [type]: [
            ...prev[type],
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
        <h4>Contact</h4>
        {/* <div className="page-tools">
          <button className="add-button" onClick={() => handleAdd("contact")}>
            <LucidePlus /> Add
          </button>
        </div> */}
      </div>
      <div className="user-card-box">
        {homePageData.contact.map((contact) => (
          <LandingCard
            key={contact.id}
            p={contact}
            // action="delete"
            onEdit={() => handleEdit("contact", contact)}
            onDelete={() => handleDelete("contact", contact.id)}
          />
        ))}
      </div>
      <div className="table-filters">
        <h4>Social Media</h4>
        {/* <div className="page-tools">
          <button
            className="add-button"
            onClick={() => handleAdd("socialmedia")}
          >
            <LucidePlus /> Add
          </button>
        </div> */}
      </div>
      <div className="user-card-box">
        {homePageData.socialmedia.map((socialmedia) => (
          <LandingCard
            key={socialmedia.id}
            p={socialmedia}
            onEdit={() => handleEdit("socialmedia", socialmedia)}
            onDelete={() => handleDelete("socialmedia", socialmedia.id)}
          />
        ))}
      </div>

      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title={isEditMode ? `Edit ${type}` : `Add ${type}`}
      >
        <div className="field">
          {type === "contact" && (
            <>
              <input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Office Title"
              />

              <textarea
                name="content"
                value={formData.content || ""}
                onChange={handleChange}
                placeholder="Office Address"
              />
            </>
          )}
          {type === "socialmedia" && (
            <>
              <input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Platform (e.g. Facebook)"
                disabled
              />

              <input
                name="content"
                value={formData.content || ""}
                onChange={handleChange}
                placeholder="Profile URL"
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
  );
};

export default Home;
