import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import DataTable from "./DataTable";
import NiManagement from "../../icons/ni-management";

const AdminLeadManagement = ({ mood, setAlert }) => {
  const leads = [
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      status: "New",
      agent: "-",
      date: "2026-02-18",
    },
    {
      id: 2,
      name: "Imran",
      phone: "9123456789",
      status: "Converted",
      notes: [
        {
          text: "Client asked for discount",
          date: "3/16/2026, 5:27:34 PM",
          by: "Sana",
        },
        {
          text: "Client confirmed booking amount",
          date: "3/17/2026, 5:27:34 PM",
          by: "Admin",
        },
      ],
      agent: "Sana",
      date: "2026-02-17",
    },
    {
      id: 3,
      name: "Arjun",
      phone: "9988776655",
      status: "Lost",
      notes: [
        {
          text: "Client not interested anymore",
          date: "3/15/2026, 4:27:34 PM",
          by: "Amit",
        },
        {
          text: "Budget too low for project",
          date: "3/16/2026, 5:27:34 PM",
          by: "Admin",
        },
      ],
      agent: "Amit",
      date: "2026-02-17",
    },
    {
      id: 4,
      name: "Arjun",
      phone: "9988776655",
      status: "Processing",
      notes: [
        {
          text: "Client scheduled site visit",
          date: "3/14/2026, 5:27:34 PM",
          by: "Amit",
        },
        {
          text: "Waiting for client confirmation",
          date: "3/15/2026, 3:27:34 PM",
          by: "Amit",
        },
        {
          text: "Waiting for client confirmation",
          date: "3/15/2026, 3:27:34 PM",
          by: "Admin",
        },
      ],
      agent: "Amit",
      date: "2026-02-17",
    },
    {
      id: 5,
      name: "Arjun",
      phone: "9988776655",
      status: "Booking",
      notes: [
        {
          text: "Client selected plot B12",
          date: "3/14/2026, 5:27:34 PM",
          by: "Amit",
        },
        {
          text: "Booking amount discussion in progress",
          date: "3/15/2026, 5:27:34 PM",
          by: "Admin",
        },
      ],
      agent: "Amit",
      date: "2026-02-17",
    },
  ];
  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard title="Total Leads" value="120" icons=<NiManagement /> />
        <DashboardCard title="New Today" value="10" icons=<NiManagement /> />
        <DashboardCard title="Converted" value="45" icons=<NiManagement /> />
        <DashboardCard title="Lost Leads" value="20" icons=<NiManagement /> />
        <DashboardCard title="Unassigned" value="8" icons=<NiManagement /> />
        <DashboardCard
          title="Conversion Rate"
          value="37%"
          icons=<NiManagement />
        />
      </div>

      {/* Filters */}
      <h4>Leads</h4>
      <DataTable data={leads} mood={mood} setAlert={setAlert} dashboard={""} />

      {/* Performance Graph */}
      <h4>Weekly Revenue</h4>
      <div className="card">
        <Charts
          title="Lead Performance"
          data={[
            { month: "Mon", leads: 10 },
            { month: "Tue", leads: 15 },
            { month: "Wed", leads: 8 },
            { month: "Thu", leads: 20 },
          ]}
          dataKey="leads"
        />
      </div>

      {/* Actions */}
      {/* <div className="card">
        <h4>Admin Actions</h4>
        <ul>
          <li>Add Lead</li>
          <li>Edit Lead</li>
          <li>Delete Lead</li>
          <li>Assign/Reassign Agent</li>
          <li>Mark as Converted</li>
          <li>Mark as Lost</li>
          <li>Bulk Assign</li>
        </ul>
      </div> */}
    </div>
  );
};

export default AdminLeadManagement;
