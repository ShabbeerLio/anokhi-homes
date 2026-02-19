import DashboardCard from "../Cards/DashboardCard";
import Charts from "../Dashboard/Charts";
import PaymentTable from "./PaymentTable";

const payments = [
  {
    id: 1,
    client: "Rahul",
    phone: "9876543210",
    project: "Green City",
    amount: 50000,
    mode: "Online",
    status: "Approved",
    dueStatus: "Paid",
    date: "2026-02-18",
  },
];

const AdminPayments = ({ mood }) => {
  return (
    <div className="dashboard-wrapper">
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard title="Total Collection" value="₹12,00,000" />
        <DashboardCard title="This Month" value="₹3,50,000" />
        <DashboardCard title="Pending Dues" value="₹1,20,000" />
        <DashboardCard title="Overdue" value="₹45,000" />
        <DashboardCard title="Today’s Collection" value="₹50,000" />
        <DashboardCard title="Pending Approval" value="4" />
      </div>
      <h4>Payments</h4>
      <PaymentTable
        data={payments}
        actions={[
          "Edit",
          "Delete",
          "Approve",
          "Reject",
          "Generate Invoice",
          "Generate Receipt",
        ]}
        mood={mood}
      />
      <h4>Collection Trend</h4>
      <div className="card">
        <Charts
          title="Collection Trend"
          data={[
            { name: "Monday", revenue: 200000 },
            { name: "Tuesday", revenue: 350000 },
            { name: "Wednesday", revenue: 300000 },
            { name: "Thursday", revenue: 250000 },
            { name: "Friday", revenue: 300000 },
            { name: "Saturday", revenue: 350000 },
            { name: "Sunday", revenue: 400000 },
          ]}
          dataKey="revenue"
        />
        {/* Filters */}
      </div>
    </div>
  );
};

export default AdminPayments;
