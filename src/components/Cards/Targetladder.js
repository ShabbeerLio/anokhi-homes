import React from "react";

const TargetLadder = ({ targets, agentSales }) => {
  const maxTarget = targets[targets.length - 1].targetAmount;

  const progress = Math.min((agentSales / maxTarget) * 100, 100);
  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    const diff = end - today;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days <= 0) return "Expired";

    return `${days} days remaining`;
  };

  return (
    <div className="target-ladder card">
      <div className="ladder-road">
        <div className="ladder-progress" style={{ width: `${progress}%` }} />

        <div className="ladder-agent" style={{ left: `${progress}%` }}></div>

        {targets.map((t, index) => {
          const position = (t.targetAmount / maxTarget) * 100;
          const unlocked = agentSales >= t.targetAmount;

          return (
            <div
              key={t.id}
              className={`ladder-target ${unlocked ? "unlocked" : "locked"}`}
              style={{ left: `${position}%` }}
            >
              <span className="ladder-icon">{t.icon}</span>
              <p>₹{t.targetAmount}</p>
              <p className="ladder-time">{getRemainingDays(t.endDate)}</p>
            </div>
          );
        })}
      </div>

      <div className="ladder-sales">
        <strong>Your Sales:</strong> ₹{agentSales}
      </div>
    </div>
  );
};

export default TargetLadder;
