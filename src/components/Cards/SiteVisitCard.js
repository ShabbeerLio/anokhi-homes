import React, { useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";

const SiteVisitCard = ({
  item,
  setSelectedVisit,
  setIsEditMode,
  setOpen,
  mood,
  dashboard,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  return (
    <div className="user-card card" onClick={dashboard || undefined}>
      <div className="user-card-top">
        <div className="user-card-title">
          <div className="user-card-name">
            <h4>
              {item.customer}
              {/* <span>({item.phone})</span> */}
              <span
                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
              >
                {item.status}
              </span>
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
              onEdit={(visit) => {
                setSelectedVisit(visit);
                setIsEditMode(true);
                setOpen(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="user-card-bottom">
        <div className="user-card-bottom-left">
          <p>Date</p>
          <p>Phone No.</p>
          <p>Agent</p>
          <p>Site</p>
          <p>Interest</p>
        </div>
        <div className="user-card-bottom-right">
          <p>{item.date}</p>
          <p>{item.phone}</p>
          <p>{item.agent}</p>
          <p>{item.site}</p>
          <p>{item.interest}</p>
        </div>
      </div>
    </div>
  );
};

export default SiteVisitCard;
