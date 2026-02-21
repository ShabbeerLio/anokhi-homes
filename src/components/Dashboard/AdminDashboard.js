import NiBooking from "../../icons/ni-booking";
import NiManagement from "../../icons/ni-management";
import NiPayments from "../../icons/ni-payments";
import NiSitevisit from "../../icons/ni-sitevisit";
import NiTeams from "../../icons/ni-teams";
import NiTool from "../../icons/ni-tool";
import DashboardCard from "../Cards/DashboardCard";
import Charts from "./Charts";

const AdminDashboard = () => {
  const revenueData = [
    { name: "Mon", revenue: 500 },
    { name: "Tue", revenue: 600 },
    { name: "Wed", revenue: 500 },
    { name: "Thu", revenue: 600 },
    { name: "Fri", revenue: 750 },
    { name: "Sat", revenue: 500 },
    { name: "Sun", revenue: 800 },
  ];

  const leadData = [
    { name: "Jan", conversion: 20 },
    { name: "Feb", conversion: 35 },
    { name: "Mar", conversion: 28 },
    { name: "Apr", conversion: 40 },
  ];

  return (
    <div className="dashboard-wrapper">
      <h4>Stats</h4>
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Revenue"
          value="₹12,50,000"
          icons={<NiPayments />}
        />
        <DashboardCard
          title="Pending Dues"
          value="₹50,000"
          icons={<NiPayments />}
        />
          <DashboardCard title="Agents Income" value="₹12,00,000" icons={<NiTeams />} />
        <DashboardCard
          title="Total Bookings"
          value="89"
          icons={<NiBooking />}
        />
        <DashboardCard title="Available Plots" value="320" icons={<NiTool />} />
        <DashboardCard title="Plots on Hold" value="12" icons={<NiTool />} />
        <DashboardCard
          title="Total Leads"
          value="100"
          icons={<NiManagement />}
        />
        <DashboardCard title="Active Agents" value="12" icons={<NiTeams />} />
      </div>



      <div className="dashboard-box">
        {/* ================= RECENT ACTIVITY ================= */}
        <div className=" dashboard-box-left">
          <h4>Recent Bookings</h4>
          <div className=" table card">
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

        {/* ================= ALERTS ================= */}
        <div className="dashboard-box-right">
          <h6 style={{ margin: "1.5rem 0 .5rem 0" }}>System Alerts</h6>
          <div className="dashboard-alerts ">
            <ul>
              <li className="alert-items danger card"> <NiSitevisit/> 3 Plots on hold expiring soon</li>
              <li className="alert-items warning card"> <NiSitevisit/> 5 Overdue payments</li>
              <li className="alert-items success card"><NiSitevisit/> 2 Unassigned leads</li>
            </ul>
          </div>
        </div>
      </div>
      {/* ================= CHARTS ================= */}
      <div className="dashboard-charts">
        <div>
          <h4>Weekly Revenue</h4>
          <div className="card">
            <Charts
              title="Weekly Revenue"
              data={revenueData}
              dataKey="revenue"
            />
          </div>
        </div>
        <div>
          <h4>Lead Conversion</h4>
          <div className="card">
            <Charts
              title="Lead Conversion"
              data={leadData}
              dataKey="conversion"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
