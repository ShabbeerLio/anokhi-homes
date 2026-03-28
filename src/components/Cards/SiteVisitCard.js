import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiTick from "../../icons/ni-tick";
import NiCross from "../../icons/ni-cross";
import NiClock from "../../icons/ni-clock";
import SearchSelect from "../SearchItems/SearchSelect";

const SiteVisitCard = ({
  item,
  setSelectedVisit,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
  setAlert,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [notes, setNotes] = useState(item.notes || []);
  const [noteText, setNoteText] = useState("");
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [disapproveOpen, setDisapproveOpen] = useState(false);
  const [newVisitDate, setNewVisitDate] = useState("");
  const [panelMode, setPanelMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedPlot, setSelectedPlot] = useState(null);
  const plots = [
    {
      id: "P101",
      name: "Plot A-12",
      projectId: "PJ101",
      price: 1200000,
      status: "Vacant",
      priceRange: {
        min: 800000,
        max: 1200000,
      },
    },
    {
      id: "P102",
      name: "Plot B-07",
      projectId: "PJ102",
      price: 2300000,
      status: "Hold",
      priceRange: {
        min: 1800000,
        max: 2300000,
      },
    },
  ];

  useEffect(() => {
    if (!viewOpen) {
      setPanelMode(null);
      setShowReport(false);
    }
  }, [viewOpen]);

  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.customer}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "Completed" ? "active" : item.status === "Scheduled" ? "pending" : item.status === "Approval" ? "pending2" : "failed"}`}
              >
                {item.status}
              </span>
            </h4>
            {/* <p>{item.id}</p> */}
          </div>
        </div>
        <div className="dots">

          <span
            onClick={(e) => {
              e.stopPropagation();
              setViewOpen(true);
            }}
          >
            <NiOpenEye />
          </span>
          {mood !== "user" && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setActiveRow(activeRow === item.id ? null : item.id);
              }}
            >
              <NiDots />
            </span>
          )}

          {activeRow === item.id && (
            <ActionModal
              item={item}
              onClose={() => setActiveRow(null)}
              onEdit={(visit) => {
                setSelectedVisit(visit);
                setIsEditMode(true);
                setOpen(true);
              }}
              onDelete={() => {
                setDeleteOpen(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="user-card-bottom">
        <div className="user-card-bottom-left">
          <p>Date</p>
          <p>Phone No.</p>
          <p>Agent</p>
          <p>Site</p>
          <p>Visit Date</p>
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.agent}</p>
          <p>{item.site}</p>
          <p>{item.visitDate}</p>
        </div>
      </div>
      {mood === "admin" && (item.status === "Scheduled" || item.status === "Approval") && (
        <div className="modal-actions">
          <button
            className="site-visit-approval status active"
            onClick={() => {
              setAlert({
                message: "Site visit approved",
                status: "Success",
              });

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            <NiTick /> Approve
          </button>

          <button
            className="site-visit-approval status failed"
            onClick={() => setDisapproveOpen(true)}
          >
            <NiCross /> Disapprove
          </button>

          <button
            className="site-visit-approval status pending"
            onClick={() => setRescheduleOpen(true)}
          >
            <NiClock /> Reschedule
          </button>
        </div>
      )}
      {/* {mood === "agent" && item.status === "Scheduled" && (
          <div className="modal-actions">
            <button
              onClick={() => {
                setPanelMode("booking");
                setShowReport(false);
              }}
            >
              Request Booking
            </button>
          </div>
        )} */}
      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Site Visit deleted");

              setDeleteOpen(false);

              setAlert({
                message: "Site Visit deleted successfully!",
                status: "Success",
              });

              setTimeout(() => {
                setAlert(null);
              }, 5000);
            }}
          >
            Yes
          </button>

          <button
            className="btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </DeleteModal>
      <DeleteModal open={rescheduleOpen} onClose={() => setRescheduleOpen(false)}>
        <h4>Reschedule Site Visit</h4>

        <div className="field">
          <label>New Visit Date</label>
          <input
            type="datetime-local"
            value={newVisitDate}
            onChange={(e) => setNewVisitDate(e.target.value)}
          />
        </div>
        <div className="field">
          <label>
            Notes
          </label>
          <textarea
            placeholder="Add Notes..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={() => {
              if (!newVisitDate) return;

              setAlert({
                message: "Site visit rescheduled",
                status: "Success",
              });

              setRescheduleOpen(false);
              setNewVisitDate("");

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            Reschedule
          </button>
        </div>
      </DeleteModal>
      <DeleteModal open={disapproveOpen} onClose={() => setDisapproveOpen(false)}>
        <h4>Disapprove Site Visit</h4>
        <div className="field">
          <label>
            Notes
          </label>
          <textarea
            placeholder="Add Notes..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={() => {
              setAlert({
                message: "Site visit disapproved",
                status: "Success",
              });

              setDisapproveOpen(false);
              setNewVisitDate("");

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            Disapprove
          </button>
        </div>
      </DeleteModal>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={item.customer}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Date</p>
            <p>Phone No.</p>
            <p>Agent</p>
            <p>Site</p>
            <p>Visit Date</p>
            <p>Report</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.phone}</p>
            <p>{item.agent}</p>
            <p>{item.site}</p>
            <p>{item.visitDate}</p>
            <div className="table-filters">
              <button
                className={`view-report-btn ${showReport ? "active" : ""}`}
                onClick={() => {
                  setPanelMode("report");
                  setShowReport(true);
                }}
              >
                <NiReport /> {showReport ? "Hide" : "View"}
              </button>
            </div>
          </div>
        </div>
        {mood === "agent" && item.status === "Scheduled" && (
          <div className="modal-actions">
            <button
              onClick={() => {
                setPanelMode("booking");
                setShowReport(false);
              }}
            >
              Request Booking
            </button>
          </div>
        )}
        <div className={`report-view-box-right ${panelMode ? "active" : ""}`}>
          {panelMode === "booking" && (
            <>
              <h4>Request Booking</h4>

              <div className="field">
                <SearchSelect
                  label="Plots"
                  placeholder="Search Plot..."
                  options={plots}
                  value={selectedPlot}
                  onChange={(selected) => {
                    setSelectedPlot(selected);

                    setFormData({
                      ...formData,
                      plotId: selected.id,
                      amount: selected.price,
                      amountPaid: "",
                      notes: "",
                    });
                  }}
                  displayKey="name"
                  searchKeys={["name", "location"]}
                  renderOption={(p) => (
                    <div>
                      <b>{p.name}</b>
                      <small style={{ display: "block", color: "#666" }}>
                        {p.status}
                      </small>
                      {/* <small style={{ display: "block", color: "#666" }}>
                        Range: ₹{p.priceRange.min.toLocaleString()} - ₹
                        {p.priceRange.max.toLocaleString()}
                      </small> */}
                    </div>
                  )}
                />
              </div>

              <div className="field">
                <label>Total Amount</label>
                <input
                  placeholder="Total Amount"
                  value={selectedPlot?.price || ""}
                  readOnly
                />
              </div>

              <div className="field">
                <label>Amount Request
                  {selectedPlot && (
                    <small style={{ fontSize: "12px", color: "#ff6969" }}>
                      Allowed Range: ₹{selectedPlot.priceRange.min} - ₹{selectedPlot.priceRange.max}
                    </small>
                  )}
                </label>
                <input
                  type="number"
                  placeholder="Amount request"
                  value={formData.amountPaid || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, amountPaid: e.target.value })
                  }
                />
              </div>


              {selectedPlot &&
                formData.amountPaid &&
                (Number(formData.amountPaid) < selectedPlot.priceRange.min ||
                  Number(formData.amountPaid) > selectedPlot.priceRange.max) && (
                  <div className="field">
                    <label>
                      Notes <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      placeholder="Enter reason for requesting amount outside allowed range"
                      value={formData.notes || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                )}

              <div className="modal-actions">
                <button
                  onClick={() => {
                    if (!selectedPlot) {
                      setAlert({
                        message: "Please select a plot",
                        status: "Error",
                      });
                      setTimeout(() => setAlert(null), 3000);
                      return;
                    }

                    const requestedAmount = Number(formData.amountPaid);
                    const min = selectedPlot.priceRange.min;
                    const max = selectedPlot.priceRange.max;

                    const isInRange = requestedAmount >= min && requestedAmount <= max;

                    if (!requestedAmount) {
                      setAlert({
                        message: "Please enter amount request",
                        status: "Error",
                      });
                      setTimeout(() => setAlert(null), 3000);
                      return;
                    }

                    if (!isInRange && !formData.notes?.trim()) {
                      setAlert({
                        message: "Notes are required when amount is outside the allowed range",
                        status: "Error",
                      });
                      setTimeout(() => setAlert(null), 3000);
                      return;
                    }

                    console.log("Booking Requested", formData);

                    setAlert({
                      message: "Booking request submitted",
                      status: "Success",
                    });

                    setTimeout(() => setAlert(null), 3000);

                    setViewOpen(null);
                    setSelectedPlot(null);
                    setFormData({
                      plotId: "",
                      amount: "",
                      amountPaid: "",
                      notes: "",
                    });
                  }}
                >
                  Submit Request
                </button>
              </div>
            </>
          )}
          {panelMode === "report" && (
            <>
              <h4>Site Visit</h4>

              {/* SALE SUMMARY */}
              <div className="user-card-bottom view-box">
                <div className="user-card-bottom-left">
                  <p>Date</p>
                  <p>Phone No.</p>
                  <p>Agent</p>
                  <p>Site</p>
                  <p>Visit Date</p>
                </div>

                <div className="user-card-bottom-right">
                  <p>{item.date}</p>
                  <p>{item.phone}</p>
                  <p>{item.agent}</p>
                  <p>{item.site}</p>
                  <p>{item.visitDate}</p>
                </div>
              </div>

              {/* VISIT → BOOKING SUMMARY */}
              {/* EXISTING NOTES */}
              <h5>Notes History</h5>

              {notes.length === 0 && <p>No notes available.</p>}

              {notes.map((n, i) => (
                <div key={i} className="note-item">
                  <small>
                    <span>{n.by}</span> {n.date}
                  </small>
                  <p>{n.text}</p>
                </div>
              ))}
              {/* ONLY AGENT CAN ADD NOTE */}
              {item.status === "Scheduled" || item.status === "Approval" && (
                <>
                  <div className="add-note-section">
                    <div class="field">
                      <textarea
                        placeholder="Add reason or note..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                    </div>

                    <div className="modal-actions">
                      <button
                        onClick={() => {
                          if (!noteText.trim()) return;

                          const newNote = {
                            text: noteText,
                            date: new Date().toLocaleString(),
                            by: "Agent",
                          };

                          setNotes([...notes, newNote]);
                          setNoteText("");
                        }}
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </ViewModal>
    </div>
  );
};

export default SiteVisitCard;
