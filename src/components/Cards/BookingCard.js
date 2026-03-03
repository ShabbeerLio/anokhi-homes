import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";

const BookingCard = ({
  item,
  setSelectedBooking,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
  setAlert,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const total = Number(item.amount.replace(/[₹,]/g, ""));
  const paid = Number(item.amountPaid || 0);
  const remaining = total - paid;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  useEffect(() => {
    if (!viewOpen) {
      setShowReport(false);
    }
  }, [viewOpen]);

  return (
    <>
      <div className="user-card card" onClick={dashboard || undefined}>
        <div className="user-card-top">
          <div className="user-card-title">
            <div className="user-card-name">
              <h4>
                {item.customerId}
                <span>({item.id})</span>
                {item.status === "Confirmed" ? (
                  <span className="status active">Confirmed</span>
                ) : item.status === "Pending" ? (
                  <span className="status pending">Pending</span>
                ) : (
                  <span className="status rejected">Rejected</span>
                )}
              </h4>
              {/* <p>{item.id}</p> */}
            </div>
          </div>
          <div className="dots">
            <span onClick={(e) => {
              e.stopPropagation();
              setViewOpen(true)
            }}>
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
                onEdit={(booking) => {
                  setSelectedBooking(booking);
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
            <p>Plot</p>
            <p>Amount</p>
            <p>Paid</p>
            <p>Remaining</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.plot}</p>
            <p>{item.amount}</p>
            <p>₹{item.amountPaid || 0}</p>
            <p>₹{remaining}</p>

          </div>
        </div>
      </div>
      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Booking deleted");

              setDeleteOpen(false);

              setAlert({
                message: "Booking deleted successfully!",
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
        title={item.customerId}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Plot</p>
            <p>Status</p>
            <p>Amount</p>
            <p>Paid</p>
            <p>Remaining</p>
            {item.status === "Paid" && (
              <p>Report</p>
            )}
          </div>
          <div className="user-card-bottom-right">
            <p>{item.plot}</p>
            <p>{item.status}</p>
            <p>{item.amount}</p>
            <p>₹{item.amountPaid || 0}</p>
            <p>₹{remaining}</p>
            <div className="table-filters">
              {item.status === "Paid" && (
                <button
                  className={`view-report-btn ${showReport ? "active" : ""}`}
                  onClick={() => setShowReport(!showReport)}
                >
                  <NiReport /> {showReport ? "Hide" : "View"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={`report-view-box-right ${showReport ? "active" : ""}`}>
          <h4>Booking / Sales Report</h4>

          {/* SALE SUMMARY */}
          <div className="user-card-bottom view-box">
            <div className="user-card-bottom-left">
              <p>Plot Number</p>
              <p>Total Sale Value</p>
              <p>Total Paid</p>
              <p>Sale Closed On</p>
              <p>Agent</p>
              <p>Commission</p>
            </div>

            <div className="user-card-bottom-right">
              <p>{item.plot}</p>
              <p>₹{item.amount}</p>
              <p>₹{item.amountPaid}</p>
              <p>{item.date}</p>
              <p>{item.agent || "N/A"}</p>
              <p>
                ₹
                {Math.floor((item.amountPaid || 0) * 0.05)} {/* 5% Commission */}
              </p>
            </div>
          </div>

          {/* SALES PERFORMANCE */}
          <div className="payment-details">
            <h5>Sales Performance</h5>
            <p>
              <strong>Sale Status:</strong> Completed
            </p>
            <p>
              <strong>Revenue Generated:</strong> ₹{item.amountPaid}
            </p>
            <p>
              <strong>Profit Margin:</strong> 18%
            </p>
            <p>
              <strong>Customer Type:</strong> Direct Buyer
            </p>
          </div>

          {/* VISIT → BOOKING SUMMARY */}
          <div className="installment-box">
            <h5>Conversion Details</h5>

            <div className="installment paid">
              <span>Site Visits</span>
              <span>3</span>
              <span>Successful</span>
            </div>

            <div className="installment paid">
              <span>Lead Source</span>
              <span>Marketing Campaign</span>
              <span>Converted</span>
            </div>
          </div>

          {/* SALE COMPLETION BADGE */}
          <div className="sale-complete-badge">
            🎉 Sale Successfully Completed
          </div>
        </div>
      </ViewModal>
    </>
  );
};

export default BookingCard;
