import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";

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
          <p>Status</p>
          <p>Due Status</p>
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.project}</p>
          <p>₹{item.amount}</p>
          <p>{item.mode}</p>
          <p>{item.status}</p>
          <p>{item.dueStatus}</p>
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
            <p>₹{item.amount}</p>
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
              <p>₹{item.totalAmount || item.amount}</p>
              <p>₹{item.paidAmount || 200000}</p>
              <p>₹
                {(item.totalAmount || item.amount) -
                  (item.paidAmount || 200000)}</p>
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
              <strong>Transaction ID:</strong> TXN123456
            </p>
            <p>
              <strong>Approved By:</strong> Admin
            </p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>
          </div>

          {/* INSTALLMENT TIMELINE */}
          <div className="installment-box">
            <h5>Installment Timeline</h5>

            <div className="installment paid">
              <span>Installment 1</span>
              <span>₹1,00,000</span>
              <span>Paid</span>
            </div>

            <div className="installment partial">
              <span>Installment 2</span>
              <span>₹50,000</span>
              <span>Partial</span>
            </div>

            <div className="installment pending">
              <span>Installment 3</span>
              <span>₹50,000</span>
              <span>Pending</span>
            </div>
          </div>

          {/* PAYMENT PROGRESS */}
          <div className="payment-progress">
            <h5>Payment Progress</h5>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((item.paidAmount || 200000) /
                      (item.totalAmount || item.amount)) *
                    100
                    }%`,
                }}
              />
            </div>
          </div>
        </div>
      </ViewModal>
    </div>
  );
};

export default PaymentCard;
