import DashboardCard from "../Cards/DashboardCard";
import VisitTable from "./VisitTable";


const visits = [
  {
    id: 1,
    customer: "Rahul",
    phone: "9876543210",
    agent: "Amit",
    date: "2026-02-18",
    status: "Scheduled",
  },
];

const StaffSiteVisit = ({ staffType }) => {
  return (
    <div className="dashboard-wrapper">

      {staffType === "operations" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Today's Visits" value="12" />
            <DashboardCard title="Pending Updates" value="5" />
            <DashboardCard title="Completed Today" value="8" />
            <DashboardCard title="Cancelled Today" value="2" />
          </div>
<h4>Site Visits</h4>
          <VisitTable
            data={visits}
            actions={[
              "Add Visit",
              "Update Status",
              "Reschedule",
            ]}
          />
        </>
      )}

      {staffType === "marketing" && (
        <>
          <VisitTable data={visits} actions={[]} />
        </>
      )}

    </div>
  );
};

export default StaffSiteVisit;