import React from "react";
import formatDate from "../DateFormate/DateFormate";
import { formatCurrency } from "../Utils/FormatCurrency";

const PaymentTable = ({ index, item, mood }) => {
  return (
    <div key={item.id} className="dashboard-row">
      <span>{index + 1}</span>
      <span>{formatDate(item?.createdAt)}</span>
      <span>{item?.customer?.name}</span>
      <span>
        {item?.booking ? (
          <>
            {item?.booking?.plot?.plotNumber}, {item?.booking?.colony?.name},{" "}
            {item?.booking?.location?.name}
          </>
        ) : (
          "-"
        )}
      </span>
      <span>
        {!item?.booking ? (
          <>
            {item?.hold?.plot?.plotNumber}, {item?.hold?.colony?.name},{" "}
            {item?.hold?.location?.name}
          </>
        ) : (
          "-"
        )}
      </span>
      {mood !== "agent" && <span>{item?.agent?.name}</span>}
      <span>₹{formatCurrency(item.amount)}</span>
      <span>{item.paymentMode}</span>
      <span>{item.paymentMode !== "cash" ? item.transactionId : "-"}</span>
      <span
        className={`status ${item.status === "completed" ? "active" : item.status === "pending" ? "pending" : item.status === "approved" ? "active" : "failed"}`}
      >
        {item.status}
      </span>
    </div>
  );
};

export default PaymentTable;
