import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiSearch from "../../icons/ni-search";
import NiCross from "../../icons/ni-cross";
import NiUser from "../../icons/ni-user";
import SearchSelect from "../SearchItems/SearchSelect";
const agents = [
  {
    id: 1,
    name: "Amit",
    phone: "9876543210",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/40?img=11"
  },
  {
    id: 2,
    name: "Sana",
    phone: "9123456789",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/40?img=12"
  },
  {
    id: 3,
    name: "Raj",
    phone: "9988776655",
    location: "Pune",
    avatar: "https://i.pravatar.cc/40?img=13"
  },
];

const ManagementCard = ({
  item,
  setSelectedLead,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
  setAlert,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [panelMode, setPanelMode] = useState(null);

  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(item.notes || []);
  const [lostReason, setLostReason] = useState(item.lostReason || "");
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (!viewOpen) {
      setPanelMode(null);
      setSelectedAgent(null);
    }
  }, [viewOpen]);

  const handleAssignAgent = (leadId, agentName) => {
    console.log("Assigning", agentName, "to lead", leadId);

    // Update lead logic here
    // If using state leads:
    // setLeads(prev =>
    //   prev.map(l => l.id === leadId ? { ...l, agent: agentName } : l)
    // );

    setAlert({
      message: "Agent Assigned Successfully",
      status: "Success",
    });

    setTimeout(() => setAlert(null), 3000);
  };

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
    a.phone.includes(agentSearch)
  );

  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.name}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
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
          {mood !== "user" && !dashboard && (
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
              onEdit={(lead) => {
                setSelectedLead(lead);
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
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.agent}</p>
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
        title={item.name}
      >
        <div className="user-card-bottom view-box report-view-box-left">
          <div className="user-card-bottom-left">
            <p>Date</p>
            <p>Status</p>
            <p>Phone No.</p>
            <p>Agent</p>
            {item.status === "Converted" ? (
              <p>Report</p>
            ) : item.status === "Lost" ?
              <p>Report</p> : ""
            }
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.status}</p>
            <p>{item.phone}</p>
            {/* AGENT FIELD LOGIC */}

            {item.status === "New" && mood === "admin" ? (
              <>
                <div className="table-filters">
                  <button className="view-report-btn" onClick={() => setPanelMode("assign")}>
                    <NiUser />
                    Assign
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  {item.agent || ""}
                </p>
              </>
            )
            }

            <div className="table-filters">
              {item.status === "Processing" && (
                <button className="view-report-btn" onClick={() => setPanelMode("notes")}>
                  <NiReport /> Add Notes
                </button>
              )}

              {item.status === "Lost" && (
                <button className="view-report-btn" onClick={() => setPanelMode("lost")}>
                  <NiReport /> Lost Reason
                </button>
              )}

              {item.status === "Converted" && (
                <button className="view-report-btn" onClick={() => setPanelMode("report")}>
                  <NiReport /> View
                </button>
              )}
            </div>
          </div>
        </div>
        {/* STATUS BASED ACTIONS */}


        <div className={`report-view-box-right ${panelMode ? "active" : ""}`}>

          {/* ASSIGN AGENT PANEL */}
          {panelMode === "assign" && (
            <>
              <h4>Assign Agent</h4>

              {/* IF NO AGENT SELECTED → SHOW SEARCH + LIST */}
              {!selectedAgent && (
                <>
                  <div className="field">
                    <SearchSelect
                      label=""
                      placeholder="Search name or number"
                      options={agents}
                      value={selectedAgent}
                      onChange={(selected) => {
                        setSelectedAgent(selected);
                        setFormData({ ...formData, name: selected.name });
                      }}
                      displayKey="name"
                      searchKeys={["name", "phone"]}
                      renderOption={(c) => (
                        <div>
                          <b>{c.name}</b> ({c.phone})
                        </div>
                      )}
                    />
                  </div>
                </>
              )}

              {/* IF AGENT SELECTED → SHOW ONLY SELECTED CARD */}
              {selectedAgent && (
                <div className="agent-list">
                  <div className="selected-agent-card">
                    <div className="notif-item">
                      <img src={selectedAgent.avatar} alt="" />
                      <div>
                        <p>{selectedAgent.name}({selectedAgent.phone})</p>
                        <p>{selectedAgent.location}</p>
                      </div>
                    </div>
                    <span onClick={() => {
                      setSelectedAgent(null);
                      setAgentSearch("");
                    }}>
                      <NiCross />
                    </span>
                  </div>
                  <p>Assinging agent will move lead to processing</p>
                  <div className="modal-actions">
                    <button
                      onClick={() => {
                        handleAssignAgent(item.id, selectedAgent.name);
                        setPanelMode(null);
                        setSelectedAgent(null);
                        setViewOpen(false)
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* PROCESSING → NOTES */}
          {panelMode === "notes" && (
            <>
              <h4>Notes</h4>

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
                    setNotes([...notes, noteText]);
                    setNoteText("");
                  }}
                >
                  Add Note
                </button>
              </div>
              <div className="note-history">
                {notes.map((n, i) => (
                  <div key={i} className="note-item">
                    <p>{n.text}</p>
                    <small>
                      {n.date} — {n.by}
                    </small>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* LOST */}
          {/* LOST */}
          {panelMode === "lost" && (
            <>

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
            </>
          )}

          {/* CONVERTED */}
          {panelMode === "report" && (
            <>
              <h4>Lead Conversion Report</h4>

              <p><strong>Converted By:</strong> {item.agent}</p>
              <p><strong>Conversion Date:</strong> {item.date}</p>
              <p><strong>Revenue:</strong> ₹5,00,000</p>

              <h5>Notes History</h5>
              {notes.map((n, i) => (
                <div key={i} className="note-item">
                  <p>{n.text}</p>
                  <small>
                    {n.date} — {n.by}
                  </small>
                </div>
              ))}
            </>
          )}

        </div>
      </ViewModal>
    </div>
  );
};

export default ManagementCard;
