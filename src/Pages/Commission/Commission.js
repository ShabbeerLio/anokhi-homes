import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Commission.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NiSearch from "../../icons/ni-search";
import CommissionTable from "../../components/Cards/CommissionTable";
import NiExport from "../../icons/ni-export";
import ViewModal from "../../components/Modals/ViewModal";

const ITEMS_PER_PAGE = 15;
const commissionData = [
    {
        id: "COM001",
        agent: "Rahul Sharma",
        role: "agent",
        project: "Green City",
        saleAmount: 500000,
        commissionPercent: 5,
        commissionAmount: 25000,
        date: "2026-03-01",
        cycle: "1st",
        status: "Paid",


        referral: true,
        fullPaymentDate: "2026-03-20",
    },
    {
        id: "COM002",
        agent: "Imran Khan",
        role: "agent",
        project: "Sunshine Colony",
        saleAmount: 800000,
        commissionPercent: 6,
        commissionAmount: 48000,
        date: "2026-03-16",
        cycle: "16th",
        status: "Pending",
        referral: false,
    },
    {
        id: "COM003",
        agent: "Arjun Mehta",
        role: "agent",
        project: "Palm Residency",
        saleAmount: 600000,
        commissionPercent: 5,
        commissionAmount: 30000,
        date: "2026-02-01",
        cycle: "1st",
        status: "Paid",
        referral: false,
    },
    {
        id: "COM004",
        agent: "Rahul Sharma",
        role: "agent",
        project: "Skyline Villas",
        saleAmount: 900000,
        commissionPercent: 7,
        commissionAmount: 63000,
        date: "2026-02-16",
        cycle: "16th",
        status: "Pending",
        referral: false,
    },
];

