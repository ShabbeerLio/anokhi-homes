import React from "react";
import Charts from "../Dashboard/Charts";
import "./Tabs.css";
import DashboardCard from "../Cards/DashboardCard";
import NiBooking from "../../icons/ni-booking";
import NiTool from "../../icons/ni-tool";
import NiPayments from "../../icons/ni-payments";
import NiManagement from "../../icons/ni-management";

const Report = ({ userData }) => {
    const performance = userData?.performance;

    if (!performance) {
        return (
            <div className="card">
                <h4>No Performance Data Available</h4>
            </div>
        );
    }

    const {
        totalSales,
        totalBookings,
        propertiesSold,
        commissionEarned,
        conversionRate,
        monthlySales,
    } = performance;

    return (
        <div className="agent-report">

            {/* TOP CARDS */}
            <div className="report-grid">

                <DashboardCard
                    title="Total Sales"
                    value={`₹${totalSales.toLocaleString()}`}
                    icons={<NiManagement />}
                />

                <DashboardCard
                    title="Total Bookings"
                    value={totalBookings}
                    icons={<NiBooking />}
                />

                <DashboardCard
                    title="Properties Sold"
                    value={propertiesSold}
                    icons={<NiTool />}
                />

                <DashboardCard
                    title="Commission Earned"
                    value={`₹${commissionEarned.toLocaleString()}`}
                    icons={<NiPayments />}
                />

                <DashboardCard
                    title="Conversion Rate"
                    value={`${conversionRate}%`}
                    icons={<NiManagement />}
                />

            </div>

            {/* MONTHLY CHART */}
            {monthlySales?.length > 0 && (
                <>
                    <h4 style={{ marginTop: "40px" }}>Sales Trend</h4>

                    <div className="card" style={{ marginTop: "20px" }}>
                        <Charts
                            title="Monthly Sales Trend"
                            data={monthlySales}
                            dataKey="sales"
                        />
                    </div>
                </>
            )}

        </div>
    );
};

export default Report;