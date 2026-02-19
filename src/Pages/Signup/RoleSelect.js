import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = ({ setMood }) => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    setMood(role);
    navigate("/login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Select Role</h2>

        <button className="role-admin" onClick={() => selectRole("admin")}>Admin</button>
        <button className="role-agent" onClick={() => selectRole("agent")}>Agent</button>
        <button className="role-staff" onClick={() => selectRole("staff")}>Staff</button>
        <button className="role-user" onClick={() => selectRole("user")}>User</button>
      </div>
    </div>
  );
};

export default RoleSelect;
