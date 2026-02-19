import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./Team.css";
import DashboardCard from "../../components/Cards/DashboardCard";
import NiTeams from "../../icons/ni-teams";

const teamsData = [
  {
    id: 1,
    name: "Sales Alpha",
    leader: "Amit",
    members: ["Rahul", "Imran", "Arjun"],
    createdBy: "agent1",
  },
  {
    id: 2,
    name: "Sales Beta",
    leader: "Sana",
    members: ["Farhan", "Kiran"],
    createdBy: "agent2",
  },
];

const Teams = ({ mood }) => {
  const currentUser = { id: "agent1", name: "Amit", role: "agent" }; // Mocked current user
  const navigate = useNavigate();

  // 🔥 Role-based filtering
  const visibleTeams =
    mood === "admin" || mood === "staff"
      ? teamsData
      : teamsData.filter(
          (team) =>
            team.createdBy === currentUser?.id ||
            team.members.includes(currentUser?.name),
        );

  return (
    <div className="plot-container">
      <div className="table-filters">
        <h2>Team Management</h2>
      </div>

      <Breadcrumb />

      <div className="dashboard-wrapper">
        {/* ================= STATS ================= */}
        <div className="dashboard-grid">
          {visibleTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => navigate(`/teams/${team.id}`)}
              style={{ cursor: "pointer" }}
            >
              <DashboardCard
                title={team.name}
                value={team.members.length}
                icons={<NiTeams />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
