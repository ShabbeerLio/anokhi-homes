import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import NiManagement from "../../icons/ni-management";

const StaffLeadManagement = ({ staffType }) => {
  return (
    <div className="dashboard-wrapper">
      {staffType === "marketing" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Total Leads" value="120" icons = <NiManagement />/>
            <DashboardCard title="New Leads" value="10" icons = <NiManagement />/>
            <DashboardCard title="Without Follow-up" value="7" icons = <NiManagement />/>
          </div>

          {/* <div className="card">
            <h4>Marketing Actions</h4>
            <ul>
              <li>Add Lead</li>
              <li>Edit Lead</li>
              <li>Add Follow-up</li>
              <li>Assign Agent</li>
            </ul>
          </div> */}
        </>
      )}

      {staffType === "operations" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Site Visits Scheduled" value="12" />
            <DashboardCard title="Awaiting Visit" value="6" />
          </div>
        </>
      )}

      {staffType === "accounts" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="View Leads" value="120" />
            <DashboardCard title="Booking Status" value="45" />
          </div>
        </>
      )}
    </div>
  );
};

export default StaffLeadManagement;
