import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import NiDashboard from "../../icons/ni-dashboard";
import NiDashboardOutline from "../../icons/ni-dashboard-outline";
import NiTool from "../../icons/ni-tool";

function Sidebar({ closeMobile }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("dash"); // only one open at a time

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleBoth = (item) => {
    toggleMenu(item);
    closeMobile();
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <NavLink to="/" className="menu" onClick={() => handleBoth("dashboard")}>
        <NiDashboardOutline />
        {!collapsed && "Dashboard"}
      </NavLink>
      {/* Dashboards */}
      {/* <div
        className={`menu-parent ${openMenu === "dash" ? "active" : ""}`}
        onClick={() => toggleMenu("dash")}
      >
        <span>
          {openMenu === "dash" ? <NiDashboard /> : <NiDashboardOutline />}
          {!collapsed && "User"}
        </span>
        {!collapsed && (
          <span className={openMenu === "dash" ? "arrow open" : "arrow"}>
            ›
          </span>
        )}
      </div>

      {openMenu === "dash" && !collapsed && (
        <div className="submenu">
          <NavLink to="/users" className="menu" onClick={closeMobile}>
            Users
          </NavLink>
        </div>
      )} */}

      {/* Applications */}
      {/* <div
        className={`menu-parent ${openMenu === "apps" ? "active" : ""}`}
        onClick={() => toggleMenu("apps")}
      >
        <span>
          <NiTool /> {!collapsed && "Plots"}
        </span>
        {!collapsed && (
          <span className={openMenu === "apps" ? "arrow open" : "arrow"}>
            ›
          </span>
        )}
      </div>

      {openMenu === "apps" && !collapsed && (
        <div className="submenu">
          <NavLink to="/plots" className="menu" onClick={closeMobile}>
            Plots
          </NavLink>
          <NavLink to="/mail" className="menu" onClick={closeMobile}>
            Add
          </NavLink>
          <NavLink to="/todo" className="menu" onClick={closeMobile}>
            Todo
          </NavLink>
        </div>
      )} */}

      <NavLink to="/user" className="menu" onClick={() => handleBoth("user")}>
        <NiTool /> {!collapsed && "User"}
      </NavLink>
      <NavLink to="/plot" className="menu" onClick={() => handleBoth("plot")}>
        <NiTool /> {!collapsed && "Plot"}
      </NavLink>
      <NavLink to="/settings" className="menu single" onClick={closeMobile}>
        ⚙️ {!collapsed && "Settings"}
      </NavLink>
    </div>
  );
}

export default Sidebar;
