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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (!viewOpen) setShowReport(false);
  }, [viewOpen]);

  const total = Number(item.totalAmount || 0);
  const paid = Number(item.amountPaid || 0);
  const remaining = total - paid;

  const bookingAmount = total * 0.1;
  const agreementAmount = total * 0.25;
  const fullAmount = total - bookingAmount - agreementAmount;

  const bookingPaid = paid >= bookingAmount;
  const agreementPaid = paid >= bookingAmount + agreementAmount;
  const fullPaid = paid >= total;

  const progress = total ? (paid / total) * 100 : 0;

  const getRemainingDays = (startDate, dueDays) => {
    if (!startDate || !dueDays) return dueDays;

    const start = new Date(startDate);
    const today = new Date();

    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    const remaining = dueDays - diff;

    return remaining > 0 ? remaining : 0;
  };

  return (
    <>
      {/* ================= CARD ================= */}

      <div className="user-card card" onClick={dashboard || undefined}>
        <div className="user-card-top">
          <div className="user-card-title">
            <div className="user-card-name">
              <h4>
                {item.customerId}
                <span>({item.id})</span>

                <span
                  className={`status ${
                    item.status === "Confirmed"
                      ? "active"
                      : item.status === "Pending"
                        ? "pending"
                        : "rejected"
                  }`}
                >
                  {item.status}
                </span>
              </h4>
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

            {activeRow === item.id && mood === "admin" &&  (
              <ActionModal
                item={item}
                onClose={() => setActiveRow(null)}
                onEdit={(booking) => {
                  setSelectedBooking(booking);
                  setIsEditMode(true);
                  setOpen(true);
                }}
                onDelete={() => setDeleteOpen(true)}
              />
            )}
          </div>
        </div>

        {/* ================= BOOKING SUMMARY ================= */}

        <div className="user-card-bottom">
          <div className="user-card-bottom-left">
            <p>Plot</p>
            <p>Total Amount</p>
            <p>Paid</p>
            <p>Remaining</p>
            {item.status !== "Rejected" && (
              <p className="countdown">
                {(() => {
                  if (!bookingPaid) {
                    return `Booking`;
                  }

                  if (bookingPaid && !agreementPaid) {
                    return `Agreement`;
                  }

                  if (agreementPaid && !fullPaid) {
                    return `Full Payment`;
                  }

                  return "Payment";
                })()}
              </p>
            )}
          </div>

          <div className="user-card-bottom-right">
            <p>{item.plot}</p>
            <p>₹{total.toLocaleString()}</p>
            <p>₹{paid.toLocaleString()}</p>
            <p>₹{remaining.toLocaleString()}</p>
            {item.status !== "Rejected" && (
              <p className="countdown">
                {(() => {
                  if (!bookingPaid) {
                    return `${getRemainingDays(
                      item.paymentSchedule?.booking?.date,
                      item.paymentSchedule?.agreement?.dueDays || 10,
                    )} days remaining`;
                  }

                  if (bookingPaid && !agreementPaid) {
                    return `${getRemainingDays(
                      item.paymentSchedule?.booking?.date,
                      item.paymentSchedule?.agreement?.dueDays || 30,
                    )} days remaining`;
                  }

                  if (agreementPaid && !fullPaid) {
                    return `${getRemainingDays(
                      item.paymentSchedule?.agreement?.date ||
                        item.paymentSchedule?.booking?.date,
                      item.paymentSchedule?.full?.dueDays || 90,
                    )} days remaining`;
                  }

                  return "Completed";
                })()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}

      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>

        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setDeleteOpen(false);

              setAlert({
                message: "Booking deleted successfully!",
                status: "Success",
              });

              setTimeout(() => setAlert(null), 4000);
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

      {/* ================= VIEW MODAL ================= */}

      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={item.customerId}
      >
        {/* SUMMARY */}

        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Plot</p>
            <p>Status</p>
            <p>Total</p>
            <p>Paid</p>
            <p>Remaining</p>

            {item.status === "Confirmed" && <p>Report</p>}
          </div>

          <div className="user-card-bottom-right">
            <p>{item.plot}</p>
            <p>{item.status}</p>
            <p>₹{total.toLocaleString()}</p>
            <p>₹{paid.toLocaleString()}</p>
            <p>₹{remaining.toLocaleString()}</p>

            {item.status === "Confirmed" && (
              <div className="table-filters">
                <button
                  className={`view-report-btn ${showReport ? "active" : ""}`}
                  onClick={() => setShowReport(!showReport)}
                >
                  <NiReport /> {showReport ? "Hide" : "View"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= REPORT ================= */}

        <div className={`report-view-box-right ${showReport ? "active" : ""}`}>
          <h4>Payment Timeline</h4>

          <div className="installment-box">
            {/* BOOKING */}

            <div className={`installment ${bookingPaid ? "paid" : "pending"}`}>
              <span>Booking Amount (10%)</span>
              <span>
                ₹{bookingAmount.toLocaleString()}(
                {bookingPaid ? "Paid" : "Pending"})
              </span>
            </div>

            {/* AGREEMENT */}

            {bookingPaid && (
              <div
                className={`installment ${agreementPaid ? "paid" : "pending"}`}
              >
                <span>Agreement Amount (25%)</span>
                <span>
                  ₹{agreementAmount.toLocaleString()} (
                  {agreementPaid ? "paid" : "pending"})
                </span>
              </div>
            )}
            {bookingPaid && (
              <div
                className={`installment ${agreementPaid ? "paid" : "pending"}`}
              >
                <span></span>
                <span>
                  {agreementPaid
                    ? ""
                    : `${getRemainingDays(
                        item.paymentSchedule?.booking?.date,
                        item.paymentSchedule?.agreement?.dueDays || 30,
                      )} days remaining`}
                </span>
              </div>
            )}

            {/* FULL */}

            {agreementPaid && (
              <div className={`installment ${fullPaid ? "paid" : "pending"}`}>
                <span>Full Payment</span>
                <span>
                  ₹{fullAmount.toLocaleString()}({fullPaid ? "paid" : "pending"}
                  )
                </span>
              </div>
            )}
            {agreementPaid && (
              <div className={`installment ${fullPaid ? "paid" : "pending"}`}>
                <span></span>
                <span>
                  {fullPaid
                    ? ""
                    : `${getRemainingDays(
                        item.paymentSchedule?.agreement?.date ||
                          item.paymentSchedule?.booking?.date,
                        item.paymentSchedule?.full?.dueDays || 90,
                      )} days remaining`}
                </span>
              </div>
            )}
          </div>

          {/* NOTE */}

          <div className="payment-note">
            <strong>Note:</strong> 35% cancellation charges applicable
          </div>

          {/* PROGRESS */}

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
        </div>
      </ViewModal>
    </>
  );
};

export default BookingCard;
