import React, { useState } from "react";
import "./Profile.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Projectss from "../../components/Tabs/Projectss";
import Permissions from "../../components/Tabs/Permissions";
import Overview from "../../components/Tabs/Overview";

const TABS = ["Overview", "Projects", "Permissions", "Friends", "Social"];

const Profile = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const renderContent = () => {
        switch (activeTab) {
            case "Projects":
                return <Projectss />;
            case "Permissions":
                return <Permissions />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="plot-container">
            <div className="table-filters">
                <h2>Anokhi Homes</h2>
            </div>
            <Breadcrumb />
            <div className="profile-grid">
                {/* LEFT PANEL */}
                <div className="profile-sidebar">
                    <div className="profile-card card">
                        <div className="profile-top">
                        <img
                            src="https://i.pravatar.cc/150?img=32"
                            alt="Laura Ellis"
                            className="profile-avatar"
                        />
                        <h3>Laura Ellis</h3>
                        <p className="role">Executive UI/UX Designer</p>

                        <div className="profile-actions">
                            <button className="btn primary">Contact</button>
                            <button className="btn ghost">Follow</button>
                        </div>
                        </div>
                        {/* NAV */}
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
                    <div className="profile-card card">
                        <h4>Achievements</h4>
                        <div className="badge">Social Media <b>x4</b></div>
                        <div className="badge">Innovation Architect <b>x2</b></div>
                        <div className="badge">Social Butterfly <b>x2</b></div>
                    </div>
                    <div className="profile-card card">
                        <h4>Specialties</h4>
                        <div className="tags">
                            {[
                                "Architecture",
                                "Version Control",
                                "DevOps",
                                "Database",
                                "Cybersecurity",
                                "Machine Learning",
                                "Cloud Computing",
                                "API",
                                "Data Visualization",
                                "QA",
                            ].map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="profile-main">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;