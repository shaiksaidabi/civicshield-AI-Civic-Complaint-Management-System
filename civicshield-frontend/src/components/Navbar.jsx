import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div
                className="navbar-brand"
                onClick={() => navigate("/")}
            >
                🛡️ CivicShield
            </div>

            <div className="navbar-right">
                {username && (
                    <span className="user-info">
                        {username} ({role})
                    </span>
                )}

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;