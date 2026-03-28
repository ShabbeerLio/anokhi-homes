import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiCross from "../../icons/ni-cross";
import NiUser from "../../icons/ni-user";
import SearchSelect from "../SearchItems/SearchSelect";
const agents = [
  {
    id: 1,
    name: "Amit",
    phone: "9876543210",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/40?img=11",
  },
  {
    id: 2,
    name: "Sana",
    phone: "9123456789",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 3,
    name: "Raj",
    phone: "9988776655",
    location: "Pune",
    avatar: "https://i.pravatar.cc/40?img=13",
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
  const handleReAssignAgent = (leadId, agentName) => {
    console.log("Reassigning", agentName, "to lead", leadId);

    // Update lead logic here
    // If using state leads:
    // setLeads(prev =>
    //   prev.map(l => l.id === leadId ? { ...l, agent: agentName } : l)
    // );

    setAlert({
      message: "Agent Ressigned Successfully",
      status: "Success",
    });

    setTimeout(() => setAlert(null), 3000);
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
      a.phone.includes(agentSearch),
  );

  const Projects = [
    { id: "PJ101", name: "SunShine Colony", location: "Mumbai" },
    { id: "PJ102", name: "Moon Colony", location: "Delhi" },
  ];

  const plots = [
    {
      id: "P101",
      name: "Plot A-12",
      projectId: "PJ101",
      price: 1200000,
      status: "Vacant",
    },
    {
      id: "P102",
      name: "Plot B-07",
      projectId: "PJ102",
      price: 2300000,
      status: "Hold",
    },
  ];

  const [selectedProjects, setSelectedProjects] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);

  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.name}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "New" ? "active2" : item.status === "Converted" ? "active" : item.status === "Processing" ? "pending" : item.status === "Booking" ? "pending2" : "failed"}`}
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
            ) : item.status === "Lost" ? (
              <p>Report</p>
            ) : item.status === "Processing" && mood === "admin" ? (
              <div className="table-filters">
                <button
                  className="view-report-btn"
                  onClick={() => setPanelMode("reassign")}
                >
                  <NiUser />
                  Reassign
                </button>
              </div>
            ) : ""}
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.status}</p>
            <p>{item.phone}</p>

            {item.status === "New" && mood === "admin" ? (
              <>
                <div className="table-filters">
                  <button
                    className="view-report-btn"
                    onClick={() => setPanelMode("assign")}
                  >
                    <NiUser />
                    Assign
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{item.agent || ""}</p>
              </>
            )}

            <div className="table-filters">
              {(item.status === "Processing" || item.status === "Booking") && (
                <button
                  className="view-report-btn"
                  onClick={() => setPanelMode("notes")}
                >
                  <NiReport /> Add Notes
                </button>
              )}

              {item.status === "Lost" && (
                <button
                  className="view-report-btn"
                  onClick={() => setPanelMode("lost")}
                >
                  <NiReport /> Lost Reason
                </button>
              )}

              {item.status === "Converted" && (
                <button
                  className="view-report-btn"
                  onClick={() => setPanelMode("report")}
                >
                  <NiReport /> View
                </button>
              )}
            </div>
          </div>
        </div>
        {mood === "agent" && item.status === "Processing" && (
          <div className="modal-actions">
            <button
              onClick={() => setPanelMode("siteVisit")}
            >
              Request Site Visit
            </button>
          </div>
        )}
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
                        <p>
                          {selectedAgent.name}({selectedAgent.phone})
                        </p>
                        <p>{selectedAgent.location}</p>
                      </div>
                    </div>
                    <span
                      onClick={() => {
                        setSelectedAgent(null);
                        setAgentSearch("");
                      }}
                    >
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
                        setViewOpen(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {panelMode === "reassign" && (
            <>
              <h4>Reassign Agent</h4>

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
                        <p>
                          {selectedAgent.name}({selectedAgent.phone})
                        </p>
                        <p>{selectedAgent.location}</p>
                      </div>
                    </div>
                    <span
                      onClick={() => {
                        setSelectedAgent(null);
                        setAgentSearch("");
                      }}
                    >
                      <NiCross />
                    </span>
                  </div>
                  <div class="field">
                    <textarea
                      placeholder="Add reason or note of re-assigning"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                  </div>
                  <p>Reassinging agent will move lead to processing</p>
                  <div className="modal-actions">
                    <button
                      onClick={() => {
                        handleReAssignAgent(item.id, selectedAgent.name);
                        setPanelMode(null);
                        setSelectedAgent(null);
                        setViewOpen(false);
                      }}
                    >
                      Reassign
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {panelMode === "siteVisit" && (
            <>
              <h4>Request Site Visit</h4>

              <div className="field">
                <label>Date of Visit</label>
                <input
                  type="date"
                  value={formData.visitDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, visitDate: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <SearchSelect
                  label="Site"
                  placeholder="Search Project or location"
                  options={Projects}
                  value={selectedProjects}
                  onChange={(selected) => {
                    setSelectedProjects(selected);
                    setFormData({ ...formData, Project: selected.name });
                  }}
                  displayKey="name"
                  searchKeys={["name", "location"]}
                  renderOption={(p) => (
                    <div>
                      <b>{p.name}</b>
                      <small style={{ display: "block", color: "#666" }}>
                        {p.location}
                      </small>
                    </div>
                  )}
                />
              </div>

              <div className="modal-actions">
                <button
                  onClick={() => {
                    console.log("Site Visit Requested", formData);

                    setAlert({
                      message: "Site visit request submitted",
                      status: "Success",
                    });

                    setTimeout(() => setAlert(null), 3000);

                    setViewOpen(null);
                    setFormData({});
                  }}
                >
                  Submit Request
                </button>
              </div>
            </>
          )}

          {/* PROCESSING → NOTES */}
          {panelMode === "notes" && (
            <>
              <h4>Notes</h4>
              <div className="note-history">
                {[...notes].reverse().map((n, i) => (
                  <div key={i} className="note-item">
                    <small>
                      <span
                        className={`${n.by === "Admin" ? "comment admin" : "comment agent"}`}
                      >
                        {n.by}
                      </span>{" "}
                      {n.date}
                    </small>
                    <p>{n.text}</p>
                  </div>
                ))}
              </div>

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
                    const newNote = {
                      text: noteText,
                      date: new Date().toLocaleString(),
                      by: mood === "admin" ? "Admin" : "Agent",
                    };

                    setNotes([...notes, newNote]);
                    setNoteText("");
                  }}
                >
                  Add Note
                </button>
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

              <p>
                <strong>Converted By:</strong> {item.agent}
              </p>
              <p>
                <strong>Conversion Date:</strong> {item.date}
              </p>
              <p>
                <strong>Revenue:</strong> ₹5,00,000
              </p>

              <h5>Notes History</h5>
              {notes.map((n, i) => (
                <div key={i} className="note-item">
                  <small>
                    <span>{n.by}</span> {n.date}
                  </small>
                  <p>{n.text}</p>
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
