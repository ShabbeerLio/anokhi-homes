import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LucidePlus, SquarePlus } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import "./HelpCenter.css";
import NiOpenEye from "../../icons/ni-openEye";
import ViewModal from "../../components/Modals/ViewModal";

const StaticTickets = [
  {
    id: 1,
    ticket: "#8rj39",
    postedBy: "Shabbeer",
    date: "1 Aug, 2025",
    status: "Replied",
    title: "this is ticket1",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      },
    ],
    description:
      "Team Ansar – Community Connectors Inspired by the Ansar of Madinah, this team works on the ground to connect and enroll Islamic institutions like mosques and madrasas into the Sadaqah App. They build trust, spread awareness, and grow our verified network with dedication and care.",
  },
  {
    id: 2,
    ticket: "#8rj34",
    postedBy: "System",
    date: "2 Aug, 2025",
    status: "Closed",
    title: "this is ticket2",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      },
    ],
    description:
      "Team Rahmah – Compassion in Action Rooted in the value of Rahmah (mercy and compassion), this team focuses on guiding users, resolving concerns, and offering heartfelt support. They ensure every interaction on the Sadaqah App feels warm, respectful, and caring.",
  },
  {
    id: 3,
    ticket: "#8rj37",
    postedBy: "System",
    date: "2 Aug, 2025",
    status: "Closed",
    title: "this is ticket3",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      },
    ],
    description:
      "Team Amanah – Trust & Verification Inspired by the Islamic principle of Amanah (trust), this team is responsible for verifying every institution, donor, and transaction. They ensure transparency, safety, and credibility across the Sadaqah App platform.",
  },
  {
    id: 4,
    ticket: "#8rj38",
    postedBy: "Nawaz Akhtar",
    date: "1 Aug, 2025",
    status: "On Going",
    title: "this is ticket4",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      },
    ],
    description:
      "Team Fikr – Thoughtful Planning & Vision Inspired by the word Fikr (deep thought and concern), this team is responsible for strategy, planning, and continuous improvement. They think ahead to ensure the app grows with purpose and impact.",
  },
];

const HelpCenter = ({ mood, setAlert }) => {
  const [applications, setApplications] = useState([]);
  const [ticketReplies, setTicketReplies] = useState({});
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    attachments: null,
  });

  const [replyData, setReplyData] = useState({
    title: "",
    message: "",
  });

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ticket");
    if (saved) setApplications(JSON.parse(saved));

    const savedReplies = localStorage.getItem("ticketReplies");
    if (savedReplies) setTicketReplies(JSON.parse(savedReplies));
  }, []);

  const mergedTickets = [...StaticTickets, ...applications];
  const selectedTicket = mergedTickets.find((t) => t.id === selectedPosition);

  // ===========================
  // CREATE TICKET
  // ===========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      id: Date.now(),
      ticket: `#${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      postedBy: "User",
      date: new Date().toLocaleDateString(),
      lastUpdate: new Date().toLocaleString(),
      status: "On Going",
      title: formData.title,
      description: formData.message,
    };

    const updated = [...applications, newTicket];
    setApplications(updated);
    localStorage.setItem("ticket", JSON.stringify(updated));

    setOpen(false);
    setFormData({ title: "", message: "", attachments: null });

    setAlert({ message: "Ticket Created!", status: "Success" });
  };

  // ===========================
  // ADD REPLY
  // ===========================
  const handleReply = () => {
    if (!replyData.message) return;

    const newReply = {
      title: replyData.title,
      message: replyData.message,
      timestamp: new Date().toISOString(),
    };

    const updatedReplies = {
      ...ticketReplies,
      [selectedPosition]: [
        newReply,
        ...(ticketReplies[selectedPosition] || []),
      ],
    };

    setTicketReplies(updatedReplies);
    localStorage.setItem("ticketReplies", JSON.stringify(updatedReplies));

    setReplyData({ title: "", message: "" });

    setAlert({ message: "Reply added!", status: "Success" });
  };

  // ===========================
  // CLOSE TICKET
  // ===========================
  const handleCloseTicket = (id) => {
    const updated = applications.map((t) =>
      t.id === id ? { ...t, status: "Closed" } : t,
    );
    setApplications(updated);
    localStorage.setItem("ticket", JSON.stringify(updated));
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <div className="page-tools">
            <h2>Help and SupporA</h2>
          </div>
          <Breadcrumb />
        </div>
        <div className="page-tools">
          {mood === "user" && (
            <button
              className="add-button"
              onClick={() => {
                setOpen(true);
              }}
            >
              <LucidePlus /> New Ticket
            </button>
          )}
        </div>
      </div>
      <div className="dashboard-container">
        {/* TICKETS GRID */}
        <div className="plot-grid">
          {mergedTickets.map((pos) => (
            <div
              key={pos.id}
              className="user-card card"
              onClick={() => {
                setSelectedPosition(pos.id);
                setViewOpen(true);
              }}
            >
              <div className="user-card-top">
                <h4>
                  {pos.ticket}
                  <span
                    className={`status ${
                      pos.status === "Closed"
                        ? "active"
                        : pos.status === "On Going"
                          ? "pending"
                          : pos.status === "Replied"
                            ? "pending2"
                            : ""
                    }`}
                  >
                    {pos.status}
                  </span>
                </h4>
                <NiOpenEye />
              </div>

              <div className="user-card-bottom">
                <div className="user-card-bottom-left">
                  <p>Title: {pos.title}</p>
                  <p>Updated: {pos.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={selectedTicket?.ticket}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            {selectedTicket && (
              <>
                {/* DETAILS */}
                <div className="help-detail-box">
                  <h4>{selectedTicket.title}</h4>
                  <p>{selectedTicket.description}</p>
                  <small>
                    {selectedTicket.postedBy} • {selectedTicket.date}
                  </small>
                </div>

                {/* REPLIES */}
                {ticketReplies[selectedPosition]?.map((msg, i) => (
                  <div key={i} className="help-detail-box post-card">
                    <h5>{msg.title}</h5>
                    <p>{msg.message}</p>
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                ))}

                {/* ADD REPLY */}
                {selectedTicket.status !== "Closed" && (
                  <div className="post-card">
                    <h4>Add Reply</h4>
                    <div className="field">
                      <input
                        placeholder="Reply title"
                        value={replyData.title}
                        onChange={(e) =>
                          setReplyData({
                            ...replyData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="field">
                      <textarea
                        placeholder="Write reply..."
                        value={replyData.message}
                        onChange={(e) =>
                          setReplyData({
                            ...replyData,
                            message: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="modal-actions">
                      <button onClick={handleReply}>Send Reply</button>
                      {/* CLOSE */}
                      {selectedTicket.status !== "Closed" && (
                        <button
                          className="post-button"
                          onClick={() => handleCloseTicket(selectedTicket.id)}
                        >
                          Close Ticket
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </ViewModal>
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title={"Add New ticket"}
      >
        <form onSubmit={handleSubmit} className="post-card">
          <div className="field">
            <label>Title</label>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* <div className="field">
            <label>Attachments</label>
            <input
              className="search__input"
              type="file"
              name="attachments"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </div> */}

          <div className="modal-actions">
            <button type="submit">Submit Ticket</button>
          </div>
        </form>
      </AddLocationModal>
    </div>
  );
};

export default HelpCenter;
