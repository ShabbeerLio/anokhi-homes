import React, { useMemo, useState, useEffect } from "react";
import "./Profile.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Permissions from "../../components/Tabs/Permissions";
import Overview from "../../components/Tabs/Overview";
import Report from "../../components/Tabs/Report";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Profile = ({ mood, currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  /* ================= SAFETY ================= */

  useEffect(() => {
    if (!userData) navigate("/dashboard");
  }, [userData, navigate]);

//   if (!userData) return null;

  const isOwnProfile = currentUser?.id === userData?.id;

  /* ================= TAB VISIBILITY LOGIC ================= */

  const TABS = useMemo(() => {
    const tabs = [];

    // USER PROFILE
    if (userData.user === "user") {
      if (mood === "admin" || mood === "staff" || isOwnProfile) {
        tabs.push("Overview");
      }
    }

    // AGENT PROFILE
    if (userData.user === "agent") {
      if (
        mood === "admin" ||
        mood === "staff" ||
        (mood === "agent" && isOwnProfile)
      ) {
        tabs.push("Overview", "Report");
      }
    }

    // STAFF PROFILE
    if (userData.user === "staff") {
      if (mood === "admin") {
        tabs.push("Overview", "Permissions");
      }
      if (mood === "staff" && isOwnProfile) {
        tabs.push("Overview");
      }
    }

    return tabs.length ? tabs : ["Overview"];
  }, [mood, userData, isOwnProfile]);

  const [activeTab, setActiveTab] = useState("Overview");

  /* ================= TAB CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return mood === "admin" ? (
          <>
            <h4>Permissions</h4>
            <Permissions userData={userData} />
          </>
        ) : null;

      case "Report":
        return (
          <>
            <h4>Performance Report</h4>
            <Report userData={userData} />
          </>
        );

      default:
        return (
          <>
            <h4>Overview</h4>
            <Overview userData={userData} />
          </>
        );
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
       <div className="page-head-title">
          <div className="page-tools">
            <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
            <h2>Profile Detail</h2>
          </div>
          <Breadcrumb />
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT PANEL */}
        <div className="profile-sidebar">
          <div className="profile-card card">
            <div className="profile-top">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="profile-avatar"
              />
              <h3>{userData.name}</h3>
              <p className="role">
                {userData.user}, {userData.status}
              </p>
            </div>

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

        {/* RIGHT PANEL */}
        <div className="profile-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;