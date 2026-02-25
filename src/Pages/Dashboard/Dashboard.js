import React from "react";
import "./Dashboard.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/Dashboard/StaffDashboard";
import AgentDashboard from "../../components/Dashboard/AgentDashboard";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import NiTool from "../../icons/ni-tool";
import NiDashboardgph from "../../icons/NiDashboardgph";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ mood }) => {
  const navigate = useNavigate();

  const renderDashboard = () => {
    switch (mood) {
      case "admin":
        return <AdminDashboard />;
      case "staff":
        return <StaffDashboard />;
      case "agent":
        return <AgentDashboard />;
      case "user":
      default:
        return <UserDashboard />;
    }
  };

  const quickActions = {
    admin: [
      { label: "Add Agent", link: "/user" },
      { label: "Add Plot", link: "/plot" },
      { label: "Add Booking", link: "/bookings" },
      { label: "Add Payment (Received)", link: "/payments" },
    ],
    agent: [
      { label: "Add Lead", link: "/management" },
      { label: "Schedule Visit", link: "/site-visits" },
    ],
    staff: [
      { label: "Approve Payment", link: "/payments" },
      { label: "Verify Booking", link: "/bookings" },
    ],
    user: [
      { label: "Download Receipt", link: "/bookings" },
    ],
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <h2>Welcome {mood?.toUpperCase()}</h2>
          <Breadcrumb />
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <div className="dashboard-box-left">
            <h6>Configurations</h6>
            <div className="dashboard-box-item card">
              <div className="dashboard-box-item-left">
                <h4>Configurations of the {mood}</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, id quis delectus aliquid corporis repellendus quae quos possimus debitis quo!</p>
              </div>
              <div className="dashboard-box-item-right">
                <NiDashboardgph />
              </div>
            </div>
          </div>
          <div className="dashboard-box-right">
            <h6>Quick Actions</h6>
            {quickActions[mood]?.map((action, i) => (
              <div
                className="dashboard-box-item card"
                key={i}
                onClick={() => navigate(action.link)}
                style={{ cursor: "pointer" }}
              >
                <div className="dashboard-box-item-left">
                  <NiTool />
                </div>
                <div className="dashboard-box-item-right">
                  <h6>{action.label}</h6>
                  <p>Quick access to {action.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;