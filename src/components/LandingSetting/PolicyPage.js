import React, { useState } from "react";
import NiEdit from "../../icons/ni-edit";
import NiDelete from "../../icons/ni-delete";
import { LucidePlus } from "lucide-react";

const PolicyPage = ({ setAlert }) => {
  const [activeType, setActiveType] = useState("privacy");
  const [isEditing, setIsEditing] = useState(false);

  const [PolicyData, setPolicyData] = useState({
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "05 Jan 2026",
      sections: [
        {
          id: 1,
          heading: "Introduction",
          content:
            "We value your privacy and are committed to protecting your personal information.",
        },
        {
          id: 2,
          heading: "Information We Collect",
          content:
            "We may collect personal details such as name, email, phone number, and usage data.",
        },
        {
          id: 3,
          heading: "How We Use Information",
          content:
            "We use your information to improve our services and provide better user experience.",
        },
      ],
    },

    termcondition: {
      title: "Terms & Conditions",
      lastUpdated: "07 Jan 2026",
      sections: [
        {
          id: 4,
          heading: "Acceptance of Terms",
          content:
            "By using our website, you agree to comply with our terms and conditions.",
        },
        {
          id: 5,
          heading: "User Responsibilities",
          content:
            "Users must provide accurate information and use the platform legally.",
        },
        {
          id: 6,
          heading: "Limitation of Liability",
          content:
            "We are not responsible for any indirect damages arising from usage.",
        },
      ],
    },

    cancellationrefund: {
      title: "Cancellation & Refund Policy",
      lastUpdated: "03 Feb 2026",
      sections: [
        {
          id: 7,
          heading: "Cancellation Policy",
          content: "Users can cancel services within 24 hours of booking.",
        },
        {
          id: 8,
          heading: "Refund Policy",
          content:
            "Refunds will be processed within 7 working days after approval.",
        },
        {
          id: 9,
          heading: "Non-Refundable Cases",
          content: "Certain services are non-refundable once initiated.",
        },
      ],
    },
  });

  const [formData, setFormData] = useState(null);

  // 👉 Switch page
  const handleTabChange = (type) => {
    setActiveType(type);
    setIsEditing(false);
    setFormData(null);
  };

  // 👉 Edit section
  const handleEdit = (section) => {
    setIsEditing(true);
    setFormData(section);
  };

  // 👉 Change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👉 Save section
  const handleSave = () => {
    setPolicyData((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        sections: prev[activeType].sections.map((sec) =>
          sec.id === formData.id ? formData : sec,
        ),
      },
    }));

    setIsEditing(false);
    setFormData(null);

    setAlert({
      message: "Updated successfully!",
      status: "Success",
    });
    setTimeout(() => setAlert(null), 3000);
  };

  // 👉 Add section
  const handleAdd = () => {
    const newSection = {
      id: Date.now(),
      heading: "New Section",
      content: "Write here...",
    };

    setPolicyData((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        sections: [...prev[activeType].sections, newSection],
      },
    }));
  };

  // 👉 Delete section
  const handleDelete = (id) => {
    setPolicyData((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        sections: prev[activeType].sections.filter((sec) => sec.id !== id),
      },
    }));

    setAlert({
      message: "Deleted successfully!",
      status: "Success",
    });
    setTimeout(() => setAlert(null), 3000);
  };

  const current = PolicyData[activeType];

  return (
    <>
      {/* Tabs */}
      <div className="table-filters">
        <h4>Policies</h4>

        <div className="page-tools">
          {Object.keys(PolicyData).map((key) => (
            <button
              key={key}
              className={activeType === key ? "active" : ""}
              onClick={() => handleTabChange(key)}
            >
              {key.toUpperCase()}
            </button>
          ))}

          <button className="add-button" onClick={handleAdd}>
            <LucidePlus /> Add Section
          </button>
        </div>
      </div>

      {/* Sections */}
      <h4>{current.title} (Updated on : {current.lastUpdated})</h4>
      <div className="">
        {current.sections.map((sec) => (
          <div
            key={sec.id}
            className="plot-card card"
            style={{ marginBottom: "1rem" }}
          >
            <div className="plot-details meta-details">
              {/* Heading */}
              <p className="plot-modal">
                {sec.heading && <strong>Heading : </strong>}

                {isEditing && formData?.id === sec.id ? (
                  <div className="field">
                    <input
                      name="heading"
                      value={formData.heading}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <span>{sec.heading}</span>
                )}
              </p>

              {/* Content */}
              <p className="plot-modal">
                <strong>Content : </strong>

                {isEditing && formData?.id === sec.id ? (
                  <div className="field">
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <span>{sec.content}</span>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="plot-card-actions dots">
              {isEditing && formData?.id === sec.id ? (
                <>
                </>
              ) : (
                <>
                  <span onClick={() => handleEdit(sec)}>
                    <NiEdit />
                  </span>

                  <span onClick={() => handleDelete(sec.id)}>
                    <NiDelete />
                  </span>
                </>
              )}
            </div>
            {isEditing && formData?.id === sec.id && (
              <div className="modal-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PolicyPage;
