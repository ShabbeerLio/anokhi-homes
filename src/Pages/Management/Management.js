import React from "react";
import "./Management.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminLeadManagement from "../../components/Management/AdminLeadManagement";
import AgentLeadManagement from "../../components/Management/AgentLeadManagement";
import StaffLeadManagement from "../../components/Management/StaffLeadManagement";

const Management = ({ mood, setAlert }) => {
  const renderPage = () => {
    switch (mood) {
      case "admin":
        return <AdminLeadManagement mood={mood} setAlert={setAlert} />;
      case "agent":
        return <AgentLeadManagement />;
      case "staff":
        return <StaffLeadManagement staffType={"marketing"} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
         <div className="page-head-title">
        <h2>Lead Management</h2>
          <Breadcrumb />
        </div>
      </div>
      <div className="dashboard-container">{renderPage()}</div>
    </div>
  );
};

export default Management;
