import React from "react";
import "./Tabs.css"

const Overview = ({ userData, mood }) => {
  if (!userData) return null;

  return (
    <div className="card overview-card">
      

      <div className="overview-grid">
        <div>
          <label>Full Name</label>
          <p>{userData.name}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{userData.email || "Not Provided"}</p>
        </div>

        <div>
          <label>Phone</label>
          <p>{userData.phone || "Not Provided"}</p>
        </div>

        <div>
          <label>Role</label>
          <p>{userData.user}</p>
        </div>

        <div>
          <label>Status</label>
          <p className={`status ${userData.status}`}>
            {userData.status === "active" ? "Active" : "Inactive"}
          </p>
        </div>

        <div>
          <label>Joined On</label>
          <p>{userData.joined || "—"}</p>
        </div>
      </div>

      {/* Show small stats if Agent */}
      {mood === "agent" && (
        <div className="agent-mini-stats">
          <h4>Quick Stats</h4>
          <div className="mini-grid">
            <div className="mini-box">
              <span>Total Sales</span>
              <b>₹45,00,000</b>
            </div>
            <div className="mini-box">
              <span>Bookings</span>
              <b>18</b>
            </div>
            <div className="mini-box">
              <span>Conversion</span>
              <b>42%</b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;