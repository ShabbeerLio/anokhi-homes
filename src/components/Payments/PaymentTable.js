import React, { useState, useMemo } from "react";
import AddLocationModal from "../Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const PaymentTable = ({ data, actions = [], mood }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((payment) => {
      const matchSearch =
        payment.client.toLowerCase().includes(search.toLowerCase()) ||
        payment.phone.includes(search);

      const matchStatus =
        statusFilter === "" || payment.status === statusFilter;

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
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        {mood === "admin" && (
          <button className="add-button" onClick={() => setOpen(true)}>
            <LucidePlus />
          </button>
        )}
      </div>
      <div className=" card">
        <div className="payment-table table-head">
          <span>Date</span>
          <span>Client</span>
          <span>Phone</span>
          <span>Project</span>
          <span>Amount</span>
          <span>Mode</span>
          <span>Status</span>
          <span>Due Status</span>
          <span>Action</span>
        </div>

        {paginated.length > 0 ? (
          paginated.map((item) => (
            <div
              key={item.id}
              className="payment-table table-row"
              // onClick={() => navigate(`/user/${item.id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              {/* <span>{item.id}</span> */}

              <span className="title">{item.date}</span>
              <span className="title">{item.client}</span>
              <span>{item.phone}</span>
              <span>{item.project}</span>
              <span>₹{item.amount}</span>
              <span>{item.mode}</span>

              <span
                className={`status ${item.status === "Approved" ? "active" : item.status === "Pending" ? "pending" : "failed"}`}
              >
                {item.status}
              </span>
              <span>{item.dueStatus}</span>
              {/* <span>{item.source}</span> */}

              <span className="dots">⋮</span>
            </div>
          ))
        ) : (
          <p>No Payment found</p>
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
          <label>Customer Name</label>
          <input placeholder="Customer Name" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input placeholder="Phone Number" />
        </div>
        <div className="field">
          <label>Status</label>
          <select>
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
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

export default PaymentTable;
