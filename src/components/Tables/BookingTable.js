import React from "react";
import formatDate from "../DateFormate/DateFormate";
import { formatCurrency } from "../Utils/FormatCurrency";

const BookingTable = ({ index, item, mood }) => {
  return (
    <div key={item.id} className="dashboard-row">
      <span>{index + 1}</span>
      <span>{formatDate(item?.createdAt)}</span>
      <span>{item?.customer?.name}</span>
      <span>
        {item?.plot?.plotNumber}, {item?.colony?.name}, {item?.location?.name}
      </span>
      {mood !== "agent" && <span>{item?.agent?.name}</span>}
      <span>{formatCurrency(item?.plotArea)} sqft</span>
      <span>₹{item?.pricePerSqft}/sqft</span>
      <span>₹{formatCurrency(item?.requestAmount)}/sqft</span>
      <span>₹{formatCurrency(item?.finalAmount)}</span>
      <span
        className={`status ${
          item.status === "confirmed"
            ? "active"
            : item.status === "pending"
              ? "pending"
              : item.status === "approval"
                ? "pending2"
                : item.status === "rejected"
                  ? "failed"
                  : ""
        }`}
      >
        {item.status}
      </span>
    </div>
  );
};

export default BookingTable;
