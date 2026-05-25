import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import DataTable from "./DataTable";
import NiManagement from "../../icons/ni-management";

const AdminLeadManagement = ({ leads, mood, setAlert }) => {
  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Leads"
          value={leads?.length}
          icons=<NiManagement />
        />
        <DashboardCard title="New Today" value={leads?.filter((lead) => lead.status === "new").length} icons=<NiManagement /> />
        <DashboardCard title="Converted" value={leads?.filter((lead) => lead.status === "converted").length} icons=<NiManagement /> />
        <DashboardCard title="Lost Leads" value={leads?.filter((lead) => lead.status === "lost").length} icons=<NiManagement /> />
        <DashboardCard title="Unassigned" value={leads?.filter((lead) => lead.status === "unassigned").length} icons=<NiManagement /> />
        <DashboardCard
          title="Conversion Rate"
          value="37%"
          icons=<NiManagement />
        />
      </div>

      {/* Filters */}
      <h4>Leads</h4>
      <DataTable  data={leads}  mood={mood} setAlert={setAlert} dashboard={""} />

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
    </div>
  );
};

export default AdminLeadManagement;
