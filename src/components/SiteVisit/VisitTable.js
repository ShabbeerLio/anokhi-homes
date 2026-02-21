import React, { useState, useMemo } from "react";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../Modals/AddLocationModal";
// import "./SiteVisit.css";

const ITEMS_PER_PAGE = 6;

const VisitTable = ({ data, actions = [], mood }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((visit) => {
      const matchSearch =
        visit.customer.toLowerCase().includes(search.toLowerCase()) ||
        visit.phone.includes(search);

      const matchStatus = statusFilter === "" || visit.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="filter-grid page-tools table-filters">
        <div className="searchItem">
          <NiSearch />
          <input
            placeholder="Search customer / phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="searchItem">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Postponed">Postponed</option>
          </select>
        </div>
        {/* <div className="searchItem">
            <select
              value={agentFilter}
              onChange={(e) => {
                setAgentFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Agent</option>
              <option value="Amit">Amit</option>
              <option value="Sana">Sana</option>
              <option value="Raj">Raj</option>
            </select>
          </div> */}
        {/* <button className="add-button">
                    <LucidePlus />
                </button> */}
        {mood === "admin" && (
          <button className="add-button" onClick={() => setOpen(true)}>
            <LucidePlus />
          </button>
        )}
      </div>
      <div className=" card">
        <div className="sitevisit-table table-head">
          <span>Date</span>
          <span>Customer</span>
          <span>Phone</span>
          <span>Agent</span>
          <span>Site</span>
          <span>Status</span>
          <span>Interest</span>
          <span>Actions</span>
        </div>

        {paginated.length > 0 ? (
          paginated.map((item) => (
            <div
              key={item.id}
              className="sitevisit-table table-row"
              // onClick={() => navigate(`/user/${item.id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              {/* <span>{item.id}</span> */}

              <span className="title">{item.date}</span>
              <span className="title">{item.customer}</span>
              <span>{item.phone}</span>
              <span>{item.agent}</span>

              <span
                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
              >
                {item.status}
              </span>
              <span>{item.interest || "-"}</span>
              {/* <span>{item.status}</span> */}
              {/* <span>{item.source}</span> */}

              <span className="dots">⋮</span>
            </div>
          ))
        ) : (
          <p>No Visits found</p>
        )}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Lead"
      >
        <div className="field">
          <label>Date of Visit</label>
          <input placeholder="Date of Visit" />
        </div>
        <div className="field">
          <label>Customer Name</label>
          <input placeholder="Customer Name" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input placeholder="Phone Number" />
        </div>
        <div className="field">
          <label>Interest</label>
          <input placeholder="Interest" />
        </div>
        <div className="field">
          <label>Status</label>
          <select>
            <option value="">Select Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Postponed">Postponed</option>
          </select>
        </div>
        <div className="field">
          <label>Agent</label>
          <select>
            <option value="">Select Agent</option>
            <option value="Amit">Amit</option>
            <option value="Sana">Sana</option>
            <option value="Raj">Raj</option>
          </select>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button onClick={() => setOpen(false)}>Add Lead</button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default VisitTable;
