import React, { useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiExport from "../../icons/ni-export";
import ViewModal from "../Modals/ViewModal";
import NiMedal from "../../icons/ni-medal";

const CommissionTable = ({ item, exportToExcel, mood }) => {
  const [viewOpen, setViewOpen] = useState(false);
  return (
    <>
      <div key={item.id} className="table-row commission-table">
        <span>{item.date}</span>
        <span className={item.calc.isTop ? "top-agent" : ""}>{item.agent}</span>
        <span>{item.project}</span>
        <span>₹{item.saleAmount}</span>
        <span>{item.calc.percent}%</span>
        <span>₹{item.commissionAmount}</span>
        <span>{item.cycle}</span>

        <span
          className={`status ${item.status === "Paid" ? "active" : "pending"}`}
        >
          {item.status}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          +₹
          {(
            item.calc.referralBonus +
            item.calc.cashback +
            item.calc.topBonus
          ).toFixed(0)}
          {item.calc.isTop && <NiMedal />}
        </span>
        <span className="commission-breakdown">
          ₹{item.calc.final.toFixed(0)}
        </span>
        <span>{item.calc.reward}</span>

        <div className="dots">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setViewOpen(true);
            }}
          >
            <NiOpenEye />
          </span>
          <span onClick={() => exportToExcel([item])}>
            <NiExport />
          </span>
        </div>
      </div>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={"Breakout"}
      >
        <div className="user-card-bottom view-box">
          <div className="user-card-bottom-left">
            <p>Base</p>
            <p>Referral</p>
            <p>Cashback</p>
            <p>Bonus</p>
            <p>TDS</p>
            <p>Admin Charge</p>
          </div>
          <div className="user-card-bottom-right">
            <p>{item.calc.base}</p>
            <p>{item.calc.referralBonus}</p>
            <p>{item.calc.cashback}</p>
            <p>₹{item.calc.topBonus}</p>
            <p>-₹{item.calc.tds}</p>
            <p>-₹{item.calc.adminCharge}</p>
          </div>
        </div>
        {mood === "admin" && (
          <div class="modal-actions">
            <button>Make Payment</button>
          </div>
        )}
      </ViewModal>
    </>
  );
};

export default CommissionTable;
