import { LucidePlus } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NiSearch from "../../icons/ni-search";
import AddLocationModal from "../Modals/AddLocationModal";
import ManagementCard from "../Cards/ManagementCard";

const ITEMS_PER_PAGE = 6;

const DataTable = ({ data, mood, setAlert }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "",
    agent: "",
  });

  useEffect(() => {
    setFormData({
      name: selectedLead?.name || "",
      phone: selectedLead?.phone || "",
      status: selectedLead?.status || "",
      agent: mood === "agent" ? "Amit" : selectedLead?.agent || "",
    });
    console.log(mood, "mood");
  }, [selectedLead, mood]);

  useEffect(() => {
    console.log(formData, "Updated formdata");
  }, [formData]);

  // 🔥 FILTER LOGIC
  const filteredData = useMemo(() => {
    return data.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchesStatus = statusFilter === "" || lead.status === statusFilter;

      const matchesAgent = agentFilter === "" || lead.agent === agentFilter;

      const matchesDate = dateFilter === "" || lead.date === dateFilter;

      return matchesSearch && matchesStatus && matchesAgent && matchesDate;
    });
  }, [search, statusFilter, agentFilter, dateFilter, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleAddLead = () => {
    console.log("Adding lead:", formData);
    setOpen(false);
    setAlert({ message: "Lead added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditLead = () => {
    console.log("Editing lead:", formData);
    setOpen(false);
    setAlert({ message: "Lead updated successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div>
      <div className="filter-grid page-tools table-filters">
        {mood !== "user" && (
          <button
            className="add-button"
            onClick={() => {
              setSelectedLead(null);
              setIsEditMode(false);
              setOpen(true);
            }}
          >
            <LucidePlus /> Add
          </button>
        )}
        <div className="searchItem">
          <NiSearch />
          <input
            placeholder="Search name / phone"
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
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Processing">Processing</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <div className="searchItem">
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
        </div>

        <div className="searchItem">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="user-card-box">
        {paginatedData.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          paginatedData.map((item) => (
            <ManagementCard
              item={item}
              setSelectedLead={setSelectedLead}
              setIsEditMode={setIsEditMode}
              setOpen={setOpen}
              mood={mood}
              setAlert={setAlert}
            />
          ))
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
        title={isEditMode ? "Edit Lead" : "Add Lead"}
      >
        <div className="field">
          <label>Customer Name</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Customer Name"
          />
        </div>
        <div className="field">
          <label>Phone</label>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone Number"
          />
        </div>
        {mood === "admin" && (
          <div className="field">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        )}

        <div className="field">
          <label>Agent</label>
          <select
            value={formData.agent}
            disabled={mood === "agent"}
            onChange={(e) =>
              setFormData({ ...formData, agent: e.target.value })
            }
          >
            <option value="">Select Agent</option>
            <option value="Amit">Amit</option>
            <option value="Sana">Sana</option>
            <option value="Raj">Raj</option>
          </select>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditLead();
              } else {
                handleAddLead();
              }
              setOpen(false);
            }}
          >
            {isEditMode ? "Update Lead" : "Add Lead"}
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default DataTable;
