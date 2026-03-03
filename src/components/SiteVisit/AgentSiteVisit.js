import NiSitevisit from "../../icons/ni-sitevisit";
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

const AgentSiteVisit = ({ mood, setAlert }) => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        <DashboardCard title="My Visits" value="25" icons=<NiSitevisit /> />
        <DashboardCard title="Today's Visits" value="4" icons=<NiSitevisit /> />
        <DashboardCard title="Completed" value="15" icons=<NiSitevisit /> />
        <DashboardCard title="Cancelled" value="2" icons=<NiSitevisit /> />
        <DashboardCard
          title="Conversion Rate"
          value="40%"
          icons=<NiSitevisit />
        />
        <DashboardCard
          title="Upcoming Visits"
          value="3"
          icons=<NiSitevisit />
        />
      </div>
      <h4>Site Visits</h4>
      <VisitTable
        data={myVisits}
        actions={["Edit", "Update Status", "Add Feedback", "Set Interest"]}
        setAlert={setAlert}
        mood={mood}
      />
    </div>
  );
};

export default AgentSiteVisit;
