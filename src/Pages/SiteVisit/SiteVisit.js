import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminSiteVisit from "../../components/SiteVisit/AdminSiteVisit";
import AgentSiteVisit from "../../components/SiteVisit/AgentSiteVisit";
import StaffSiteVisit from "../../components/SiteVisit/StaffSiteVisit";
import "./SiteVisit.css";

const SiteVisit = ({ mood, staffType, setAlert }) => {
  const renderPage = () => {
    switch (mood) {
      case "admin":
        return <AdminSiteVisit mood={mood} setAlert={setAlert} />;
      case "agent":
        return <AgentSiteVisit  mood={mood} setAlert={setAlert}/>;
      case "staff":
        return <StaffSiteVisit mood={mood} staffType={"operations"} setAlert={setAlert} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  console.log(mood,"mood222")

  return (
    <div className="plot-container">
      <div className="table-filters">
         <div className="page-head-title">
        <h2>Site Visit Management</h2>
          <Breadcrumb />
        </div>
      </div>
      <div className="dashboard-container">{renderPage()}</div>
    </div>
  );
};

export default SiteVisit;
