import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import DataTable from "./DataTable";
import NiManagement from "../../icons/ni-management";

const AgentLeadManagement = ({ mood, setAlert }) => {
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
        <DashboardCard title="My Leads" value="25" icons=<NiManagement /> />
        <DashboardCard title="New Leads" value="5" icons=<NiManagement /> />
        <DashboardCard title="Interested" value="10" icons=<NiManagement /> />
        <DashboardCard title="Converted" value="8" icons=<NiManagement /> />
        <DashboardCard title="Lost" value="2" icons=<NiManagement /> />
        <DashboardCard
          title="Today's Follow-ups"
          value="4"
          icons=<NiManagement />
        />
      </div>

      <h4>Leads</h4>
      <DataTable
        data={myLeads}
        mood={mood}
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
