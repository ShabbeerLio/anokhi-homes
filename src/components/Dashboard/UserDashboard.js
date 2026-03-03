import DashboardCard from "../Cards/DashboardCard";
import NiPayments from "../../icons/ni-payments";
import NiTool from "../../icons/ni-tool";
import CircularProgress from "./CircularProgress";
import PaymentCard from "../Cards/PaymentCard";
import BookingData from "../Data/BookingData";
import { Link, useNavigate } from "react-router-dom";
import BookingCard from "../Cards/BookingCard";
import { FaAngleRight } from "react-icons/fa6";

const UserDashboard = ({ mood }) => {
  const navigate = useNavigate();
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

  const handleNavigate = () => {
    navigate("/bookings");
  };

  return (
    <div className="dashboard-wrapper">
      <h4>Stats</h4>
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard title="My Plot" value="A-12" icons={<NiTool />} />
        <DashboardCard
          title="Total Paid"
          value="₹1,20,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Outstanding Amount"
          value="₹1,40,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Next Due Date"
          value="15 June 2025"
          icons={<NiPayments />}
        />
      </div>
      <div className="dashboard-box">
        {/* ================= RECENT ACTIVITY ================= */}
        <div className=" dashboard-box-left">
          <div className="dashboard-title-box">
          <h4>Payment History</h4>
            <Link to="/bookings" className="view-all"> <FaAngleRight /> View All</Link>
          </div>
          {/* <div className=" table card">
            <div className="dashboard-activity table-head">
              <span>S.No.</span>
              <span>Plot</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            <div
              className="dashboard-activity table-row"
              style={{ cursor: "pointer" }}
            >
              <span>1</span>
              <span>A-12</span>
              <span>12 Jan 2026</span>

              <span>₹12,00,000</span>

              <span className={`status active`}>Confirmed</span>

            </div>
            <div
              className="dashboard-activity table-row"
              style={{ cursor: "pointer" }}
            >
              <span>2</span>
              <span>A-13</span>
              <span>25 Jan 2026</span>

              <span>₹10,00,000</span>

              <span className={`status active`}>Confirmed</span>

            </div>
          </div> */}
          <div className="user-card-box">
            {payments.length === 0 ? (
              <p>No Bookings Found</p>
            ) : (
              payments.slice(0, 2).map((item) => (
                <PaymentCard
                  item={item}
                  // setSelectedPayment={setSelectedPayment}
                  // setIsEditMode={setIsEditMode}
                  // setOpen={setOpen}
                  mood={mood}
                  dashboard={handleNavigate}
                />
              ))
            )}
          </div>
          <div className="dashboard-title-box">
          <h4>Booking Details</h4>
            <Link to="/bookings" className="view-all"> <FaAngleRight /> View All</Link>
          </div>
          <div className="user-card-box">
            {BookingData.slice(0, 2).map((item) => (
              <BookingCard
                item={item}
                dashboard={() => handleNavigate()}
              />
            ))}
          </div>
        </div>
        <div className="dashboard-box-right">
          <h6 style={{ margin: "1.5rem 0 .5rem 0" }}>Payment Progress</h6>
          {/* <h4>Payment History</h4> */}

          <div className="circular-chart-card card">
            <CircularProgress percentage={45} centerLabel="Payment Completed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
