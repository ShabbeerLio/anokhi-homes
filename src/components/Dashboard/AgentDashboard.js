import DashboardCard from "../Cards/DashboardCard";
import NiBooking from "../../icons/ni-booking";
import NiManagement from "../../icons/ni-management";
import NiPayments from "../../icons/ni-payments";
import NiSitevisit from "../../icons/ni-sitevisit";
import Charts from "./Charts";

const salesData = [
  { name: "Jan", sales: 2 },
  { name: "Feb", sales: 5 },
  { name: "Mar", sales: 3 },
  { name: "Apr", sales: 6 },
];

const AgentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h4>Stats</h4>
      {/* Top Cards */}
      <div className="dashboard-grid">
        <DashboardCard title="My Leads" value="8" icons={<NiManagement />} />
        <DashboardCard title="My Bookings" value="15" icons={<NiBooking />} />
        <DashboardCard title="Total Sales" value="15" icons={<NiPayments />} />
        <DashboardCard
          title="Commission Earned"
          value="₹2,40,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Pending Commission"
          value="₹40,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Today's Follow-ups"
          value="4"
          icons={<NiSitevisit />}
        />
      </div>
      <div className="dashboard-box">
        {/* ================= RECENT ACTIVITY ================= */}
        <div className=" dashboard-box-left">
          <h4>Recent Bookings</h4>
          <div className="table card">
            <div className="dashboard-activity table-head">
              <span>S.No.</span>
              <span>Plot</span>
              <span>Customer</span>
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
              <span>Rahul</span>

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
              <span>Raj</span>

              <span>₹10,00,000</span>

              <span className={`status pending`}>Pending</span>

              {/* <span className="dots">⋮</span> */}
            </div>
          </div>
        </div>
        <div className=" dashboard-box-right">
          <h6 style={{ margin: "1.5rem 0 .5rem 0" }}>Upcoming Site Visits</h6>
          <div className="dashboard-alerts ">
            <ul>
              <li className="alert-items card"><NiSitevisit/> Rahul - Plot A12 - 4 PM</li>
              <li className="alert-items card"><NiSitevisit/> Imran - Plot B5 - 6 PM</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Sections */}
      <div className="dashboard-charts">
        <div>
          <h4>Weekly Revenue</h4>
          <div className="card">
            <Charts title="My Monthly Sales" data={salesData} dataKey="sales" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
