import React, { useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";
import StaffPermission from "../../components/Permissions/StaffPermission";
import NiEdit from "../../icons/ni-edit";
import ActivityLogs from "../../components/Permissions/ActivityLogs";

/* Dummy Components */
const ProfileSettings = () => (
  <div>
    <h4>Profile Settings</h4>
    <p>
      Update name, email, avatar and contact information. <NiEdit />
    </p>
  </div>
);

const StaffPermissionManagement = () => (
  <div>
    <h4>Staff Permissions Management</h4>
    <StaffPermission />
  </div>
);

const Setting = ({ mood }) => {
  const navigate = useNavigate();

  /* ================= ROLE BASED TABS ================= */

  const TABS = useMemo(() => {
    switch (mood) {
      case "admin":
        return [
          "Profile",
          "Staff Permissions",
          "Logs",
          // "Notifications",
        ];

      case "staff":
        return ["Profile"];

      case "agent":
        return ["Profile"];

      case "user":
      default:
        return ["Profile"];
    }
  }, [mood]);

  const [activeTab, setActiveTab] = useState(TABS[0]);

  /* ================= TAB CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSettings />;

      case "Staff Permissions":
        return mood === "admin" ? <StaffPermissionManagement /> : null;

      case "Logs":
        return mood === "admin" ? <ActivityLogs /> : null;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <div className="page-tools">
            <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
            <h2>Settings</h2>
          </div>
          <Breadcrumb />
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT SIDEBAR */}
        <div className="profile-sidebar">
          <div className="profile-card card">
            <div className="profile-nav">
              {TABS.map((tab) => (
                <span
                  key={tab}
                  className={activeTab === tab ? "menu active" : "menu"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="profile-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Setting;
