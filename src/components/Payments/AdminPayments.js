import NiPayments from "../../icons/ni-payments";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import PaymentsData from "./PaymentData";
import PaymentTable from "./PaymentTable";

const AdminPayments = ({ mood, setAlert }) => {
  const totalCollection = PaymentsData.reduce(
    (sum, p) => sum + p.paidAmount,
    0,
  );

  const pendingDues = PaymentsData.reduce(
    (sum, p) => sum + (p.totalAmount - p.paidAmount),
    0,
  );

  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Collection"
          value={`₹${totalCollection.toLocaleString()}`}
          icons={<NiPayments />}
        />

        <DashboardCard
          title="This Month"
          value="₹3,50,000"
          icons=<NiPayments />
        />
        <DashboardCard
          title="Pending Dues"
          value={`₹${pendingDues.toLocaleString()}`}
          icons={<NiPayments />}
        />
        <DashboardCard title="Overdue" value="₹45,000" icons=<NiPayments /> />
        <DashboardCard
          title="Today’s Collection"
          value="₹50,000"
          icons=<NiPayments />
        />
        <DashboardCard
          title="Pending Approval"
          value="4"
          icons=<NiPayments />
        />
      </div>
      <h4>Payments</h4>
      <PaymentTable data={PaymentsData} mood={mood} setAlert={setAlert} />
      <h4>Collection Trend</h4>
      <div className="card">
        <Charts
          title="Collection Trend"
          data={[
            { month: "Monday", revenue: 200000 },
            { month: "Tuesday", revenue: 350000 },
            { month: "Wednesday", revenue: 300000 },
            { month: "Thursday", revenue: 250000 },
            { month: "Friday", revenue: 300000 },
            { month: "Saturday", revenue: 350000 },
            { month: "Sunday", revenue: 400000 },
          ]}
          dataKey="revenue"
          setAlert={setAlert}
        />
        {/* Filters */}
      </div>
    </div>
  );
};

export default AdminPayments;
