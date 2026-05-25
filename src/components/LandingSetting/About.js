import React, { useEffect, useState } from "react";
import LandingCard from "./LandingCard";
import Icon1 from "../../Assets/icons/Plot Sale Services.png";
import AddLocationModal from "../Modals/AddLocationModal";
import { updateAbout, uploadImage } from "../../Pages/LandingSetting/LandingApi";
import { useDispatch } from "react-redux";
import { getLandingPage } from "../../Redux/Slices/AppSlices";

const About = ({ data, setAlert }) => {
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

//   console.log(data, "data");
  const [homePageData, setHomePageData] = useState({
    about: {},
    mission: {},
    vision: {},
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
        about: { ...homePageData.about },
        mission: { ...homePageData.mission },
        vision: { ...homePageData.vision },
      };

      // ================= ABOUT =================

      if (type === "about") {
        updatedData.about = {
          ...updatedData.about,
          ...formData,
          image: uploadedImage.url || updatedData.about.image,
        };
      }

      // ================= MISSION =================

      if (type === "mission") {
        updatedData.mission = {
          ...updatedData.mission,
          ...formData,
        };
      }

      // ================= VISION =================

      if (type === "vision") {
        updatedData.vision = {
          ...updatedData.vision,
          ...formData,
        };
      }

      await updateAbout(updatedData);
      setHomePageData(updatedData);
      dispatch(getLandingPage());

      setAlert({
        message: "Updated successfully!",
        status: "Success",
      });

      setTimeout(() => setAlert(null), 3000);

      setFormData({});
      setOpen(false);
    } catch (error) {
      console.log(error);

      setAlert({
        message: "Failed to update",
        status: "Error",
      });

      setTimeout(() => setAlert(null), 3000);
    }
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
        title={isEditMode ? `Edit ${type}` : `Add ${type}`}
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
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </>
          )}

          {type === "vision" && (
            <>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
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

export default About;
