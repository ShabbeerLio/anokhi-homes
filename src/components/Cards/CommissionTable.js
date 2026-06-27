import React, { useState } from "react";

import NiOpenEye from "../../icons/ni-openEye";
import NiExport from "../../icons/ni-export";
import ViewModal from "../Modals/ViewModal";
import { formatCurrency } from "../Utils/FormatCurrency";

const CommissionTable = ({ index, item, exportToExcel }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  return (
    <>
      <div
        className={`table-row commission-table ${index === 0 ? "best-performer-row" : ""
          }`}
      >
        <span>
          {index === 0 && "🏆 "}
          {item.name}
        </span>
        <span>{item.designation}</span>
        <span>{item.referralId}</span>
        <span>₹{item.selfBusiness}</span>
        <span>₹{formatCurrency(item.wallet)}</span>
        <span>
          ₹{formatCurrency(item.holdCommission)}
        </span>
        <span>
          ₹{formatCurrency(item.releasedCommission)}
        </span>
        <span>₹{formatCurrency(item.totalIncome)}</span>
        <div className="dots">
          <span onClick={() => setViewOpen(true)}>
            <NiOpenEye />
          </span>

          <span onClick={() => exportToExcel([item])}>
            <NiExport />
          </span>
        </div>
      </div>

      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title={item.name}
      >
        <div className="table-filters">
          <button
            className={activeTab === "summary" ? "active" : ""}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>

          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            Income History
          </button>

          <button
            className={activeTab === "rewards" ? "active" : ""}
            onClick={() => setActiveTab("rewards")}
          >
            Rewards
          </button>
          <button
            className={activeTab === "payouts" ? "active" : ""}
            onClick={() => setActiveTab("payouts")}
          >
            Payouts
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="report-view-box-right active">
            <div className="summary-card">
              <h5>Associate Information</h5>
              <p><strong>Name:</strong> {item.name} </p>
              <p><strong>Phone:</strong> {item.phone} </p>
              <p><strong>Email:</strong> {item.email} </p>
              <p><strong>Referral ID:</strong> {item.referralId} </p>
              <p> <strong>Designation:</strong> {item.designation} </p>
            </div>
            <div className="report-view-box-right active">
              <h5>Business</h5>
              <p><strong>Total Business :</strong> ₹{formatCurrency(item.totalBusiness)}</p>
              <p><strong>Wallet :</strong> ₹{formatCurrency(item.wallet)}</p>
              <p><strong>Total Income :</strong> ₹{formatCurrency(item.totalIncome)}</p>
            </div>
            <div className="report-view-box-right active">
              <h5>Income Breakdown</h5>
              <p><strong>Direct Income :</strong> ₹{formatCurrency(item.directIncome)}</p>
              <p><strong>Difference Income :</strong> ₹{formatCurrency(item.differenceIncome)}</p>
              <p><strong>Matching Income :</strong> ₹{formatCurrency(item.matchingIncome)}</p>
              <p><strong>Referral Income :</strong> ₹{formatCurrency(item.referralIncome)}</p>
              <p><strong>Reward :</strong> ₹{formatCurrency(item.rewardIncome)}</p>
            </div>
            <div className="report-view-box-right active">
              <h5>Business Breakdown</h5>
              <p><strong>Self Business :</strong> ₹{formatCurrency(item.selfBusiness)}  </p>
              <p><strong>Left Business :</strong> ₹{formatCurrency(item.leftBusiness)} </p>
              <p><strong>Right Business :</strong>  ₹{formatCurrency(item.rightBusiness)}  </p>
              <p><strong>Total Business :</strong>  ₹{formatCurrency(item.totalBusiness)} </p>
            </div>

            <div className="report-view-box-right active">
              <h5>Commission Summary</h5>

              <p>
                <strong>Gross Commission :</strong>
                ₹{formatCurrency(item.grossCommission)}
              </p>

              <p>
                <strong>TDS :</strong>
                ₹{formatCurrency(item.tdsDeducted)}
              </p>

              <p>
                <strong>Admin Charge :</strong>
                ₹{formatCurrency(item.adminDeducted)}
              </p>

              <p>
                <strong>Net Commission :</strong>
                ₹{formatCurrency(item.totalNetCommission)}
              </p>

              <p>
                <strong>Released :</strong>
                ₹{formatCurrency(item.releasedCommission)}
              </p>

              <p>
                <strong>On Hold :</strong>
                ₹{formatCurrency(item.holdCommission)}
              </p>
            </div>

            <div className="report-view-box-right active">
              <h5>Current Slab</h5>
              <p><strong>Level :</strong>{item.currentLevel} </p>
              <p><strong>Designation :</strong>{item.currentDesignation}</p>
              <p><strong>Rate :</strong>{item.currentRate}% </p>
              <p><strong>Next Rank :</strong>{item.nextDesignation}</p>
              <p><strong>Remaining :</strong>₹{formatCurrency(item.remainingForNextRank)}</p>
            </div>

          </div>
        )}
        {activeTab === "history" && (
          <div className="report-view-box-right active">
            {item.histories?.length > 0 ? (
              item.histories.map((history) => (
                <div className="history-card" key={history._id}>
                  <h5>
                    {{
                      direct_income: "Direct Income",
                      difference_income: "Difference Income",
                      matching_income: "Matching Income",
                      referal_income: "Referral Income",
                      reward_income: "Reward Income",
                      royalty_income: "Royalty Income",
                      cashback_income: "Cashback Income",
                      best_performance_income: "Best Performance Income",
                    }[history.type] || history.type}
                  </h5>
                  <p><strong>Amount :</strong> ₹{formatCurrency(history.amount)}</p>
                  <p><strong>Business :</strong> ₹{formatCurrency(history.businessAmount || 0)}</p>
                  <p><strong>Percentage :</strong>{history.percentage}%</p>
                  <p><strong>Status :</strong>{history.status}</p>
                  <p> <strong>Cycle :</strong>{new Date(history.cycleDate).toLocaleDateString()} </p>
                </div>
              ))
            ) : (
              <p>No income history found</p>
            )}
          </div>
        )}
        {activeTab === "rewards" && (
          <div className="report-view-box-right active">
            {item.rewards?.length > 0 ? (
              item.rewards.map((reward) => (
                <div key={reward._id} className="reward-card">
                  <h5>{reward.name}</h5>
                  <p><strong>Target :</strong> ₹{formatCurrency(reward.targetBusiness)}</p>
                  <p><strong>Reward :</strong> {reward.rewardValue}</p>
                  <span
                    className={`status ${reward.achieved ? "active" : "pending"
                      }`}
                  >
                    {reward.achieved ? "Achieved" : "Pending"}
                  </span>
                </div>
              ))
            ) : (
              <p>No rewards available</p>
            )}
          </div>
        )}
        {activeTab === "payouts" && (
          <div className="report-view-box-right active">

            {item.payouts?.length ? (
              item.payouts.map((payout) => (
                <div className="history-card" key={payout._id}>

                  <h5>
                    {new Date(
                      payout.cycleStart
                    ).toLocaleDateString()}
                    {" - "}
                    {new Date(
                      payout.cycleEnd
                    ).toLocaleDateString()}
                  </h5>

                  <p>
                    <strong>Gross :</strong>
                    ₹{formatCurrency(payout.grossAmount)}
                  </p>

                  <p>
                    <strong>TDS :</strong>
                    ₹{formatCurrency(payout.tdsAmount)}
                  </p>

                  <p>
                    <strong>Admin :</strong>
                    ₹{formatCurrency(
                      payout.adminChargeAmount
                    )}
                  </p>

                  <p>
                    <strong>Net :</strong>
                    ₹{formatCurrency(payout.netAmount)}
                  </p>

                  <p>
                    <strong>Release Date :</strong>

                    {new Date(
                      payout.releaseDate
                    ).toLocaleDateString()}
                  </p>

                  <span
                    className={`status ${payout.status === "released"
                        ? "active"
                        : "pending"
                      }`}
                  >
                    {payout.status}
                  </span>

                </div>
              ))
            ) : (
              <p>No payouts available.</p>
            )}

          </div>
        )}
      </ViewModal>
    </>
  );
};

export default CommissionTable;
