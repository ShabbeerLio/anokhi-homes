import NiSitevisit from "../../icons/ni-sitevisit";
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

const StaffSiteVisit = ({ mood, staffType, setAlert }) => {
  return (
    <div className="dashboard-wrapper">

      {staffType === "operations" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Today's Visits" value="12" icons = <NiSitevisit />/>
            <DashboardCard title="Pending Updates" value="5" icons = <NiSitevisit />/>
            <DashboardCard title="Completed Today" value="8" icons = <NiSitevisit />/>
            <DashboardCard title="Cancelled Today" value="2" icons = <NiSitevisit />/>
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
          <VisitTable data={visits} actions={[]} setAlert={setAlert} />
        </>
      )}

    </div>
  );
};

export default StaffSiteVisit;