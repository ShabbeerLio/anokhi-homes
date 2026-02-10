import React, { useEffect, useRef, useState } from "react";
import NiSearch from "../../icons/ni-search";
import NiMoon from "../../icons/ni-moon";
import NiSun from "../../icons/ni-sun";
import NiBell from "../../icons/ni-bell";
import NiTool from "../../icons/ni-tool";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../Modals/NotificationModal";
import SearchModal from "../Modals/SearchModal";
import MainLogo from "../../icons/MainLogo";

function Topbar({ dark, setDark, setMobileOpen, mood, setMood }) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  // const [openSearch, setOpenSearch] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();
  // const searchRef = useRef();

  // close when click outside
  useEffect(() => {
    const handler = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
        setOpenNotif(false);
        // setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    navigate("/role");
  };
  return (
    <div className="topbar">
      <div className="top-left">
        <button className="mobile-btn" onClick={() => setMobileOpen((v) => !v)}>
          ☰
        </button>
        <span className="logo"><MainLogo /></span>
      </div>

      <div className="top-right">
        <select
          className="top-mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="staf">Staff</option>
          <option value="user">User</option>
        </select>
        {/* <div
          ref={searchRef}
          onClick={() => {
            setOpenSearch(!openSearch);
            setOpenNotif(false);
            setOpenProfile(false);
          }}
        >
          <NiSearch />

          {openSearch && <SearchModal />}
        </div> */}
        <NiTool />
        <div
          className="notif"
          ref={notifRef}
          onClick={() => {
            setOpenNotif(!openNotif);
            // setOpenSearch(false);
            setOpenProfile(false);
          }}
        >
          <NiBell />
          <span>2</span>

          {openNotif && <NotificationModal />}
        </div>

        <button className="top-mood" onClick={() => setDark(!dark)}>
          {dark ? <NiSun /> : <NiMoon />}
        </button>
        {/* Profile */}
        <div
          className="profile"
          ref={profileRef}
          onClick={() => {
            setOpenProfile(!openProfile);
            setOpenNotif(false);
            // setOpenSearch(false);
          }}
        >
          <span>{mood}</span>
          <img
            src="https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=900&auto=format&fit=crop&q=60"
            alt="profile"
          />

          {openProfile && (
            <div className="profile-modal">
              <div className="pm-header">
                <img src="https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=900&auto=format&fit=crop&q=60" />
                <h4>ANOKHI HOMES</h4>
                <p>anokhihomes@gmail.com</p>
              </div>

              <div className="pm-item">Overview</div>
              <div className="pm-item">Profile</div>
              <div className="pm-item">Issues</div>
              <div className="pm-item">Projects</div>
              <div className="pm-divider" />

              <div className="pm-item">
                Mode <span>{dark ? "Dark" : "Light"}</span>
              </div>

              <div className="pm-divider" />
              <div className="pm-item">Help</div>

              <button className="pm-logout" onClick={() => handleLogout()}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
