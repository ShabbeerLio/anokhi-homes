import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LucidePlus, SquarePlus } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import "./HelpCenter.css";
import NiOpenEye from "../../icons/ni-openEye";
import ViewModal from "../../components/Modals/ViewModal";
import { useDispatch, useSelector } from "react-redux";

import {
  getHelpTickets,
  createHelpTicket,
  replyHelpTicket,
  closeHelpTicket,
} from "../../Redux/Slices/AppSlices";

const HelpCenter = ({ mood, setAlert }) => {
  const dispatch = useDispatch();

  const { helpTickets } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getHelpTickets());
  }, []);

  const mergedTickets = helpTickets || [];

  const [selectedPosition, setSelectedPosition] = useState(null);

  const selectedTicket = mergedTickets.find((t) => t._id === selectedPosition);
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

  // ===========================
  // CREATE TICKET
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createHelpTicket({
        title: formData.title,
        message: formData.message,
      }),
    );

    dispatch(getHelpTickets());

    setOpen(false);

    setFormData({
      title: "",
      message: "",
    });

    setAlert({
      message: "Ticket Created",
      status: "Success",
    });
  };

  // ===========================
  // ADD REPLY
  // ===========================
  const handleReply = async () => {
    if (!replyData.message) return;

    await dispatch(
      replyHelpTicket({
        id: selectedTicket._id,
        data: {
          title: replyData.title,
          message: replyData.message,
        },
      }),
    );

    dispatch(getHelpTickets());

    setReplyData({
      title: "",
      message: "",
    });
    setSelectedPosition(selectedTicket._id);

    setAlert({
      message: "Reply Added",
      status: "Success",
    });
  };

  // ===========================
  // CLOSE TICKET
  // ===========================
  const handleCloseTicket = async (id) => {
    await dispatch(closeHelpTicket(id));

    await dispatch(getHelpTickets());

    setViewOpen(false);

    setAlert({
      message: "Ticket Closed",
      status: "Success",
    });
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
          {mergedTickets.length === 0 ? (
            <div className="card">
              <p>No tickets found.</p>
            </div>
          ) : (
            mergedTickets.map((pos) => (
              <div
                key={pos._id}
                className="user-card card"
                onClick={() => {
                  setSelectedPosition(pos._id);
                  setViewOpen(true);
                }}
              >
                <div className="user-card-top">
                  <h4>
                    #{pos.ticketNumber}
                    <span
                      className={`status ${
                        pos.status === "closed"
                          ? "active"
                          : pos.status === "open"
                            ? "pending"
                            : "pending2"
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
                    <p>Updated: {new Date(pos.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={`#${selectedTicket?.ticketNumber || ""}`}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            {selectedTicket && (
              <>
                {/* DETAILS */}
                <div className="help-detail-box">
                  <h4>{selectedTicket.title}</h4>
                  <p>{selectedTicket.message}</p>
                  <small>
                    {selectedTicket.createdBy?.name} •{" "}
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </small>
                </div>

                {/* REPLIES */}
                {selectedTicket?.replies?.map((reply) => (
                  <div key={reply._id} className="help-detail-box post-card">
                    <h5>{reply.title}</h5>

                    <p>{reply.message}</p>

                    <small>
                      {reply.by?.name} •{" "}
                      {new Date(reply.createdAt).toLocaleString()}
                    </small>
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
                          onClick={() => handleCloseTicket(selectedTicket._id)}
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
