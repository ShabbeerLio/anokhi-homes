import NiPayments from "../../icons/ni-payments";
import DashboardCard from "../Cards/DashboardCard";
import PaymentsData from "./PaymentData";
import PaymentTable from "./PaymentTable";

const payments = [
  {
    id: 1,
    client: "Rahul",
    phone: "9876543210",
    project: "Green City",
    amount: 50000,
    mode: "Cash",
    status: "Pending",
    dueStatus: "Partial",
    date: "2026-02-18",
  },
];

const StaffPayments = ({mood, staffType, setAlert }) => {
  return (
    <div className="dashboard-wrapper">
      {staffType === "accounts" && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Today’s Collection" value="₹50,000" icons = <NiPayments />/>
            <DashboardCard title="Pending Approval" value="4" icons = <NiPayments />/>
            <DashboardCard title="Outstanding" value="₹1,20,000" icons = <NiPayments />/>
            <DashboardCard title="This Month" value="₹3,50,000" icons = <NiPayments />/>
          </div>
          <h4>Payments</h4>
          <PaymentTable
            data={payments}
            actions={["Add Payment", "Verify", "Generate Receipt"]}
          />
        </>
      )}

      {(staffType === "marketing" || staffType === "operations") && (
        <>
          <PaymentTable data={PaymentsData} mood={mood}  setAlert={setAlert}/>
        </>
      )}
    </div>
  );
};

export default StaffPayments;