const Commission = ({ mood }) => {
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [cycleFilter, setCycleFilter] = useState("");
    const [page, setPage] = useState(1);
    const [monthFilter, setMonthFilter] = useState("");
    const [agentFilter, setAgentFilter] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [exportFilters, setExportFilters] = useState({
        agent: "",
        month: "",
        cycle: "",
    });

    const modalRef = useRef(null);

    const [config, setConfig] = useState({
        tdsPercent: 2,
        adminPercent: 5,
        referralPercent: 2,
        cashbackPercent: 2,
        cashbackDays: 60,
    });
    const [levels, setLevels] = useState([
        { level: 1, min: 0, max: 1000000, percent: 5, label: "Silver Associate", reward: "Smartphone (20K)" },
        { level: 2, min: 1000001, max: 2500000, percent: 6, label: "Gold Associate", reward: "Tablet (30K)" },
        { level: 3, min: 2500001, max: 5000000, percent: 7, label: "Platinum Associate", reward: "OLED TV 55 (50K)" },
        { level: 4, min: 5000001, max: 10000000, percent: 8, label: "Titanium Associate", reward: "1 Lakh" },
        { level: 5, min: 10000001, max: 20000000, percent: 9, label: "Crystal Associate", reward: "2 Lakh" },
        { level: 6, min: 20000001, max: 40000000, percent: 10, label: "Amber Associate", reward: "4 Lakh" },
        { level: 7, min: 40000001, max: 60000000, percent: 11, label: "Sapphire Director", reward: "6 Lakh" },
        { level: 8, min: 60000001, max: 80000000, percent: 12, label: "Topaz Director", reward: "8 Lakh" },
        { level: 9, min: 80000001, max: 100000000, percent: 13, label: "Emerald Director", reward: "10 Lakh" },
        { level: 10, min: 100000001, max: 120000000, percent: 14, label: "Ruby Director", reward: "12 Lakh" },
        { level: 11, min: 120000001, max: 140000000, percent: 15, label: "Diamond Director", reward: "14 Lakh" },
        { level: 12, min: 140000001, max: 170000000, percent: 16, label: "Crown Director", reward: "17 Lakh" },
        { level: 13, min: 170000001, max: 200000000, percent: 17, label: "Pearl Director", reward: "20 Lakh" },
        { level: 14, min: 200000001, max: 230000000, percent: 18, label: "Aquamarine Director", reward: "23 Lakh" },
        { level: 15, min: 230000001, max: 260000000, percent: 19, label: "Onyx Director", reward: "26 Lakh" },
        { level: 16, min: 260000001, max: 300000000, percent: 20, label: "Vice President", reward: "30 Lakh" },
    ]);


    const getLevel = (amount) => {
        return levels.find((l) => amount >= l.min && amount <= l.max);
    };

    const calculateCommission = (item, allData) => {
        const levelData = getLevel(item.saleAmount);

        const percent = levelData?.percent || 0;
        const reward = levelData?.reward || "";
        const levelName = levelData?.label || "";

        const base = (item.saleAmount * percent) / 100;

        // Referral
        const referralBonus = item.referral
            ? (item.saleAmount * config.referralPercent) / 100
            : 0;

        // Cashback
        let cashback = 0;
        if (item.fullPaymentDate) {
            const bookingDate = new Date(item.date);
            const fullDate = new Date(item.fullPaymentDate);

            const diffDays =
                (fullDate - bookingDate) / (1000 * 60 * 60 * 24);

            if (diffDays <= config.cashbackDays) {
                cashback = (base * config.cashbackPercent) / 100;
            }
        }

        // Top achiever
        const maxSale = Math.max(...allData.map((d) => d.saleAmount));
        const isTop = item.saleAmount === maxSale;

        const topBonus = isTop
            ? (base * 1) / 100
            : 0;

        // Deductions
        const tds = (base * config.tdsPercent) / 100;
        const adminCharge = (base * config.adminPercent) / 100;

        const final =
            base + referralBonus + cashback + topBonus - tds - adminCharge;

        return {
            percent,
            levelName,
            reward, // 🔥 added
            base,
            referralBonus,
            cashback,
            topBonus,
            tds,
            adminCharge,
            final,
            isTop,
        };
    };

    /* ================= FILTER ================= */
    const filteredData = useMemo(() => {
        let result = commissionData.filter((item) => {
            const matchSearch = item.agent
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchDate = !dateFilter || item.date === dateFilter;
            const matchCycle = !cycleFilter || item.cycle === cycleFilter;

            // 🔥 Month filter (YYYY-MM)
            const matchMonth =
                !monthFilter || item.date.startsWith(monthFilter);

            // 🔥 Agent filter
            const matchAgent =
                !agentFilter || item.agent === agentFilter;

            if (mood === "agent") {
                return (
                    item.agent === "Rahul Sharma" &&
                    matchSearch &&
                    matchDate &&
                    matchCycle &&
                    matchMonth &&
                    matchAgent
                );
            }

            return (
                matchSearch &&
                matchDate &&
                matchCycle &&
                matchMonth &&
                matchAgent
            );
        });

        result = result.map((item) => ({
            ...item,
            calc: calculateCommission(item, commissionData),
        }));

        result.sort((a, b) => b.calc.final - a.calc.final);

        return result;
    }, [search, dateFilter, cycleFilter, monthFilter, agentFilter, mood]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const paginatedData = filteredData.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
    );


    /* ================= EXPORT EXCEL ================= */
    const exportToExcel = (rowsData = filteredData, type = "filtered") => {
        if (!rowsData.length) return alert("No data to export");

        const headers = [
            "Date",
            "Agent",
            "Project",
            "Sale",
            "%",
            "Commission",
            "Cycle",
            "Status",
            "Final",
            "Level",
            "Reward",
        ];

        const rows = rowsData.map((item) => [
            item.date,
            item.agent,
            item.project,
            item.saleAmount,
            item.calc.percent,
            item.calc.base,
            item.cycle,
            item.status,
            item.calc.final,
            item.calc.levelName,
            item.calc.reward,
        ]);

        const csv =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((e) => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csv);

        // 🔥 Dynamic file name
        let name = "commission";

        if (agentFilter) name += `_${agentFilter}`;
        if (monthFilter) name += `_${monthFilter}`;
        if (cycleFilter) name += `_${cycleFilter}`;

        link.download = `${name}.csv`;
        link.click();
    };

    const handleExportSubmit = () => {
        let data = commissionData;

        // Apply filters
        if (exportFilters.agent) {
            data = data.filter((i) => i.agent === exportFilters.agent);
        }

        if (exportFilters.month) {
            data = data.filter((i) =>
                i.date.startsWith(exportFilters.month)
            );
        }

        if (exportFilters.cycle) {
            data = data.filter((i) => i.cycle === exportFilters.cycle);
        }

        // Attach calculations
        data = data.map((item) => ({
            ...item,
            calc: calculateCommission(item, commissionData),
        }));

        exportToExcel(data);

        setExportOpen(false);
    };

    return (
        <div className="plot-container">
            {/* Filters */}
            <div className="table-filters">
                <div className="page-head-title">
                    <h2>Commission</h2>
                    <Breadcrumb />
                </div>

                <div className="page-tools">
                    <div className="searchItem">
                        <NiSearch />
                        <input
                            placeholder="Search Agent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="searchItem">
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                    <div className="searchItem">
                        <select
                            value={cycleFilter}
                            onChange={(e) => setCycleFilter(e.target.value)}
                        >
                            <option value="">All Cycles</option>
                            <option value="1st">1st Cycle</option>
                            <option value="16th">16th Cycle</option>
                        </select>
                    </div>
                    <button
                        className="add-button"
                        onClick={() => setExportOpen(true)}
                    >
                        <NiExport /> Export
                    </button>
                    {/* Month Filter */}
                </div>
            </div>
            {/* ================= TABLE ================= */}
            {mood === "admin" && (<h4>Commission</h4>)}
            <div className="table card">
                <div className="table-head commission-table">
                    <span>Date</span>
                    <span>Agent</span>
                    <span>Project</span>
                    <span>Sale</span>
                    <span>%</span>
                    <span>Commission</span>
                    <span>Cycle</span>
                    <span>Status</span>
                    <span>Bonus</span>
                    <span>Final</span>
                    <span>Reward</span>
                    <span>Action</span>
                </div>

                {paginatedData.map((item) => (
                    <CommissionTable item={item} exportToExcel={exportToExcel} mood={mood} />
                ))}
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
            <ViewModal
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                title="Export Commission"
            >
                <div className="field">
                    <label>Agent</label>
                    <select
                        value={exportFilters.agent}
                        onChange={(e) =>
                            setExportFilters({
                                ...exportFilters,
                                agent: e.target.value,
                            })
                        }
                    >
                        <option value="">All Agents</option>
                        {[...new Set(commissionData.map((i) => i.agent))].map(
                            (agent) => (
                                <option key={agent} value={agent}>
                                    {agent}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="field">
                    <label>Month</label>
                    <input
                        type="month"
                        value={exportFilters.month}
                        onChange={(e) =>
                            setExportFilters({
                                ...exportFilters,
                                month: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="field">
                    <label>Cycle</label>
                    <select
                        value={exportFilters.cycle}
                        onChange={(e) =>
                            setExportFilters({
                                ...exportFilters,
                                cycle: e.target.value,
                            })
                        }
                    >
                        <option value="">All</option>
                        <option value="1st">1st Cycle</option>
                        <option value="16th">16th Cycle</option>
                    </select>
                </div>

                <div className="modal-actions">
                    <button onClick={handleExportSubmit}>
                        Export Now
                    </button>

                    <button
                        className="btn-outline"
                        onClick={() => setExportOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </ViewModal>
        </div>
    );
};

export default Commission;
