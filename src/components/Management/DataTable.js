import { LucidePlus } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NiSearch from "../../icons/ni-search";
import AddLocationModal from "../Modals/AddLocationModal";

const ITEMS_PER_PAGE = 6;

const DataTable = ({ data, actions, mood }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [agentFilter, setAgentFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

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
                        <option value="">All Status</option>
                        <option value="New">New</option>
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
                <div className="management-table table-head">
                    <span>Date</span>
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Status</span>
                    <span>Agent</span>
                    <span>Actions</span>
                </div>

                {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                        <div
                            key={item.id}
                            className="management-table table-row"
                            // onClick={() => navigate(`/user/${item.id}`, { state: item })}
                            style={{ cursor: "pointer" }}
                        >
                            {/* <span>{item.id}</span> */}

                            <span className="title">{item.date}</span>
                            <span className="title">{item.name}</span>
                            <span>{item.phone}</span>

                            <span
                                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
                            >
                                {item.status}
                            </span>
                            {/* <span>{item.status}</span> */}
                            <span>{item.agent}</span>
                            {/* <span>{item.source}</span> */}

                            <span className="dots">⋮</span>
                        </div>
                    ))
                ) : (
                    <p>No leads found</p>
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
            <AddLocationModal open={open} onClose={() => setOpen(false)} title="Add Lead">
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

export default DataTable;
