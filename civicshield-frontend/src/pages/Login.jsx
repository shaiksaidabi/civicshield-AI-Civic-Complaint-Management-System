import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const selectedRole = searchParams.get("role");

    const isAuthority = selectedRole === "authority";

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await login(
                form.username,
                form.password
            );

            const data = response.data;
            if (
                selectedRole === "citizen" &&
                data.role !== "CITIZEN"
            ) {
                setError(
                    "Access denied. This account is registered as an Authority. Please use the Authority Portal."
                );
                return;
            }

            if (
                selectedRole === "authority" &&
                data.role !== "AUTHORITY"
            ) {
                setError(
                    "Access denied. Citizen accounts cannot access the Authority Portal."
                );
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);

            if (data.role === "AUTHORITY") {
                navigate("/authority");
            } else {
                navigate("/citizen");
            }

        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    {isAuthority ? "🏢" : "👤"}
                </div>

                <h1>CivicShield</h1>

                <p className="auth-subtitle">
                    Smart Civic Complaint Management
                </p>

                <div className="login-role-badge">
                    {isAuthority
                        ? "Authority Portal"
                        : "Citizen Portal"}
                </div>

                <h2>
                    {isAuthority
                        ? "Authority Login"
                        : "Citizen Login"}
                </h2>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                {!isAuthority && (
                    <p className="auth-footer">
                        Don't have an account?{" "}

                        <Link to="/register">
                            Create Citizen Account
                        </Link>
                    </p>
                )}


                <button
                    type="button"
                    className="back-portal-button"
                    onClick={() => navigate("/")}
                >
                    ← Choose Portal
                </button>

            </div>

        </div>
    );
}

export default Login;