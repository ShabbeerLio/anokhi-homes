import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import DataTable from "./DataTable";

const AdminLeadManagement = ({ mood }) => {
    const leads = [
        {
            id: 1,
            name: "Rahul",
            phone: "9876543210",
            status: "New",
            agent: "Amit",
            date: "2026-02-18",
        },
        {
            id: 2,
            name: "Imran",
            phone: "9123456789",
            status: "Converted",
            agent: "Sana",
            date: "2026-02-17"
        },
        {
            id: 3,
            name: "Arjun",
            phone: "9988776655",
            status: "Lost",
            agent: "Amit",
            date: "2026-02-17",
        },
    ];
    return (
        <div className="dashboard-wrapper">
            {/* ================= STATS ================= */}
            <div className="dashboard-grid">
                <DashboardCard title="Total Leads" value="120" />
                <DashboardCard title="New Today" value="10" />
                <DashboardCard title="Converted" value="45" />
                <DashboardCard title="Lost Leads" value="20" />
                <DashboardCard title="Unassigned" value="8" />
                <DashboardCard title="Conversion Rate" value="37%" />
            </div>

            {/* Filters */}
            <h4>Leads</h4>
            <DataTable
                data={leads}
                actions={["Edit", "Delete", "Assign", "Convert", "Mark Lost"]}
                mood={mood}
            />

            {/* Performance Graph */}
            <h4>Weekly Revenue</h4>
            <div className="card">
                <Charts
                    title="Lead Performance"
                    data={[
                        { name: "Mon", leads: 10 },
                        { name: "Tue", leads: 15 },
                        { name: "Wed", leads: 8 },
                        { name: "Thu", leads: 20 },
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
