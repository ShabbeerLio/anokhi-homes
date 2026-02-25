import React, { useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";

const BookingCard = ({
  item,
  setSelectedBooking,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  const total = Number(item.amount.replace(/[₹,]/g, ""));
  const paid = Number(item.amountPaid || 0);
  const remaining = total - paid;

  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.customerId}
              <span>({item.id})</span>
              {item.status === "Paid" ? (
                <span className="status active">Paid</span>
              ) : item.status === "Pending" ? (
                <span className="status pending">Pending</span>
              ) : (
                <span className="status cancelled">Cancelled</span>
              )}
            </h4>
            {/* <p>{item.id}</p> */}
          </div>
        </div>
        <div className="dots">
          <span>
            <NiOpenEye />
          </span>
          {mood !== "user" && (
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
  );
};

export default BookingCard;
