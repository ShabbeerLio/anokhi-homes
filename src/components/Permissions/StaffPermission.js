import React, { useState } from "react";
// import "./Settings.css";

/* ================= ROLE DEFAULT PERMISSIONS ================= */

const ROLE_PERMISSIONS = {
    manager: [
        "Manage Leads",
        "Assign Agents",
        "Approve Bookings",
        "View Reports",
    ],

    plot_manager: [
        "Add Plot",
        "Edit Plot",
        "Delete Plot",
        "Mark Plot Sold",
    ],

    lead_manager: [
        "Add Lead",
        "Edit Lead",
        "Delete Lead",
        "Assign Lead",
    ],

    accounts_manager: [
        "Add Payment",
        "Approve Payment",
        "Generate Invoice",
        "View Outstanding",
    ],

    operations_manager: [
        "Schedule Visit",
        "Update Visit Status",
        "Add Visit Notes",
    ],
};

/* ================= ALL EXTRA PERMISSIONS ================= */

const ALL_EXTRA_PERMISSIONS = [
    "Delete Payment",
    "Access Financial Reports",
    "Export Data",
    "Modify Commission",
    "Deactivate User",
    "Create Teams",
];

const StaffPermission = () => {
    const [activeRole, setActiveRole] = useState("manager");

    const [permissions, setPermissions] = useState(
        ROLE_PERMISSIONS[activeRole]
    );

    const togglePermission = (perm) => {
        if (permissions.includes(perm)) {
            setPermissions(permissions.filter((p) => p !== perm));
        } else {
            setPermissions([...permissions, perm]);
        }
    };

    return (
        <div>

            {/* ROLE TABS */}
            <div className="table-filters role-tabs">
                {Object.keys(ROLE_PERMISSIONS).map((role) => (
                    <button
                        key={role}
                        className={activeRole === role ? "active" : ""}
                        onClick={() => {
                            setActiveRole(role);
                            setPermissions(ROLE_PERMISSIONS[role]);
                        }}
                    >
                        {role.replace("_", " ").toUpperCase()}
                    </button>
                ))}
            </div>

            {/* DEFAULT PERMISSIONS */}
            <div className="permission-section">
                <h4>Default Role Permissions</h4>

                {ROLE_PERMISSIONS[activeRole].map((perm) => (
                    <div key={perm} className="permission-row card">
                        <span>{perm}</span>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={permissions.includes(perm)}
                                onChange={() => togglePermission(perm)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            {/* EXTRA PERMISSIONS */}
            <div className="permission-section">
                <h4>Other Permissions</h4>

                {ALL_EXTRA_PERMISSIONS.map((perm) => (
                    <div key={perm} className="permission-row card">
                        <span>{perm}</span>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={permissions.includes(perm)}
                                onChange={() => togglePermission(perm)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
            <div className="modal-actions">
                <button className="btn primary" style={{ marginTop: "20px" }}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default StaffPermission;