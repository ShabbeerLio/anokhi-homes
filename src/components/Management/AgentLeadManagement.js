import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import DataTable from "./DataTable";

const AgentLeadManagement = () => {
  const myLeads = [
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      status: "New",
      agent: "Me",
      date: "2026-02-18",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard title="My Leads" value="25" />
        <DashboardCard title="New Leads" value="5" />
        <DashboardCard title="Interested" value="10" />
        <DashboardCard title="Converted" value="8" />
        <DashboardCard title="Lost" value="2" />
        <DashboardCard title="Today's Follow-ups" value="4" />
      </div>

      <h4>Leads</h4>
      <DataTable
        data={myLeads}
        actions={["Edit", "Update Status", "Follow-up", "Convert"]}
      />

      {/* Agent Actions */}
      {/* <div className="card">
        <h4>My Actions</h4>
        <ul>
          <li>Add Lead</li>
          <li>Edit Lead</li>
          <li>Update Status</li>
          <li>Add Follow-up</li>
          <li>Schedule Site Visit</li>
          <li>Mark as Converted</li>
        </ul>
      </div> */}
    </div>
  );
};

export default AgentLeadManagement;
