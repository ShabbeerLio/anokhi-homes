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
import CancellationPolicy from "../Policies/CancellationPolicy";
import AddLocationModal from "../Modals/AddLocationModal";
import formatDate from "../DateFormate/DateFormate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Host from "../../Host/Host";
import { getPlots, getSiteVisit } from "../../Redux/Slices/AppSlices";
import NoteItem from "../NoteItem/NoteItem";

const SiteVisitCard = ({
  item,
  setSelectedVisit,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
  setAlert,
}) => {
  const dispatch = useDispatch();
  // console.log(item, "item")
  const { plots } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getPlots(item?.colony?._id));
  }, [item?.colony?._id]);

  // console.log(plots?.plots, "plots")

  const [activeRow, setActiveRow] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [notes, setNotes] = useState(item.notes || []);
  const [noteText, setNoteText] = useState("");
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [disapproveOpen, setDisapproveOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [newVisitDate, setNewVisitDate] = useState("");
  const [panelMode, setPanelMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  // const plots = [
  //   {
  //     id: "P101",
  //     name: "Plot A-12",
  //     projectId: "PJ101",
  //     price: 1200000,
  //     status: "Vacant",
  //     priceRange: {
  //       min: 800000,
  //       max: 1200000,
  //     },
  //   },
  //   {
  //     id: "P102",
  //     name: "Plot B-07",
  //     projectId: "PJ102",
  //     price: 2300000,
  //     status: "Hold",
  //     priceRange: {
  //       min: 1800000,
  //       max: 2300000,
  //     },
  //   },
  // ];

  useEffect(() => {
    if (!viewOpen) {
      setPanelMode(null);
      setShowReport(false);
    }
  }, [viewOpen]);

  const handleVisitAction = async (visitId, action, extraData = {}) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${Host}/api/sitevisit/action/${visitId}`,
        {
          action,
          ...extraData, // visitDate / note
        },
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({
        message:
          action === "approve"
            ? "Site visit approved"
            : action === "reject"
              ? "Site visit rejected"
              : "Site visit rescheduled",
        status: "Success",
      });

      dispatch(getSiteVisit());

      setDisapproveOpen(false);
      setRescheduleOpen(false);
      setFormData({});
      setNewVisitDate("");

      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error(err);
      setAlert({
        message: err.response?.data?.message || "Action failed",
        status: "Error",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };


  const handleAddNote = async (visitId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${Host}/api/sitevisit/add-note/${visitId}`,
        { note: noteText },
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ update UI from backend response
      setNotes(res.data.visit.notes);
      setNoteText("");

      setAlert({
        message: "Note added successfully",
        status: "Success",
      });

      dispatch(getSiteVisit()); // optional refresh

      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error(err);
      setAlert({
        message: err.response?.data?.message || "Failed to add note",
        status: "Error",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleEditNote = async (visitId, noteId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${Host}/api/sitevisit/edit-note/${visitId}/${noteId}`,
        { note: editText },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setNotes(res.data.visit.notes);
      setEditingNoteId(null);
      setEditText("");
      dispatch(getSiteVisit());

      setAlert({ message: "Note updated", status: "Success" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error(err);
      setAlert({ message: "Edit failed", status: "Error" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDeleteNote = async (visitId, noteId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${Host}/api/sitevisit/delete-note/${visitId}/${noteId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setNotes(res.data.visit.notes);
      dispatch(getSiteVisit());
      setAlert({ message: "Note deleted", status: "Success" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error(err);
      setAlert({ message: "Delete failed", status: "Error" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleAddBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!selectedPlot) {
        setAlert({ message: "Please select plot", status: "Error" });
        return;
      }

      if (!formData.requestAmount) {
        setAlert({ message: "Enter request amount", status: "Error" });
        return;
      }

      if (!formData.termsAccepted) {
        setAlert({
          message: "Please accept terms & conditions",
          status: "Error",
        });
        return;
      }

      console.log(formData, "formData")
      const res = await axios.post(
        `${Host}/api/booking/add`,
        {
          sitevisitId: item._id, // 🔥 IMPORTANT
          customer: item.customer._id,
          location: item.location?._id,
          colony: item.colony?._id,
          plot: selectedPlot._id, // 🔥 IMPORTANT

          requestAmount: formData.requestAmount,

          bookingDate: formData.bookingDate,
          agreementDate: formData.agreementDate,
          fullDate: formData.fullDate,

          termsAccepted: formData.termsAccepted,
        },
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({
        message: "Booking created successfully",
        status: "Success",
      });

      dispatch(getSiteVisit());

      // reset UI
      setViewOpen(false);
      setSelectedPlot(null);
      setFormData({});
      setPanelMode(null);

      setTimeout(() => setAlert(null), 3000);

    } catch (err) {
      console.error(err);
      setAlert({
        message: err.response?.data?.message || "Booking failed",
        status: "Error",
      });
    }
  };


  const handleDeleteVisit = async (visitId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${Host}/api/sitevisit/delete/${visitId}`, {
        headers: {
          "auth-token": token,
        },
      });

      dispatch(getSiteVisit());

      setAlert({
        message: "Site visit deleted successfully!",
        status: "Success",
      });
      setTimeout(() => setAlert(null), 3000);

      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
      setAlert({
        message: "Delete failed",
        status: "Error",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };


  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4 style={{ textTransform: "capitalize" }}>
              {item.customer.name}
              {/* <span>({item.phone})</span> */}
              <span

                className={`status ${item.status === "completed" ? "active" : item.status === "scheduled" ? "pending" : item.status === "rescheduled" ? "pending" : item.status === "approval" ? "pending2" : "failed"}`}
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
          {mood !== "user" && mood !== "agent" && (
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
          {mood !== "agent" && <p>Associate</p>}
          <p>Site</p>
          <p>Visit Date</p>
        </div>
        <div className="user-card-bottom-right">
          <p>
            {formatDate(item?.createdAt)}
          </p>
          <p>{item.customer.phone}</p>
          {mood !== "agent" && <p>{item.agent?.name || "-"}</p>}
          <p> {item.colony?.name}, {item.location.name}</p>
          <p>{item.visitDate}</p>
        </div>
      </div>
      {mood === "admin" && (item.status === "approval") && (
        <div className="modal-actions">
          <button
            className="site-visit-approval status active"
            onClick={() => {
              handleVisitAction(item._id, "approve");
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
      {(mood === "agent" && item.status === "scheduled" || item.status === "rescheduled") && (
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewOpen(true);
              setPanelMode("booking");
              setShowReport(false);
            }}
          >
            Request Booking
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
              handleDeleteVisit(item._id)
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
              if (!newVisitDate) {
                setAlert({
                  message: "Please select date",
                  status: "Error",
                });
                return;
              }

              if (!formData.notes?.trim()) {
                setAlert({
                  message: "Note is required",
                  status: "Error",
                });
                return;
              }

              handleVisitAction(item._id, "reschedule", {
                visitDate: newVisitDate,
                note: formData.notes,
              });
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
              if (!formData.notes?.trim()) {
                setAlert({
                  message: "Note is required",
                  status: "Error",
                });
                return;
              }

              handleVisitAction(item._id, "reject", {
                note: formData.notes,
              });
            }}
          >
            Disapprove
          </button>
        </div>
      </DeleteModal>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={item.customer.name}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Date</p>
            <p>Phone No.</p>
            {mood !== "agent" && <p>Associate</p>}
            <p>Site</p>
            <p>Visit Date</p>
            <p>Notes</p>
          </div>
          <div className="user-card-bottom-right">
            <p>
              {formatDate(item?.createdAt)}
            </p>
            <p>{item.customer.phone}</p>
            {mood !== "agent" && <p>{item.agent?.name || "-"}</p>}
            <p>{item.location?.name || "-"}</p>
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
        {mood === "agent" && item.status === "scheduled" && (
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
                  options={plots?.plots}
                  value={selectedPlot}
                  onChange={(selected) => {
                    setSelectedPlot(selected);

                    setFormData({
                      ...formData,
                      plot: selected._id,
                      plotId: selected.plotId,
                      pricePerSqft: selected.price,
                      plotArea: selected.area,
                      priceRange: selected.priceRange,
                    });
                  }}
                  displayKey="plotNumber"
                  searchKeys={["plotNumber", "status"]}
                  renderOption={(p) => (
                    <div>
                      <b>{p.plotNumber}</b>
                      <small style={{ display: "block", color: "#666" }}>
                        {p.plotType}
                      </small>
                    </div>
                  )}
                />
              </div>

              <div className="field">
                <label>Rate <small style={{ fontSize: "12px", color: "green" }}>₹{selectedPlot?.price || 0} / sq.ft </small></label>
                <input
                  placeholder="Rate with sqft"
                  value={formData.pricePerSqft ? `₹${formData.pricePerSqft} * ${formData.plotArea} sq.ft` : ""}
                  // {"₹550 * 1200 sq.ft"}
                  readOnly
                />
              </div>

              <div className="field">
                <label>Price Request in sq.ft
                  <small style={{ fontSize: "12px", color: "green" }}>₹{formData.requestAmount * formData.plotArea || 0} </small>
                </label>
                <input
                  type="number"
                  placeholder="Price request in sq.ft"
                  value={formData.requestAmount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, requestAmount: e.target.value })
                  }
                />
              </div>


              {selectedPlot &&
                formData.requestAmount &&
                (Number(formData.requestAmount) < selectedPlot.priceRange.min ||
                  Number(formData.requestAmount) > selectedPlot.priceRange.max) && (
                  <div className="field">
                    <label>
                      Notes <small style={{ fontSize: "12px", color: "#ff6969" }}>(Price Doesn't Match Allowed Range)</small><span style={{ color: "red" }}>*</span>
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

              <div className="field">
                <label>Booking Payment Date</label>
                <input
                  type="date"
                  value={formData.bookingDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingDate: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Agreement Payment Date</label>
                <input
                  type="date"
                  value={formData.agreementDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, agreementDate: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Full Payment Date</label>
                <input
                  type="date"
                  value={formData.fullDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDate: e.target.value })
                  }
                />
              </div>
              <p style={{ color: "#ff6969", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "5px", padding: "10px 0" }}>
                <input style={{ width: "5%" }} type="checkbox"
                  checked={formData.termsAccepted || false}
                  onChange={(e) =>
                    setFormData({ ...formData, termsAccepted: e.target.checked })
                  } />
                Notes : 35% cancellation charges
                <span style={{ borderBottom: "1px solid #ff6969", cursor: "pointer" }} onClick={() => setPolicyOpen(true)}>
                  Read Cancellation Policy
                </span>
              </p>

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

                    const requestedAmount = Number(formData.requestAmount);
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

                    handleAddBooking();
                  }}
                >
                  Submit Request
                </button>
              </div>
            </>
          )}
          {panelMode === "report" && (
            <>
              {/* <h4>Site Visit</h4> */}

              {/* SALE SUMMARY */}
              {/* <div className="user-card-bottom view-box">
                <div className="user-card-bottom-left">
                  <p>Date</p>
                  <p>Phone No.</p>
                  <p>Associate</p>
                  <p>Site</p>
                  <p>Visit Date</p>
                </div>

                <div className="user-card-bottom-right">
                  <p>
                    {formatDate(item?.createdAt)}
                  </p>
                  <p>{item.customer.phone}</p>
                  <p>{item.agent?.name || "-"}</p>
                  <p>{item.location?.name || "-"}</p>
                  <p>{item.visitDate}</p>
                </div>
              </div> */}

              {/* VISIT → BOOKING SUMMARY */}
              {/* EXISTING NOTES */}
              {/* <h5>Notes History</h5> */}

              {/* {notes.length === 0 && <p>No notes available.</p>} */}

              {/* {notes.map((n, i) => (
                <div key={i} className="note-item">
                  <small>
                    <span>{n.by}</span> {n.date}
                  </small>
                  <p>{n.text}</p>
                </div>
              ))} */}
              {/* ONLY AGENT CAN ADD NOTE */}
              {(item.status === "scheduled" || item.status === "approval" || item.status === "completed") && (
                <>
                  <NoteItem
                    item={item}
                    notes={notes}
                    editingNoteId={editingNoteId}
                    editText={editText}
                    noteText={noteText}
                    setEditingNoteId={setEditingNoteId}
                    setEditText={setEditText}
                    setNoteText={setNoteText}
                    handleAddNote={handleAddNote}
                    handleEditNote={handleEditNote}
                    handleDeleteNote={handleDeleteNote}
                  />
                </>
              )}
            </>
          )}

        </div>
      </ViewModal>
      <AddLocationModal
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
        title="Cancellation Policy"
      >
        <CancellationPolicy />
      </AddLocationModal>
    </div>
  );
};

export default SiteVisitCard;
