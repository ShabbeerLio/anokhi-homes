import NiSitevisit from "../../icons/ni-sitevisit";
import DashboardCard from "../Cards/DashboardCard";
import VisitTable from "./VisitTable";

const myVisits = [
  {
    id: 1,
    customer: "Rahul",
    phone: "9876543210",
    agent: "Amit Kumar",
    date: "2026-02-18",
    status: "Scheduled",
    site: "Goa Colony, Mumbai",
    visitDate : "2026-02-20, 08:30 A.M"
  },
  {
    id: 2,
    customer: "Rahul",
    phone: "9876543210",
    agent: "Akash Singh",
    site: " Goa Colony, Mumbai",
    date: "2026-02-18",
    status: "Approval",
    visitDate : "2026-02-22, 08:30 A.M"
  },
];

const UserSiteVisit = ({ mood, setAlert }) => {
  return (
    <div className="dashboard-wrapper">
      {/* <h4>Site Visits</h4> */}
      <VisitTable
        data={myVisits}
        setAlert={setAlert}
        mood={mood}
      />
    </div>
  );
};

export default UserSiteVisit;
