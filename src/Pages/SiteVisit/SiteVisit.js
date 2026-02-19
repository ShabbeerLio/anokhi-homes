import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminSiteVisit from "../../components/SiteVisit/AdminSiteVisit";
import AgentSiteVisit from "../../components/SiteVisit/AgentSiteVisit";
import StaffSiteVisit from "../../components/SiteVisit/StaffSiteVisit";
import "./SiteVisit.css";

const SiteVisit = ({ mood, staffType }) => {
  const renderPage = () => {
    switch (mood) {
      case "admin":
        return <AdminSiteVisit mood={mood} />;
      case "agent":
        return <AgentSiteVisit />;
      case "staff":
        return <StaffSiteVisit staffType={"operations"} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <h2>Site Visit Management</h2>
      </div>
      <Breadcrumb />
      <div className="dashboard-container">{renderPage()}</div>
    </div>
  );
};

export default SiteVisit;
