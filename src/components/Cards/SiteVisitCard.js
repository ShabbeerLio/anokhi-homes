import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";

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

  useEffect(() => {
    if (!viewOpen) {
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
                className={`status ${item.status === "Completed" ? "active" : item.status === "Scheduled" ? "pending" : "failed"}`}
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
          <p>Interest</p>
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.agent}</p>
          <p>{item.site}</p>
          <p>{item.interest}</p>
        </div>
      </div>
      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Lead deleted");

              setDeleteOpen(false);

              setAlert({
                message: "Lead deleted successfully!",
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
            <p>Interest</p>
            <p>Report</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.phone}</p>
            <p>{item.agent}</p>
            <p>{item.site}</p>
            <p>{item.interest}</p>
            <div className="table-filters">
              <button
                className={`view-report-btn ${showReport ? "active" : ""}`}
                onClick={() => setShowReport(!showReport)}
              >
                <NiReport /> {showReport ? "Hide" : "View"}
              </button>
            </div>
          </div>
        </div>
        <div className={`report-view-box-right ${showReport ? "active" : ""}`}>
          <h4>Site Visit</h4>

          {/* SALE SUMMARY */}
          <div className="user-card-bottom view-box">
            <div className="user-card-bottom-left">
              <p>Date</p>
              <p>Phone No.</p>
              <p>Agent</p>
              <p>Site</p>
              <p>Interest</p>
            </div>

            <div className="user-card-bottom-right">
              <p>{item.date}</p>
              <p>{item.phone}</p>
              <p>{item.agent}</p>
              <p>{item.site}</p>
              <p>{item.interest}</p>
            </div>
          </div>

          {/* VISIT → BOOKING SUMMARY */}
          {/* EXISTING NOTES */}
          <h5>Notes History</h5>

          {notes.length === 0 && <p>No notes available.</p>}

          {notes.map((n, i) => (
            <div key={i} className="note-item">
              <p>{n.text}</p>
              <small>
                {n.date} — {n.by}
              </small>
            </div>
          ))}

          {/* ONLY AGENT CAN ADD NOTE */}
          {mood === "agent" && (
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
        </div>
      </ViewModal>
    </div>
  );
};

export default SiteVisitCard;
