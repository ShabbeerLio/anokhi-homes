import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminSiteVisit from "../../components/SiteVisit/AdminSiteVisit";
import AgentSiteVisit from "../../components/SiteVisit/AgentSiteVisit";
import StaffSiteVisit from "../../components/SiteVisit/StaffSiteVisit";
import "./SiteVisit.css";
import UserSiteVisit from "../../components/SiteVisit/UserSiteVisit";
import { LucidePlus } from "lucide-react";

const SiteVisit = ({ mood, staffType, setAlert }) => {
  const [open, setOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const renderPage = () => {
    switch (mood) {
      case "admin":
        return <AdminSiteVisit mood={mood} setAlert={setAlert} />;
      case "agent":
        return <AgentSiteVisit mood={mood} setAlert={setAlert} />;
      case "staff":
        return (
          <StaffSiteVisit
            mood={mood}
            staffType={"operations"}
            setAlert={setAlert}
          />
        );
      case "user":
        return <UserSiteVisit mood={mood} setAlert={setAlert} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  console.log(mood, "mood222");

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <h2>Site Visit</h2>
          <Breadcrumb />
        </div>
        <div className="page-tools">
          {mood === "user" && (
            <button
              className="add-button"
              onClick={() => {
                setSelectedBooking(null);
                setIsEditMode(false);
                setOpen(true);
              }}
            >
              <LucidePlus /> Support
            </button>
          )}
        </div>
      </div>
      <div className="dashboard-container">{renderPage()}</div>
    </div>
  );
};

export default SiteVisit;
