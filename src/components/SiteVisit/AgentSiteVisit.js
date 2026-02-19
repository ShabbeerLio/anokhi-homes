import DashboardCard from "../Cards/DashboardCard";
import VisitTable from "./VisitTable";

const myVisits = [
  {
    id: 1,
    customer: "Rahul",
    phone: "9876543210",
    agent: "Me",
    date: "2026-02-18",
    status: "Scheduled",
    interest: "Medium",
  },
];

const AgentSiteVisit = () => {
  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-grid">
        <DashboardCard title="My Visits" value="25" />
        <DashboardCard title="Today's Visits" value="4" />
        <DashboardCard title="Completed" value="15" />
        <DashboardCard title="Cancelled" value="2" />
        <DashboardCard title="Conversion Rate" value="40%" />
        <DashboardCard title="Upcoming Visits" value="3" />
      </div>
<h4>Site Visits</h4>
      <VisitTable
        data={myVisits}
        actions={[
          "Edit",
          "Update Status",
          "Add Feedback",
          "Set Interest",
        ]}
      />

    </div>
  );
};

export default AgentSiteVisit;