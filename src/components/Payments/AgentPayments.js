import NiPayments from "../../icons/ni-payments";
import DashboardCard from "../Cards/DashboardCard";
import PaymentTable from "./PaymentTable";

const myPayments = [
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

const AgentPayments = ({setAlert}) => {
  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-grid">
        <DashboardCard title="My Clients Paid" value="₹5,00,000" icons = <NiPayments />/>
        <DashboardCard title="Outstanding" value="₹80,000" icons = <NiPayments />/>
        <DashboardCard title="This Month" value="₹1,20,000" icons = <NiPayments />/>
        <DashboardCard title="Overdue Clients" value="3" icons = <NiPayments />/>
      </div>
<h4>Payments</h4>
      <PaymentTable
        data={myPayments}
        actions={[
          "View Details",
          "Download Receipt",
          "Send Reminder",
        ]}
        setAlert={setAlert}
      />

    </div>
  );
};

export default AgentPayments;