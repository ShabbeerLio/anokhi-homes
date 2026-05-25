import React, { useEffect, useState } from 'react'
import LandingCard from './LandingCard'
import Icon1 from "../../Assets/icons/Plot Sale Services.png"
import Icon2 from "../../Assets/icons/Liasoning Services.png"
import Icon3 from "../../Assets/icons/Property Services.png"
import Icon4 from "../../Assets/icons/Construction Services.png"
import AddLocationModal from '../Modals/AddLocationModal'
import { LucidePlus } from 'lucide-react'
import { deleteGallery, updateGallery, uploadImage } from '../../Pages/LandingSetting/LandingApi'
import { getLandingPage } from '../../Redux/Slices/AppSlices'
import { useDispatch } from 'react-redux'

const Gallery = ({ data, setAlert }) => {
  const dispatch = useDispatch();
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
    gallery: [],
  });

  useEffect(() => {
    if (data) {
      setHomePageData(data);
    }
  }, [data]);

  const handleSave = async () => {
    const uploadedImage = await uploadImage(formData.image);

    try {
      let updatedData = {
        ...homePageData,
        gallery: [...(homePageData.gallery || [])],
      };
      if (type === "gallery") {
        let uploadedImage = null;
        if (formData.image instanceof File) {
          uploadedImage = await uploadImage(formData.image);
        }

        if (isEditMode) {
          updatedData.gallery =
            updatedData.gallery.map((item) =>
              item._id === selectedItem._id
                ? {
                  ...item,
                  image:
                    uploadedImage?.url ||
                    item.image,
                  alt:
                    formData.alt || item.alt,
                }
                : item
            );

        } else {
          updatedData.gallery.push({
            image: uploadedImage.url,
            alt: formData.alt,
          });
        }
      }
      await updateGallery(updatedData);
      setHomePageData(updatedData);
      dispatch(getLandingPage());
      setAlert({
        message: `${isEditMode ? "Updated" : "Added"} successfully!`,
        status: "Success",
      });
      setTimeout(() => setAlert(null), 3000);
      setOpen(false);
      setFormData({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (section, id) => {
    if (section === "gallery") {
      setHomePageData((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((item) => item._id !== id),
      }));
    }
    await deleteGallery(id);
    dispatch(getLandingPage());
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
            key={p._id}
            p={p}
            action="delete"
            onEdit={() => handleEdit("gallery", p)}
            onDelete={() => handleDelete("gallery", p._id)}
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
                name="alt"
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
