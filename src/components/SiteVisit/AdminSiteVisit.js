import NiSitevisit from "../../icons/ni-sitevisit";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import VisitTable from "./VisitTable";

const visits = [
  {
    id: 1,
    customer: "Rahul",
    phone: "9876543210",
    agent: "Amit",
    site: "B-198, Goa Colony",
    date: "2026-02-18",
    status: "Completed",
    interest: "High",
  },
];

const AdminSiteVisit = ({ mood }) => {
  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard title="Total Visits" value="120" icons = <NiSitevisit /> />
        <DashboardCard title="Today's Visits" value="12" icons = <NiSitevisit /> />
        <DashboardCard title="Total Completed" value="80" icons = <NiSitevisit /> />
        <DashboardCard title="Total Resheduled" value="5" icons = <NiSitevisit /> />
        <DashboardCard title="Total Cancelled" value="10" icons = <NiSitevisit /> />
        <DashboardCard title="Conversion %" value="45%" icons = <NiSitevisit /> />
        <DashboardCard title="Agent-wise Visits" value="8 Agents" icons = <NiSitevisit /> />
      </div>
      {/* Filters */}
      <h4>Site Visits</h4>
      <VisitTable
        data={visits}
        actions={[
          "Edit",
          "Delete",
          "Reassign",
          "Change Status",
          "Convert Booking",
        ]}
        mood={mood}
      />
      <h4>Monthly Revenue</h4>
      <div className="card">
        <Charts
          title="Monthly Visit Trend"
          data={[
            { name: "Jan", visits: 20 },
            { name: "Feb", visits: 35 },
            { name: "Mar", visits: 28 },
          ]}
          dataKey="visits"
        />
      </div>
    </div>
  );
};

export default AdminSiteVisit;
