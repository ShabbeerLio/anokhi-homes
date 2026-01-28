import React from "react";
import "./Modals.css";

const NotificationModal = () => {
    return (
        <div className="notif-modal">
            <h3>Notifications</h3>

            <div className="notif-tabs">
                <button className="active">All</button>
                <button>System</button>
                <button>User</button>
            </div>

            <div className="notif-modal-box">
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=1" />
                    <div>
                        <h5>
                            <b>Laura Ellis</b> added a product with an image.
                        </h5>
                        <p>2 minutes ago</p>
                    </div>
                </div>

                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
                <div className="notif-item">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                        <h5>
                            <b>Zoila Vittorino</b> added an issue.
                        </h5>
                        <p>14 minutes ago</p>
                    </div>
                </div>
            </div>
            {/* <button className="notif-view">View All</button> */}
        </div>
    );
};

export default NotificationModal;
