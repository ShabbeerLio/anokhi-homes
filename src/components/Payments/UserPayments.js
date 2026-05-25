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

const UserPayments = ({payment, mood, staffType, setAlert }) => {
  return (
    <div className="dashboard-wrapper">
      {/* <h4>Payments</h4> */}
      <PaymentTable data={payment} mood={mood} setAlert={setAlert} />
    </div>
  );
};

export default UserPayments;
