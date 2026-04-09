import React, { useEffect, useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";
import NiReport from "../../icons/ni-report";
import NiCross from "../../icons/ni-cross";
import NiTick from "../../icons/ni-tick";

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
  const [disapproveOpen, setDisapproveOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [panelMode, setPanelMode] = useState(null);

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

  const isApproval = item.status === "Approval";

  // Example: requested amount = next pending installment
  const requestedAmount = (() => {
    if (!bookingPaid) return bookingAmount;
    if (bookingPaid && !agreementPaid) return agreementAmount;
    if (agreementPaid && !fullPaid) return fullAmount;
    return 0;
  })();
  const pricePerSqft = item.plotArea ? Math.round(total / item.plotArea) : 0;

  useEffect(() => {
    if (!viewOpen) {
      setPanelMode(null);
      setShowReport(false);
    }
  }, [viewOpen]);

  const currentStage = (() => {
    if (!bookingPaid) return "booking";
    if (bookingPaid && !agreementPaid) return "agreement";
    if (agreementPaid && !fullPaid) return "full";
    return "completed";
  })();

  useEffect(() => {
    if (panelMode === "payment") {
      let autoAmount = "";

      if (currentStage === "booking") autoAmount = bookingAmount;
      if (currentStage === "agreement") autoAmount = agreementAmount;
      if (currentStage === "full") autoAmount = fullAmount;

      setFormData((prev) => ({
        ...prev,
        paymentType: currentStage,
        amount: autoAmount,
        totalAmount: total,
      }));
    }
  }, [panelMode]);

  return (
    <>
      {/* ================= CARD ================= */}

      <div className="user-card card" onClick={dashboard || undefined}>
        <div className="user-card-top">
          <div className="user-card-title">
            <div className="user-card-name">
              <h4>
                {item.customerId}
                <span>({item.agentId})</span>

                <span
                  className={`status ${item.status === "Confirmed"
                      ? "active"
                      : item.status === "Pending"
                        ? "pending"
                        : item.status === "Approval"
                          ? "pending2"
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

            {activeRow === item.id && mood === "admin" && (
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
            {!isApproval ? (
              <>
                <p> Final Rate</p>
                <p> Total Amount</p>
                <p> Paid</p>
                <p> Remaining</p>
              </>
            ) : (
              <>
                <p>Price/Sqft</p>
                <p>Req. Rate</p>
                <p>Total Amount</p>
                <p>Booking Payment</p>
                <p>Agreement Payment</p>
                <p>Full Payment</p>
              </>
            )}
            {/* <p>Total Amount</p> */}
            {item.status !== "Rejected" && !isApproval && (
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
            <p>
              {item.plot} {item.area}
            </p>
            {!isApproval ? (
              <>
                <p>₹500/sqft</p>
                <p>₹{total.toLocaleString()}</p>
                <p>₹{paid.toLocaleString()}</p>
                <p>₹{remaining.toLocaleString()}</p>
              </>
            ) : (
              <>
                <p>₹500 - ₹{item.pricePerSqft}/sqft</p>
                <p>₹{item.amountRequested}/sqft</p>
                <p>₹{total.toLocaleString()}</p>
                <p>08-09 Days</p>
                <p>28-30 Days</p>
                <p>30-40 Days</p>
              </>
            )}
            {/* <p>₹{total.toLocaleString()}</p> */}
            {item.status !== "Rejected" && !isApproval && (
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
        {mood === "admin" &&
          (item.status === "Scheduled" || item.status === "Approval") && (
            <div className="modal-actions">
              <button
                className="site-visit-approval status active"
                onClick={() => {
                  setAlert({
                    message: "Booking approved",
                    status: "Success",
                  });

                  setTimeout(() => setAlert(null), 3000);
                }}
              >
                <NiTick /> Approve
              </button>

              <button
                className="site-visit-approval status failed"
                onClick={() => setDisapproveOpen(true)}
              >
                <NiCross /> Disapprove
              </button>
            </div>
          )}
        {item.status === "Pending" && mood !== "user" && (
          <div class="modal-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewOpen(true);
                setPanelMode("payment");
                setShowReport(false);
              }}
            >
              Book Now
            </button>
          </div>
        )}
      </div>

      <DeleteModal
        open={disapproveOpen}
        onClose={() => setDisapproveOpen(false)}
      >
        <h4>Disapprove Booking</h4>
        <div className="field">
          <label>Notes</label>
          <textarea
            placeholder="Add Notes..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={() => {
              setAlert({
                message: "Site visit disapproved",
                status: "Success",
              });

              setDisapproveOpen(false);

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            Disapprove
          </button>
        </div>
      </DeleteModal>

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
                  onClick={() => {
                    setPanelMode("report");
                    setShowReport(true);
                  }}
                >
                  <NiReport /> {showReport ? "Hide" : "View"}
                </button>
              </div>
            )}
          </div>
        </div>
        {item.status === "Pending" && mood !== "user" && panelMode !== "payment" && (
          <div class="modal-actions">
            <button
              onClick={() => {
                setPanelMode("payment");
                setShowReport(false);
              }}
            >
              Book Now
            </button>
          </div>
        )}

        {/* ================= REPORT ================= */}
        <div className={`report-view-box-right ${panelMode ? "active" : ""}`}>
          {panelMode === "payment" && (
            <>
              <h4>Payment</h4>

              <div className="field">
                <label>Payment Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) =>
                    setFormData({ ...formData, mode: e.target.value })
                  }
                >
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="field">
                <label>Payment Type</label>

                <select
                  value={formData.paymentType}
                  disabled={currentStage !== "booking"} // 🔥 lock for agreement & full
                  onChange={(e) => {
                    const type = e.target.value;
                    const total = Number(formData.totalAmount);

                    let autoAmount = "";

                    if (type === "booking") autoAmount = total * 0.1;
                    if (type === "agreement") autoAmount = total * 0.25;
                    if (type === "full") autoAmount = total;

                    setFormData({
                      ...formData,
                      paymentType: type,
                      amount: autoAmount || formData.amount,
                    });
                  }}
                >
                  <option value="">Select Payment Type</option>
                  <option value="booking">Booking (10%)</option>
                  <option value="agreement">Agreement (30%)</option>
                  <option value="full">Full Payment</option>
                </select>
              </div>
              <div className="field">
                <label>Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  disabled={currentStage !== "booking"} // lock amount also
                />
              </div>
              <div className="field">
                <label>Valid Days for next payment</label>

                <input
                  type="number"
                  placeholder="Enter valid days (eg: 30 / 90)"
                  value={formData.validDays}
                  onChange={(e) =>
                    setFormData({ ...formData, validDays: e.target.value })
                  }
                />
              </div>
              {/* {(formData.paymentType === "agreement" ||
                formData.paymentType === "full") && (
              )} */}
              {(formData.mode === "UPI" ||
                formData.mode === "Bank Transfer") && (
                  <div className="field">
                    <label>Transaction ID *</label>
                    <input
                      placeholder="Enter Transaction ID"
                      value={formData.transactionId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transactionId: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              {(formData.mode === "UPI" ||
                formData.mode === "Cash" ||
                formData.mode === "Cheque" ||
                formData.mode === "Bank Transfer") && (
                  <div className="field">
                    <label>Attachment *</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attachment: e.target.files[0],
                        })
                      }
                    />
                  </div>
                )}
              <p>Notes : 35% cancellation charges</p>
              <div className="modal-actions">
                <button
                  onClick={() => {
                    setAlert({
                      message: "Payment submitted",
                      status: "Success",
                    });

                    setTimeout(() => setAlert(null), 3000);

                    setViewOpen(null);
                  }}
                >
                  Add Payment
                </button>
              </div>
            </>
          )}

          {panelMode === "report" && (
            <>
              <h4>Payment Timeline</h4>

              <div className="installment-box">
                {/* BOOKING */}

                <div
                  className={`installment ${bookingPaid ? "paid" : "pending"}`}
                >
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
                  <div
                    className={`installment ${fullPaid ? "paid" : "pending"}`}
                  >
                    <span>Full Payment</span>
                    <span>
                      ₹{fullAmount.toLocaleString()}(
                      {fullPaid ? "paid" : "pending"})
                    </span>
                  </div>
                )}
                {agreementPaid && (
                  <div
                    className={`installment ${fullPaid ? "paid" : "pending"}`}
                  >
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
            </>
          )}
        </div>
      </ViewModal>
    </>
  );
};

export default BookingCard;
