import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiTick from "../../icons/ni-tick";
import NiCross from "../../icons/ni-cross";

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
  useEffect(() => {
    if (!viewOpen) {
      setShowReport(false);
    }
  }, [viewOpen]);

  const total = item.totalAmount || item.amount || 0;
  const paid = item.paidAmount || 0;

  const bookingAmount = total * 0.1;
  const agreementAmount = total * 0.3;
  const fullAmount = total - bookingAmount - agreementAmount;
  const progress = total ? (paid / total) * 100 : 0;

  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.client}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "Approved" ? "active" : item.status === "Pending" ? "pending" : "failed"}`}
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
          <p>Date</p>
          <p>Phone No.</p>
          <p>Project</p>
          <p>Amount</p>
          <p>Mode</p>
          <p>Due Status</p>
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.project}</p>
          <p>₹{paid.toLocaleString()}</p>
          <p>{item.mode}</p>
          <p>{item.dueStatus}</p>
        </div>
      </div>
      {mood === "admin" &&
        (item.status === "Pending") && (
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
            <p>Date</p>
            <p>Phone No.</p>
            <p>Project</p>
            <p>Amount</p>
            <p>Mode</p>
            <p>Status</p>
            <p>Due Status</p>
            <p>Report</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.date}</p>
            <p>{item.phone}</p>
            <p>{item.project}</p>
            <p>₹{item.paidAmount}</p>
            <p>{item.mode}</p>
            <p>{item.status}</p>
            <p>{item.dueStatus}</p>
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
          <h4>Payment Report</h4>

          {/* SUMMARY CARDS */}
          <div className="user-card-bottom view-box">
            <div className="user-card-bottom-left">
              <p>Total Amount</p>
              <p>Paid Amount</p>
              <p>Outstanding</p>
              <p>Due Status</p>
            </div>
            <div className="user-card-bottom-right">
              <p>₹{total}</p>
              <p>₹{paid}</p>
              <p>₹{total - paid}</p>
              <p>{item.dueStatus}</p>
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="payment-details">
            <h5>Transaction Details</h5>
            <p>
              <strong>Client:</strong> {item.client}
            </p>
            <p>
              <strong>Project:</strong> {item.project}
            </p>
            <p>
              <strong>Payment Mode:</strong> {item.mode}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {item.payments?.[0]?.transactionId || "-"}
            </p>
            <p>
              <strong>Approved By:</strong> Admin
            </p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>
          </div>

          {/* <div className="payment-history">
            <h5>Payment History</h5>

            {item.payments.map((p, i) => (
              <div key={i} className="payment-row">
                <p>
                  <strong>Type:</strong> {p.type}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{p.amount}
                </p>
                <p>
                  <strong>Mode:</strong> {p.mode}
                </p>
                <p>
                  <strong>Date:</strong> {p.date}
                </p>
                <p>
                  <strong>Txn ID:</strong> {p.transactionId}
                </p>
                <p>
                  <strong>Status:</strong> {p.status}
                </p>
                <p>
                  <strong>Attachment:</strong>{" "}
                  {p.attachment ? "View File" : "N/A"}
                </p>
              </div>
            ))}
          </div> */}

          {/* INSTALLMENT TIMELINE */}
          <div className="installment-box">
            <h5>Installment Timeline</h5>

            <div className="installment">
              <span>Booking (10%)</span>
              <span>₹{bookingAmount.toLocaleString()}</span>
            </div>

            <div className="installment">
              <span>Agreement (30%)</span>
              <span>₹{agreementAmount.toLocaleString()}</span>
            </div>

            <div className="installment">
              <span>Full Payment</span>
              <span>₹{fullAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* PAYMENT PROGRESS */}
          <div className="payment-progress">
            <h5>Payment Progress</h5>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>{Math.floor(progress)}% Paid</p>
          </div>
          <div className="payment-note">
            <strong>Note:</strong> 35% cancellation charges applicable.
          </div>
        </div>
      </ViewModal>
    </div>
  );
};

export default PaymentCard;
