import { LucidePlus } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import NiSearch from "../../icons/ni-search";
import AddLocationModal from "../Modals/AddLocationModal";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import ManagementCard from "../Cards/ManagementCard";


const ITEMS_PER_PAGE = 6;

const DataTable = ({ data, actions, mood }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [agentFilter, setAgentFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [activeRow, setActiveRow] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        status: "",
        agent: "",
    });
    useEffect(() => {
        if (selectedLead) {
            setFormData({
                name: selectedLead.name,
                phone: selectedLead.phone,
                status: selectedLead.status,
                agent: selectedLead.agent,
            });
        } else {
            setFormData({
                name: "",
                phone: "",
                status: "",
                agent: "",
            });
        }
    }, [selectedLead]);

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
                 {mood === "admin" && (
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
                {/* <button className="add-button">
                    <LucidePlus />
                </button> */}
               
            </div>
            {/* <div className=" card">
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
                            style={{ cursor: "pointer" }}
                        >

                            <span className="title">{item.date}</span>
                            <span className="title">{item.name}</span>
                            <span>{item.phone}</span>

                            <span
                                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
                            >
                                {item.status}
                            </span>
                            <span>{item.agent}</span>

                            <div className="dots">
                                <span>
                                    <NiOpenEye />
                                </span>

                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveRow(activeRow === item.id ? null : item.id);
                                    }}
                                >
                                    <NiDots />
                                </span>

                                {activeRow === item.id && (
                                    <ActionModal
                                        item={item}
                                        onClose={() => setActiveRow(null)}
                                        onEdit={(lead) => {
                                            setSelectedLead(lead);
                                            setIsEditMode(true);
                                            setOpen(true);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No leads found</p>
                )}
            </div> */}
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
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
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
                <div className="field">
                    <label>Agent</label>
                    <select
                        value={formData.agent}
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
                                console.log("Update Lead:", formData);
                            } else {
                                console.log("Add Lead:", formData);
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
