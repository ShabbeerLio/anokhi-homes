import React, { useEffect, useState } from "react";
import { getRank } from "../../Redux/Slices/AppSlices";
import { useDispatch, useSelector } from "react-redux";

const CommissionSetting = ({ setAlert }) => {
    const dispatch = useDispatch();
    const { rankData } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(getRank());
    }, []);
    const [config, setConfig] = useState({
        tdsPercent: 2,
        adminPercent: 5,
        referralPercent: 2,
        cashbackPercent: 2,
        cashbackDays: 60,
    });

    const [levels, setLevels] = useState([]);

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
                            {/* <span>Level</span> */}
                            <span>Min</span>
                            <span>Max</span>
                            <span>%</span>
                            <span>Designation</span>
                        </div>

                        {rankData.map((lvl, i) => (
                            <div key={i} className="level-row">
                                {/* <input
                                    value={lvl.level}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].level = +e.target.value;
                                        setLevels(updated);
                                    }}
                                /> */}
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
                                    value={lvl.directIncome}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].directIncome = +e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                                <input
                                    value={lvl.designation}
                                    onChange={(e) => {
                                        const updated = [...levels];
                                        updated[i].designation = e.target.value;
                                        setLevels(updated);
                                    }}
                                />

                            </div>
                        ))}
                        {/* <div className="modal-actions">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionSetting;
