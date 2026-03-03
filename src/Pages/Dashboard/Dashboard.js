import React, { useState } from "react";
import "./Dashboard.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import StaffDashboard from "../../components/Dashboard/StaffDashboard";
import AgentDashboard from "../../components/Dashboard/AgentDashboard";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import NiTool from "../../icons/ni-tool";
import NiDashboardgph from "../../icons/NiDashboardgph";
import { useNavigate } from "react-router-dom";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import RenderFormFields from "./RenderFormFields";

const Dashboard = ({ mood }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({});

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

  const renderFormFields = ({ actionType, formData, setFormData }) => {
    return <RenderFormFields actionType={actionType} formData={formData} setFormData={setFormData} />;
  }

  const quickActions = {
    admin: [
      { label: "Add Agent / Staff / User" },
      { label: "Add Project" },
      { label: "Add Booking" },
      { label: "Add Payment (Received)" },
    ],
    agent: [
      { label: "Add Lead" },
      { label: "Schedule Visit" },
    ],
    staff: [
      { label: "Approve Payment" },
      { label: "Verify Booking" },
    ],
    user: [
      { label: "Download Receipt" },
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
                onClick={() => {
                  setActionType(action.label);
                  setFormData({});
                  setIsEditMode(false);
                  setOpen(true);
                }}
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
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title={actionType}
      >
        {renderFormFields({ actionType, formData, setFormData })}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

        <div className="modal-actions">
          <button onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button onClick={() => setOpen(false)}>
            Submit
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default Dashboard;