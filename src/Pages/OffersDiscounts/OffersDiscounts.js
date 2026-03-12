import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./OffersDiscounts.css";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";

import OffersCard from "../../components/Cards/OffersCard";
import TargetCard from "../../components/Cards/TargetCard";

import OffersDiscoountData from "./OffersDiscountData";
import AgentTargetsData from "./AgentTargetsData";
import TargetLadder from "../../components/Cards/Targetladder";

const ITEMS_PER_PAGE = 15;

const OffersDiscounts = ({ mood, setAlert }) => {
    const [tab, setTab] = useState("offers");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [open, setOpen] = useState(false);
    const [selectedOffers, setSelectedOffers] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (selectedOffers) {
            setFormData(selectedOffers);
        } else {
            setFormData({});
        }
    }, [selectedOffers]);

    /* ---------- TAB DATA ---------- */

    const tabData = useMemo(() => {

        /* ---------- OFFERS ---------- */

        if (tab === "offers") {

            let offers = OffersDiscoountData.filter((d) => d.priceValue);

            if (mood !== "admin" && mood !== "staff") {
                offers = offers.filter(
                    (d) => d.userType.includes(mood) && d.status === "active"
                );
            }

            return offers;
        }

        /* ---------- DISCOUNTS ---------- */

        if (tab === "discounts") {

            let discounts = OffersDiscoountData.filter((d) => d.amount);

            if (mood === "user") {
                discounts = discounts.filter((d) => d.status === "active");
            }

            return discounts;
        }

        /* ---------- TARGETS ---------- */

        if (tab === "targets") {

            if (mood === "user") return [];

            if (mood === "agent") {
                return AgentTargetsData.filter((t) => t.status === "active");
            }

            return AgentTargetsData;
        }

    }, [tab, mood]);

    /* ---------- SEARCH ---------- */

    const filtered = useMemo(() => {
        return tabData.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search, tabData]);

    /* ---------- PAGINATION ---------- */

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
    );

    /* ---------- SAVE ---------- */

    const handleSubmit = () => {
        const data = { ...formData };

        if (tab === "discounts") {
            data.userType = ["user"];
        }

        console.log("DATA", data);

        setAlert({
            message: isEditMode ? "Updated Successfully" : "Added Successfully",
            status: "Success",
        });

        setTimeout(() => setAlert(null), 4000);

        setOpen(false);
    };

    return (
        <div className="plot-container">
            {/* HEADER */}

            <div className="table-filters">
                <div className="page-head-title">
                    <h2>Offers & Discounts</h2>
                    <Breadcrumb />
                </div>

                <div className="page-tools">
                    {mood === "admin" && (
                        <button
                            className="add-button"
                            onClick={() => {
                                setSelectedOffers(null);
                                setIsEditMode(false);
                                setFormData({});
                                setOpen(true);
                            }}
                        >
                            <LucidePlus /> Add
                        </button>
                    )}

                    <div className="searchItem">
                        <NiSearch />
                        <input
                            placeholder="Search title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* TABS */}

                    <div className="filter-buttons">
                        <button
                            className={tab === "offers" ? "active" : ""}
                            onClick={() => setTab("offers")}
                        >
                            Offers
                        </button>

                        {mood !== "agent" && (
                            <button
                                className={tab === "discounts" ? "active" : ""}
                                onClick={() => setTab("discounts")}
                            >
                                Discounts
                            </button>
                        )}

                        {/* Targets hidden for users */}

                        {mood !== "user" && (
                            <button
                                className={tab === "targets" ? "active" : ""}
                                onClick={() => setTab("targets")}
                            >
                                Targets
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* CARDS */}
            {tab === "targets" && mood === "agent" && (
                <>
                    <h4>Sales Target Ladder</h4>
                    <TargetLadder
                        targets={AgentTargetsData}
                        agentSales={120000}
                    />
                </>
            )}

            <div className="user-card-box">
                {paginated.map((item) =>
                    tab === "targets" ? (
                        <TargetCard key={item.id} item={item}
                            agentSales={30000}
                            setSelectedOffers={setSelectedOffers}
                            setIsEditMode={setIsEditMode}
                            setOpen={setOpen}
                            mood={mood}
                            setAlert={setAlert} />
                    ) : (
                        <OffersCard
                            key={item.id}
                            item={item}
                            setSelectedOffers={setSelectedOffers}
                            setIsEditMode={setIsEditMode}
                            setOpen={setOpen}
                            mood={mood}
                            setAlert={setAlert}
                        />
                    ),
                )}
            </div>

            {/* PAGINATION */}

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
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>

            {/* MODAL */}

            <AddLocationModal
                open={open}
                onClose={() => setOpen(false)}
                title={`${isEditMode ? "Edit" : "Add"} ${tab === "offers"
                    ? "Offer"
                    : tab === "discounts"
                        ? "Discount"
                        : "Target"
                    }`}
            >
                {/* TITLE */}

                <div className="field">
                    <label>Title</label>
                    <input
                        value={formData.title || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                </div>

                {/* DESCRIPTION */}

                <div className="field">
                    <label>Description</label>
                    <textarea
                        value={formData.description || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />
                </div>
                {tab === "offers" && (
                    <div className="field">
                        <label>User Type</label>

                        <div className="checkbox-group">

                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.userType?.includes("user") || false}
                                    onChange={(e) => {

                                        const updated = e.target.checked
                                            ? [...(formData.userType || []), "user"]
                                            : formData.userType.filter((t) => t !== "user");

                                        setFormData({ ...formData, userType: updated });

                                    }}
                                />
                                User
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.userType?.includes("agent") || false}
                                    onChange={(e) => {

                                        const updated = e.target.checked
                                            ? [...(formData.userType || []), "agent"]
                                            : formData.userType.filter((t) => t !== "agent");

                                        setFormData({ ...formData, userType: updated });

                                    }}
                                />
                                Agent
                            </label>

                        </div>
                    </div>
                )}
                <div className="field">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={formData.startDate || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, startDate: e.target.value })
                        }
                    />
                </div>

                <div className="field">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={formData.endDate || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, endDate: e.target.value })
                        }
                    />
                </div>

                {/* OFFER */}

                {tab === "offers" && (
                    <div className="field">
                        <label>Price Value</label>
                        <input
                            type="number"
                            value={formData.priceValue || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, priceValue: e.target.value })
                            }
                        />
                    </div>
                )}

                {/* DISCOUNT */}

                {tab === "discounts" && (
                    <>
                        <div className="field">
                            <label>Discount</label>
                            <input
                                type="number"
                                value={formData.amount || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount: e.target.value })
                                }
                            />
                        </div>

                        <div className="field">
                            <label>Type</label>
                            <select
                                value={formData.type || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value })
                                }
                            >
                                <option value="">Select</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>Terms</label>
                            <textarea
                                value={formData.terms || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, terms: e.target.value })
                                }
                            />
                        </div>

                    </>
                )}

                {/* TARGET */}

                {tab === "targets" && (
                    <>
                        <div className="field">
                            <label>Target Amount</label>
                            <input
                                type="number"
                                value={formData.targetAmount || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, targetAmount: e.target.value })
                                }
                            />
                        </div>

                        <div className="field">
                            <label>Reward</label>

                            <input
                                value={formData.reward || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, reward: e.target.value })
                                }
                            />
                        </div>

                    </>
                )}
                <div className="field">
                            <label>Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                            >
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="modal-actions">
                    <button onClick={handleSubmit}>
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </div>
            </AddLocationModal>
        </div>
    );
};

export default OffersDiscounts;
