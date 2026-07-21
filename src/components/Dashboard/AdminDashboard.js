import { Link, useNavigate } from "react-router-dom";
import NiBooking from "../../icons/ni-booking";
import NiManagement from "../../icons/ni-management";
import NiPayments from "../../icons/ni-payments";
import NiSitevisit from "../../icons/ni-sitevisit";
import NiTeams from "../../icons/ni-teams";
import NiTool from "../../icons/ni-tool";
import BookingCard from "../Cards/BookingCard";
import DashboardCard from "../Cards/DashboardCard";
import BookingData from "../Data/BookingData";
import Charts from "./Charts";
import { FaAngleRight } from "react-icons/fa6";
import NiCross from "../../icons/ni-cross";
import NiInfo from "../../icons/ni-info";
import NiTick from "../../icons/ni-tick";
import {
  getAccountDetails,
  getBooking,
  getLeads,
  getPayments,
} from "../../Redux/Slices/AppSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BookingTable from "../Tables/BookingTable";
import PaymentTable from "../Tables/PaymentTable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, leads, booking, payment } = useSelector(
    (state) => state.app,
  );

  useEffect(() => {
    dispatch(getAccountDetails());
    dispatch(getLeads());
    dispatch(getBooking());
    dispatch(getPayments());
  }, []);

  const revenueData = [
    { month: "Mon", revenue: 0 },
    { month: "Tue", revenue: 0 },
    { month: "Wed", revenue: 0 },
    { month: "Thu", revenue: 0 },
    { month: "Fri", revenue: 0 },
    { month: "Sat", revenue: 0 },
    { month: "Sun", revenue: 0 },
  ];

  const leadData = [
    { month: "Jan", conversion: 0 },
    { month: "Feb", conversion: 0 },
    { month: "Mar", conversion: 0 },
    { month: "Apr", conversion: 0 },
  ];

  const handleNavigate = () => {
    navigate("/bookings");
  };

  return (
    <div className="dashboard-wrapper">
      {/* <h4>Stats</h4> */}
      {/* ================= STATS ================= */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Revenue"
          value="₹0"
          icons={<NiPayments />}
        />
        <DashboardCard title="Pending Dues" value="₹0" icons={<NiPayments />} />
        <DashboardCard title="Agents Income" value="₹0" icons={<NiTeams />} />
        <DashboardCard title="Total Bookings" value="0" icons={<NiBooking />} />
        <DashboardCard title="Available Plots" value="0" icons={<NiTool />} />
        <DashboardCard title="Plots on Hold" value="0" icons={<NiTool />} />
        <DashboardCard title="Total Leads" value="0" icons={<NiManagement />} />
        <DashboardCard title="Active Agents" value="0" icons={<NiTeams />} />
      </div>

      <div className="dashboard-box">
        {/* ================= RECENT ACTIVITY ================= */}
        <div className=" dashboard-box-left card">
          <div className="dashboard-title-box">
            <h4>Recent Bookings</h4>
            <Link to="/bookings" className="view-all">
              {" "}
              <FaAngleRight /> View All
            </Link>
          </div>
          <div className="table-box">
            <div className="table ">
              <div className="dashboard-head">
                <span>S.No</span>
                <span>Date</span>
                <span>Name</span>
                <span>Project</span>
                <span>Associate</span>
                <span>Area</span>
                <span>Price Per Sqft</span>
                <span>Request Amount</span>
                <span>Final Amount</span>
                <span>Status</span>
              </div>
              {booking.length === 0 ? (
                <p>No Bookings Found</p>
              ) : (
                booking
                  .slice(0, 5)
                  .map((item, index) => (
                    <BookingTable
                      item={item}
                      index={index}
                      dashboard={() => navigate("/bookings")}
                      mood={"user"}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
        <div className=" dashboard-box-left card">
          <div className="dashboard-title-box">
            <h4>Recent Payments</h4>
            <Link to="/payments" className="view-all">
              {" "}
              <FaAngleRight /> View All
            </Link>
          </div>
          <div className="table-box">
            <div className="table ">
              <div className="dashboard-head">
                <span>S.No</span>
                <span>Date</span>
                <span>Name</span>
                <span>Project</span>
                <span>Hold Plot</span>
                <span>Associate</span>
                <span>Amount</span>
                <span>Mode</span>
                <span>Transaction ID</span>
                <span>Status</span>
              </div>
              {payment.length === 0 ? (
                <p>No Bookings Found</p>
              ) : (
                payment
                  .slice(0, 5)
                  .map((item, index) => (
                    <PaymentTable
                      item={item}
                      index={index}
                      dashboard={() => navigate("/bookings")}
                      mood={"user"}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ================= CHARTS ================= */}
      {/* <div className="dashboard-charts">
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
      </div> */}
    </div>
  );
};

export default AdminDashboard;
