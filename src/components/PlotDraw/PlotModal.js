import React from "react";

const PLOT_TYPES = ["FOR_SALE", "SOLD", "PENDING", "NOT_FOR_SALE", "ROAD"];

const PlotModal = ({ plot, onClose, mood, updatePlot }) => {
  const isAdmin = mood === "admin";

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

  return (
    <div className="modal-bg plot-modal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Plot Details</h3>

        {/* Plot ID */}
        <div className="field">
          <label>Plot ID</label>
          <input value={plot.id} disabled />
        </div>

        {/* Plot Name */}
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
            onChange={(e) => updatePlot(plot.id, { plotType: e.target.value })}
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

        <div className="modal-actions">
          {mood === "agent" && plot.plotType !== "ROAD" && (
            <button
              className={PLOT_ACTION_CONFIG[plot.plotType]?.className}
              onClick={onClose}
              disabled={plot.plotType === "SOLD"}
            >
              {PLOT_ACTION_CONFIG[plot.plotType]?.label}
            </button>
          )}
          <button className="btn secondary" onClick={onClose}>
            {isAdmin ? "Done " : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlotModal;
