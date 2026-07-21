import React from "react";
import formatDate from "../DateFormate/DateFormate";
import { formatCurrency } from "../Utils/FormatCurrency";

const TopPerformer = ({ index, item, mood }) => {
  return (
    <div key={item.id} className="dashboard-row">
      <span className="top-number">{index + 1}</span>
      <span>
        {index === 0 && "🏆 "}
        {item.name}
      </span>
      <span>₹{formatCurrency(item.totalIncome || 0)}</span>
    </div>
  );
};

export default TopPerformer;
