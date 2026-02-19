import NiManagement from "../../icons/ni-management";
import NiPayments from "../../icons/ni-payments";
import DashboardCard from "../Cards/DashboardCard";

const StaffDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h4>Stats</h4>
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Todays Payments"
          value="₹45,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Pending Payment"
          value="₹30,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Total Outstanding"
          value="₹1,20,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="This Month Collection"
          value="₹1,40,000"
          icons={<NiPayments />}
        />
      </div>
    </div>
  );
};

export default StaffDashboard;
