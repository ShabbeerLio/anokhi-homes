import React, { useState } from "react";

const CommissionSetting = ({ setAlert }) => {
    const [config, setConfig] = useState({
        tdsPercent: 2,
        adminPercent: 5,
        referralPercent: 2,
        cashbackPercent: 2,
        cashbackDays: 60,
    });

    const [levels, setLevels] = useState([
        {
            level: 1,
            min: 0,
            max: 1000000,
            percent: 5,
            label: "Silver Associate",
            reward: "Smartphone (20K)",
        },
        {
            level: 2,
            min: 1000001,
            max: 2500000,
            percent: 6,
            label: "Gold Associate",
            reward: "Tablet (30K)",
        },
        {
            level: 3,
            min: 2500001,
            max: 5000000,
            percent: 7,
            label: "Platinum Associate",
            reward: "OLED TV 55 (50K)",
        },
        {
            level: 4,
            min: 5000001,
            max: 10000000,
            percent: 8,
            label: "Titanium Associate",
            reward: "1 Lakh",
        },
        {
            level: 5,
            min: 10000001,
            max: 20000000,
            percent: 9,
            label: "Crystal Associate",
            reward: "2 Lakh",
        },
        {
            level: 6,
            min: 20000001,
            max: 40000000,
            percent: 10,
            label: "Amber Associate",
            reward: "4 Lakh",
        },
        {
            level: 7,
            min: 40000001,
            max: 60000000,
            percent: 11,
            label: "Sapphire Director",
            reward: "6 Lakh",
        },
        {
            level: 8,
            min: 60000001,
            max: 80000000,
            percent: 12,
            label: "Topaz Director",
            reward: "8 Lakh",
        },
        {
            level: 9,
            min: 80000001,
            max: 100000000,
            percent: 13,
            label: "Emerald Director",
            reward: "10 Lakh",
        },
        {
            level: 10,
            min: 100000001,
            max: 120000000,
            percent: 14,
            label: "Ruby Director",
            reward: "12 Lakh",
        },
        {
            level: 11,
            min: 120000001,
            max: 140000000,
            percent: 15,
            label: "Diamond Director",
            reward: "14 Lakh",
        },
        {
            level: 12,
            min: 140000001,
            max: 170000000,
            percent: 16,
            label: "Crown Director",
            reward: "17 Lakh",
        },
        {
            level: 13,
            min: 170000001,
            max: 200000000,
            percent: 17,
            label: "Pearl Director",
            reward: "20 Lakh",
        },
        {
            level: 14,
            min: 200000001,
            max: 230000000,
            percent: 18,
            label: "Aquamarine Director",
            reward: "23 Lakh",
        },
        {
            level: 15,
            min: 230000001,
            max: 260000000,
            percent: 19,
            label: "Onyx Director",
            reward: "26 Lakh",
        },
        {
            level: 16,
            min: 260000001,
            max: 300000000,
            percent: 20,
            label: "Vice President",
            reward: "30 Lakh",
        },
    ]);

    return (
        <div>
            <div className="admin-config-box">
                <div>
                    <h4>Commission Settings</h4>
                    <div className="admin-config card">
                        <div className="field">
                            <label>TDS %</label>
                            <input
                                type="number"
                                value={config.tdsPercent}
                                onChange={(e) =>
                                    setConfig({ ...config, tdsPercent: +e.target.value })
                                }
                            />
                        </div>
                        <div className="field">
                            <label>Admin Charge %</label>
                            <input
                                type="number"
                                value={config.adminPercent}
                                onChange={(e) =>
                                    setConfig({ ...config, adminPercent: +e.target.value })
                                }
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn primary"
                                onClick={() => {
                                    setAlert({ message: "Commission settings updated successfully!", status: "Success" });
                                    setTimeout(() => {
                                        setAlert(null);
                                    }, 5000);
                                }}>
                                Update</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Commission Levels</h4>
                    <div className="levels-config card">
                        <div className="level-head">
                            <span>Min</span>
                            <span>Max</span>
                            <span>%</span>
                            <span>Designation</span>
                            <span>Reward</span>
                        </div>

                        {levels.map((lvl, i) => (
                            <div key={i} className="level-row">
                                <input
                                    value={lvl.min}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].min = +e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                                <input
                                    value={lvl.max}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].max = +e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                                <input
                                    value={lvl.percent}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].percent = +e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                                <input
                                    value={lvl.label}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].label = e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                                <input
                                    value={lvl.reward}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].reward = e.target.value;
                                        setLevels(updated);
                                    }}
                                />
                            </div>
                        ))}
                        <div className="modal-actions">
                            <button
                                className="btn primary"
                                onClick={() => {
                                    setAlert({ message: "Commission settings updated successfully!", status: "Success" });
                                    setTimeout(() => {
                                        setAlert(null);
                                    }, 5000);
                                }}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionSetting;
