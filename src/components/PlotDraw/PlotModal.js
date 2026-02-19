import React, { useState } from "react";
import EnquireModal from "../Modals/EnquireModal";
import { X } from "lucide-react";

const PLOT_TYPES = ["FOR_SALE", "SOLD", "PENDING", "NOT_FOR_SALE", "ROAD"];

const PlotModal = ({ plot, onClose, mood, updatePlot }) => {
  const isAdmin = mood === "admin";
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const PLOT_ACTION_CONFIG = {
    FOR_SALE: {
      label: "Book Plot",
      className: "agent btn sale",
    },
    SOLD: {
      label: "SOLD",
      className: "agent btn sold",
    },
    PENDING: {
      label: "Pending",
      className: "agent btn pending",
    },
  };

  const handleActionClick = () => {
    // onClose();
    setShowEnquiryModal(true);
  };

  const agent = {
  id: "AG123",
  name: "Rahul Sharma"
}

  return (
    <div className="modal-bg plot-modal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Plot Details</h3>

        {/* Plot ID */}
        {isAdmin ? (
          <>
            <div className="field">
              <label>Plot ID</label>
              <input value={plot.id} disabled />
            </div>

            <div className="field">
              <label>Plot Name</label>
              <input
                value={plot.name || ""}
                disabled={!isAdmin}
                onChange={(e) => updatePlot(plot.id, { name: e.target.value })}
                placeholder="Enter plot name"
              />
            </div>

            {/* Plot Type */}
            <div className="field">
              <label>Plot Type</label>
              <select
                value={plot.plotType}
                disabled={!isAdmin}
                onChange={(e) =>
                  updatePlot(plot.id, { plotType: e.target.value })
                }
              >
                {PLOT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div className="field">
              <label>Area (sq.ft)</label>
              <input
                type="number"
                value={plot.areaSqFt || 0}
                disabled={!isAdmin}
                onChange={(e) =>
                  updatePlot(plot.id, {
                    areaSqFt: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Auto calculated area info */}
            <p className="hint">
              * Area is editable. Auto-calculated from shape by default.
            </p>
          </>
        ) : (
          <>
            <div className="user-field">
              <label>Plot ID</label>
              <div className="value">{plot.id}</div>
            </div>
            <div className="user-field">
              <label>Plot Name</label>
              <div className="value">{plot.name || "-"}</div>
            </div>

            {/* Plot Type */}
            <div className="user-field">
              <label>Plot Type</label>
              <div className="value">{plot.plotType.replaceAll("_", " ")}</div>
            </div>

            {/* Area */}
            <div className="user-field">
              <label>Area (sq.ft)</label>
              <div className="value">{plot.areaSqFt || 0} sq.ft</div>
            </div>
          </>
        )}

        <div className="modal-actions">
          {mood === "agent" && plot.plotType !== "ROAD" && (
            <button
              className={PLOT_ACTION_CONFIG[plot.plotType]?.className}
              // onClick={onClose}
              disabled={plot.plotType === "SOLD"}
              onClick={() =>
                plot.plotType === "FOR_SALE"
                  ? handleActionClick()
                  : onClose()
              }
            >
              {PLOT_ACTION_CONFIG[plot.plotType]?.label}
            </button>
          )}
          {mood === "user" && plot.plotType !== "ROAD" && (
            <>
              {plot.plotType === "FOR_SALE" ? (
                <button
                  className={PLOT_ACTION_CONFIG[plot.plotType]?.className}
                  onClick={() => handleActionClick()}
                >
                  Enquire Now
                </button>
              ) : (
                <button className="btn sold" onClick={onClose}>
                  SOLD
                </button>
              )}
            </>
          )}
          <button className="close-btn" onClick={onClose}>
            <X/>
          </button>
          {isAdmin && <button className="btn secondary" onClick={onClose}>
            Done
          </button>}
        </div>
      </div>
      {/* ENQUIRY / BOOK MODAL */}
      {showEnquiryModal && (
        <div
          className="modal-bg enquiry-modal"
          onClick={() => setShowEnquiryModal(false)}
        >
          <EnquireModal
            setShowEnquiryModal={setShowEnquiryModal}
            plot={plot}
            mood={mood}
            agent={agent}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default PlotModal;
