import { useNavigate } from "react-router-dom";

function PortalSelection() {
    const navigate = useNavigate();

    return (
        <div className="portal-page">

            <div className="portal-container">

                <div className="portal-logo">
                    🛡️
                </div>

                <h1>CivicShield</h1>

                <p className="portal-subtitle">
                    Smart Civic Complaint Management
                </p>

                <h2>Choose Your Portal</h2>

                <p className="portal-description">
                    Select the portal that matches your role.
                </p>


                <div className="portal-options">

                    {/* CITIZEN */}

                    <div
                        className="portal-card"
                        onClick={() => navigate("/login?role=citizen")}
                    >

                        <div className="portal-icon">
                            👤
                        </div>

                        <h3>
                            Citizen Portal
                        </h3>

                        <p>
                            Submit civic complaints,
                            track their status, and
                            view your complaints.
                        </p>

                        <button
                            className="portal-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/login?role=citizen");
                            }}
                        >
                            Citizen Login →
                        </button>

                    </div>


                    {/* AUTHORITY */}

                    <div
                        className="portal-card authority-portal-card"
                        onClick={() => navigate("/login?role=authority")}
                    >

                        <div className="portal-icon">
                            🏢
                        </div>

                        <h3>
                            Authority Portal
                        </h3>

                        <p>
                            Manage complaints,
                            update statuses, and
                            resolve civic issues.
                        </p>

                        <button
                            className="portal-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/login?role=authority");
                            }}
                        >
                            Authority Login →
                        </button>

                    </div>

                </div>


                <p className="portal-footer">
                    CivicShield • Transparent • Secure • Citizen-Focused
                </p>

            </div>

        </div>
    );
}

export default PortalSelection;