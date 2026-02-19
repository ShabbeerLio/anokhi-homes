import { X } from "lucide-react";
import React, { useState } from "react";
import "./EnquireModal.css";
import StatusModal from "./StatusModal";

const EnquireModal = ({ setShowEnquiryModal, plot, mood, agent, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [showStatus, setShowStatus] = useState(false);
    const [status, setStatus] = useState("processing");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Form Submitted:", {
            ...formData,
            plotDetails: plot,
        });

        setShowStatus(true);
        setStatus("processing");
        setTimeout(() => {
            setStatus("success"); // change to "failed" if needed
        }, 3000);

        setTimeout(() => {
            setShowStatus(false);
            setShowEnquiryModal(false);
            onClose();
        }, 5000);

    };

    return (
        <>
            <div className="modal enquiry-box" onClick={(e) => e.stopPropagation()}>
                {/* X Button */}
                <div className="modal-actions">
                    <button
                        className="close-btn"
                        onClick={() => setShowEnquiryModal(false)}
                    >
                        <X />
                    </button>
                </div>

                <h3>{mood === "agent" ? `"Book Plot"` : "Enquire About Plot"}</h3>
                {mood === "agent" && agent && (
                    <div className="enquirefield-box">
                        <div className="agent-detail">
                            <label>{agent.name}({agent.id})</label>
                        </div>
                    </div>
                )}
                <div className="enquirefield-box">
                    <div className="field">
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label>Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="field">
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Auto Filled Plot Details */}
                <div className="field plot-details-enq">
                    <label>Plot Details</label>
                    <textarea
                        value={`Plot ID: ${plot.id}
Name: ${plot.name}
Type: ${plot.plotType}
Area: ${plot.areaSqFt} sq.ft`}
                        disabled
                    />
                </div>

                <div className="modal-actions">
                    <button className="btn primary" onClick={handleSubmit}>
                        {mood === "agent" ? "Confirm Booking" : "Send Enquiry"}
                    </button>
                </div>
            </div>
            {showStatus && (
                <div className="modal-bg">
                    <StatusModal status={status} />
                </div>
            )}
        </>
    );
};

export default EnquireModal;
