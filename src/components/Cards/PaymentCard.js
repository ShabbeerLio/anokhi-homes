import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiTick from "../../icons/ni-tick";
import NiCross from "../../icons/ni-cross";
import NiUser from "../../icons/ni-user";
import NiBooking from "../../icons/ni-booking";
import { useNavigate } from "react-router-dom";
import NiDownload from "../../icons/ni-download";

const PaymentCard = ({
  item,
  setSelectedPayment,
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
  const navigate = useNavigate();
  useEffect(() => {
    if (!viewOpen) {
      setShowReport(false);
    }
  }, [viewOpen]);
  const paid = item.paidAmount || 0;


  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.client}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "Completed" ? "active" : item.status === "Pending" ? "pending" : "failed"}`}
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
              onEdit={(payment) => {
                setSelectedPayment(payment);
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
          <p>Payment Date</p>
          <p>Customer Phone No.</p>
          <p>Plot</p>
          <p>Amount</p>
          <p>Mode</p>
          {/* <p>Due Status</p> */}
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.project}</p>
          <p>₹{paid.toLocaleString()}</p>
          <p>{item.mode}</p>
          {/* <p>{item.dueStatus}</p> */}
        </div>
      </div>
      {mood === "admin" && item.status === "Pending" && (
        <div className="modal-actions">
          <button
            className="site-visit-approval status active"
            onClick={() => {
              setAlert({
                message: "Payment approved",
                status: "Success",
              });

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            <NiTick /> Approve
          </button>

          <button
            className="site-visit-approval status failed"
            onClick={() => {
              setAlert({
                message: "Payment disapproved",
                status: "failed",
              });

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            <NiCross /> Disapprove
          </button>
        </div>
      )}
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
        title={item.client}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Payment Date</p>
            <p>Plot</p>
            <p>Amount Paid</p>
            <p>Mode</p>
            <p>Status</p>
            <p>Report</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.project}</p>
            <p>₹{item.paidAmount}</p>
            <p>{item.mode}</p>
            <p>{item.status}</p>
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
        <div className="table-filters">
          {mood !== "user" && (
            <button
              className="view-report-btn "
              onClick={() => {
                // navigate(`/user/474`);
              }}
            >
              <NiUser /> Customer Details
            </button>
          )}

          <button className="view-report-btn " onClick={() => { }}>
            <NiBooking /> Booking Details
          </button>
        </div>
        <div className={`report-view-box-right ${showReport ? "active" : ""}`}>
          {/* PAYMENT DETAILS */}
          <div className="payment-details">
            <h5
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
              Transaction Details
              <span className="download-btn"><NiDownload /></span>
            </h5>

            <p>
              <strong>Transaction ID:</strong>{" "}
              {item.payments?.[0]?.transactionId || "-"}
            </p>
            <p>
              <strong>Added By:</strong> Admin
            </p>
            <p>
              <strong>Completed By:</strong> Admin
            </p>
            <p>
              <strong>Completed Date:</strong> {item.date}
            </p>
          </div>

          {/* PAYMENT PROGRESS */}
          {/* <div className="payment-progress">
            <h5>Payment Progress</h5>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>{Math.floor(progress)}% Paid</p>
          </div> */}
          <div className="payment-note" style={{ marginTop: "1rem" }}>
            <strong>Note:</strong> 35% cancellation charges applicable.
          </div>
        </div>
      </ViewModal>
    </div>
  );
};

export default PaymentCard;
