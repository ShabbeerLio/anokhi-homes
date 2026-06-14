import React from "react";
import "./Tabs.css";

import DashboardCard from "../Cards/DashboardCard";

import NiBooking from "../../icons/ni-booking";
import NiTool from "../../icons/ni-tool";
import NiPayments from "../../icons/ni-payments";
import NiManagement from "../../icons/ni-management";

const Report = ({ userData }) => {
  if (!userData) {
    return (
      <div className="card">
        <h4>No Data Available</h4>
      </div>
    );
  }

  return (
    <div className="agent-report">
      {/* =======================
          MLM PERFORMANCE CARDS
      ======================== */}

      <div className="report-grid">

        <DashboardCard
          title="Self Business"
          value={`₹${(
            userData.selfBusiness || 0
          ).toLocaleString()}`}
          icons={<NiManagement />}
        />

        <DashboardCard
          title="Left Business"
          value={`₹${(
            userData.leftBusiness || 0
          ).toLocaleString()}`}
          icons={<NiBooking />}
        />

        <DashboardCard
          title="Right Business"
          value={`₹${(
            userData.rightBusiness || 0
          ).toLocaleString()}`}
          icons={<NiTool />}
        />

        <DashboardCard
          title="Total Business"
          value={`₹${(
            userData.totalBusiness || 0
          ).toLocaleString()}`}
          icons={<NiPayments />}
        />

        <DashboardCard
          title="Wallet Balance"
          value={`₹${(
            userData.wallet || 0
          ).toLocaleString()}`}
          icons={<NiManagement />}
        />

        <DashboardCard
          title="Total Income"
          value={`₹${(
            userData.totalIncome || 0
          ).toLocaleString()}`}
          icons={<NiPayments />}
        />
    
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h4>Business Summary</h4>

        <div className="overview-grid">
          <div>
            <label>Self Business</label>
            <p>
              ₹{(
                userData.selfBusiness || 0
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <label>Left Business</label>
            <p>
              ₹{(
                userData.leftBusiness || 0
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <label>Right Business</label>
            <p>
              ₹{(
                userData.rightBusiness || 0
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <label>Total Business</label>
            <p>
              ₹{(
                userData.totalBusiness || 0
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;