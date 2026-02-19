import DashboardCard from "../Cards/DashboardCard";
import NiPayments from "../../icons/ni-payments";
import NiTool from "../../icons/ni-tool";
import CircularProgress from "./CircularProgress";

const UserDashboard = () => {
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
          <h4>Payment History</h4>
          <div className=" table card">
            <div className="dashboard-activity table-head">
              <span>S.No.</span>
              <span>Plot</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              {/* <span>Actions</span> */}
            </div>

            <div
              // key={item.id}
              className="dashboard-activity table-row"
              // onClick={() => navigate(`/user/${item.id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              {/* <img src={item.avatar} alt="" /> */}
              <span>1</span>
              <span>A-12</span>
              <span>12 Jan 2026</span>

              <span>₹12,00,000</span>

              <span className={`status active`}>Confirmed</span>

              {/* <span className="dots">⋮</span> */}
            </div>
            <div
              // key={item.id}
              className="dashboard-activity table-row"
              // onClick={() => navigate(`/user/${item.id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              {/* <img src={item.avatar} alt="" /> */}
              <span>2</span>
              <span>A-13</span>
              <span>25 Jan 2026</span>

              <span>₹10,00,000</span>

              <span className={`status active`}>Confirmed</span>

              {/* <span className="dots">⋮</span> */}
            </div>
          </div>
          <h4>Booking Details</h4>
          <div className="booking-grid">
            <div className="card">
              <p>Plot A-12</p>
              <p>Booking Date: 12 Jan 2026</p>
            </div>
            <div className="card">
              <p>Plot A-13</p>
              <p>Booking Date: 25 Jan 2026</p>
            </div>

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
