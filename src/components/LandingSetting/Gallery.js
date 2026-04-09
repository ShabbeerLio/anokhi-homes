import React, { useEffect, useState } from 'react'
import LandingCard from './LandingCard'
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import Icon2 from "../../Assets/icons/Liasoning Services.png"
import Icon3 from "../../Assets/icons/Property Services.png"
import Icon4 from "../../Assets/icons/Construction Services.png"
import AddLocationModal from '../Modals/AddLocationModal'
import { LucidePlus } from 'lucide-react'

const Gallery = ({ setAlert }) => {
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
    gallery: [
      { id: 1, image: Icon1, alt: "Gallery Image 1" },
      { id: 2, image: Icon2, alt: "Gallery Image 1" },
      { id: 3, image: Icon3, alt: "Gallery Image 1" },
      { id: 4, image: Icon4, alt: "Gallery Image 1" },
    ],
  });

  const handleSave = () => {
    if (type === "gallery") {
      if (isEditMode) {
        setHomePageData((prev) => ({
          ...prev,
          gallery: prev.gallery.map((item) =>
            item.id === selectedItem.id
              ? { ...item, image: formData.preview || item.image }
              : item
          ),
        }));
      } else {
        setHomePageData((prev) => ({
          ...prev,
          gallery: [
            ...prev.gallery,
            {
              id: Date.now(),
              image: formData.preview,
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
    if (section === "gallery") {
      setHomePageData((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((item) => item.id !== id),
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
        <h4>Gallery</h4>
        <div className="page-tools">
          <button
            className="add-button"
            onClick={() => handleAdd("gallery")}
          >
            <LucidePlus /> Add
          </button>
        </div>
      </div>
      <div className="user-card-box">
        {homePageData.gallery.map((p) => (
          <LandingCard
            key={p.id}
            p={p}
            action="delete"
            onEdit={() => handleEdit("gallery", p)}
            onDelete={() => handleDelete("gallery", p.id)}
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
          {type === "gallery" && (
            <>
              <input type="file" name="image" onChange={handleChange} />
              <input
                name="title"
                value={formData.alt || ""}
                onChange={handleChange}
                placeholder="Alt Tag"
              />

              {(formData.preview || formData.image) && (
                <img src={formData.preview || formData.image} width="100" />
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
    </>
  )
}

export default Gallery
