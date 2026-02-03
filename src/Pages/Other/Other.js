import React, { useEffect, useState } from "react";
import "./Other.css";
import SearchItems from "../../components/SearchItems/SearchItems";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const ITEMS_PER_PAGE = 12;

const DATA = [
  {
    id: 472,
    user: "staff",
    name: "Laura Ellis",
    avatar: "https://i.pravatar.cc/40?img=1",
    status: "active",
  },
  {
    id: 473,
    user: "agent",
    name: "Zoila Vittorino",
    avatar: "https://i.pravatar.cc/40?img=2",
    status: "active",
  },
  {
    id: 474,
    user: "user",
    name: "Travis Howard",
    avatar: "https://i.pravatar.cc/40?img=3",
    status: "active",
  },
  {
    id: 475,
    user: "staff",
    name: "Cindy Baker",
    avatar: "https://i.pravatar.cc/40?img=4",
    status: "inactive",
  },
  {
    id: 476,
    user: "agent",
    name: "Buck Rogers",
    avatar: "https://i.pravatar.cc/40?img=5",
    status: "inactive",
  },
  {
    id: 477,
    user: "user",
    name: "Emily Watson",
    avatar: "https://i.pravatar.cc/40?img=6",
    status: "active",
  },
  {
    id: 478,
    user: "staff",
    name: "Daniel Moore",
    avatar: "https://i.pravatar.cc/40?img=7",
    status: "active",
  },
  {
    id: 479,
    user: "agent",
    name: "Sophia Turner",
    avatar: "https://i.pravatar.cc/40?img=8",
    status: "inactive",
  },
  {
    id: 480,
    user: "user",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/40?img=9",
    status: "active",
  },
  {
    id: 481,
    user: "staff",
    name: "Olivia Brown",
    avatar: "https://i.pravatar.cc/40?img=10",
    status: "inactive",
  },
  {
    id: 482,
    user: "agent",
    name: "Ethan Wilson",
    avatar: "https://i.pravatar.cc/40?img=11",
    status: "active",
  },
  {
    id: 483,
    user: "user",
    name: "Isabella Martinez",
    avatar: "https://i.pravatar.cc/40?img=12",
    status: "active",
  },
  {
    id: 484,
    user: "staff",
    name: "Noah Anderson",
    avatar: "https://i.pravatar.cc/40?img=13",
    status: "inactive",
  },
  {
    id: 485,
    user: "agent",
    name: "Ava Thompson",
    avatar: "https://i.pravatar.cc/40?img=14",
    status: "active",
  },
  {
    id: 486,
    user: "user",
    name: "James Miller",
    avatar: "https://i.pravatar.cc/40?img=15",
    status: "inactive",
  },
];

const Other = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData =
    filter === "all" ? DATA : DATA.filter((d) => d.user === filter);

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="table-card ">
      {/* Filters */}
      <div className="table-filters">
        <h2>Users</h2>
        <div className="page-tools">
          {["all", "user", "staff", "agent"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <SearchItems />
        </div>
      </div>
      <Breadcrumb />

      {/* Table */}
      <div className="table card">
        <div className="table-head">
          <span>Image</span>
          <span>ID</span>
          <span>Name</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {currentData.map((item) => (
          <div key={item.id} className="table-row">
            <img src={item.avatar} alt="" />
            <span>{item.id}</span>

            <span className="title">{item.name}</span>
            <span>{item.user}</span>

            <span className={`status ${item.status}`}>
              {item.status === "active" ? "Active" : "In Active"}
            </span>

            <span className="dots">⋮</span>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Other;
