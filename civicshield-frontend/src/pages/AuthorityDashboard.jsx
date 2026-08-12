import { useEffect, useState } from "react";

import {
    getDepartmentStats,
    getDepartmentComplaints,
    getDepartmentComplaintsByPriority,
    getDepartmentComplaintsByStatus,
    updateComplaintStatus,
} from "../services/api";

function AuthorityDashboard() {
    const username = localStorage.getItem("username");

    const [department, setDepartment] = useState("HEALTH");

    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState(null);

    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const departments = [
        "PUBLIC_WORKS",
        "ELECTRICITY",
        "WOMEN_SAFETY",
        "TRAFFIC",
        "MUNICIPAL",
        "HEALTH",
    ];

    const priorities = [
        "CRITICAL",
        "HIGH",
        "NORMAL",
    ];

    const statuses = [
        "PENDING",
        "IN_PROGRESS",
        "RESOLVED",
    ];


    useEffect(() => {
        loadDepartmentData();
    }, [department]);


    async function loadDepartmentData() {
        setError("");

        try {
            setLoading(true);
            setStatsLoading(true);

            const [complaintsResponse, statsResponse] =
                await Promise.all([
                    getDepartmentComplaints(department),
                    getDepartmentStats(department),
                ]);

            setComplaints(
                complaintsResponse.data || []
            );

            setStats(
                statsResponse.data || null
            );

        } catch (err) {
            setError(
                err.message ||
                "Failed to load department data."
            );
        } finally {
            setLoading(false);
            setStatsLoading(false);
        }
    }


    async function handlePriorityFilter() {
        setError("");
        setMessage("");

        try {
            setLoading(true);

            if (!priority) {
                const response =
                    await getDepartmentComplaints(
                        department
                    );

                setComplaints(
                    response.data || []
                );

                return;
            }

            const response =
                await getDepartmentComplaintsByPriority(
                    department,
                    priority
                );

            setComplaints(
                response.data || []
            );

        } catch (err) {
            setError(
                err.message ||
                "Failed to filter complaints."
            );
        } finally {
            setLoading(false);
        }
    }


    async function handleStatusFilter() {
        setError("");
        setMessage("");

        try {
            setLoading(true);

            if (!status) {
                const response =
                    await getDepartmentComplaints(
                        department
                    );

                setComplaints(
                    response.data || []
                );

                return;
            }

            const response =
                await getDepartmentComplaintsByStatus(
                    department,
                    status
                );

            setComplaints(
                response.data || []
            );

        } catch (err) {
            setError(
                err.message ||
                "Failed to filter complaints."
            );
        } finally {
            setLoading(false);
        }
    }


    async function handleStatusChange(
        complaintId,
        newStatus
    ) {
        setError("");
        setMessage("");

        try {
            await updateComplaintStatus(
                complaintId,
                newStatus
            );

            setMessage(
                "Complaint status updated successfully."
            );

            await loadDepartmentData();

        } catch (err) {
            setError(
                err.message ||
                "Failed to update complaint status."
            );
        }
    }


    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        window.location.href = "/login";
    }


    function formatStatus(value) {
        if (!value) {
            return "";
        }

        return value
            .replace("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    }


    function formatDate(value) {
        if (!value) {
            return "-";
        }

        return new Date(value).toLocaleString();
    }


    function getStatusClass(value) {
        if (value === "PENDING") {
            return "status-pending";
        }

        if (value === "IN_PROGRESS") {
            return "status-progress";
        }

        if (value === "RESOLVED") {
            return "status-resolved";
        }

        return "";
    }


    function getPriorityClass(value) {
        if (value === "CRITICAL") {
            return "priority-critical";
        }

        if (value === "HIGH") {
            return "priority-high";
        }

        return "priority-normal";
    }


    return (
        <div className="authority-dashboard">

            {/* HEADER */}

            <header className="dashboard-header">

                <div className="brand">

                    <span className="brand-icon">
                        🛡️
                    </span>

                    <div>
                        <h1>CivicShield</h1>

                        <span>
                            Authority Portal
                        </span>
                    </div>

                </div>


                <div className="user-section">

                    <div className="user-info">

                        <span>
                            Welcome
                        </span>

                        <strong>
                            {username}
                        </strong>

                    </div>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* MAIN */}

            <main className="dashboard-container">

                <div className="dashboard-title">

                    <div>

                        <h2>
                            Authority Dashboard
                        </h2>

                        <p>
                            Manage and resolve complaints
                            assigned to your department.
                        </p>

                    </div>

                </div>


                {/* MESSAGES */}

                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}


                {message && (
                    <div className="dashboard-success">
                        {message}
                    </div>
                )}


                {/* DEPARTMENT SELECTOR */}

                <section className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                🏢 Department
                            </h3>

                            <p>
                                Select the department
                                you want to manage.
                            </p>

                        </div>

                    </div>


                    <div className="department-selector">

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(
                                    e.target.value
                                )
                            }
                        >

                            {departments.map(
                                (item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item.replace(
                                            "_",
                                            " "
                                        )}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </section>


                {/* STATISTICS */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <span className="stat-icon">
                            📋
                        </span>

                        <div>

                            <span>
                                Total
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.totalComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span className="stat-icon">
                            ⏳
                        </span>

                        <div>

                            <span>
                                Pending
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.pendingComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span className="stat-icon">
                            🔄
                        </span>

                        <div>

                            <span>
                                In Progress
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.inProgressComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span className="stat-icon">
                            ✅
                        </span>

                        <div>

                            <span>
                                Resolved
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.resolvedComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card critical-stat">

                        <span className="stat-icon">
                            🚨
                        </span>

                        <div>

                            <span>
                                Critical
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.criticalComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card high-stat">

                        <span className="stat-icon">
                            ⚠️
                        </span>

                        <div>

                            <span>
                                High Priority
                            </span>

                            <strong>
                                {statsLoading
                                    ? "..."
                                    : stats?.highPriorityComplaints ??
                                    0}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* FILTERS */}

                <section className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                🔎 Filter Complaints
                            </h3>

                            <p>
                                Filter complaints by
                                priority or status.
                            </p>

                        </div>

                    </div>


                    <div className="filters-container">

                        <div className="filter-group">

                            <label>
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Priorities
                                </option>

                                {priorities.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                            <button
                                className="secondary-button"
                                onClick={
                                    handlePriorityFilter
                                }
                            >
                                Apply
                            </button>

                        </div>


                        <div className="filter-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Statuses
                                </option>

                                {statuses.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {formatStatus(
                                                item
                                            )}
                                        </option>
                                    )
                                )}

                            </select>

                            <button
                                className="secondary-button"
                                onClick={
                                    handleStatusFilter
                                }
                            >
                                Apply
                            </button>

                        </div>


                        <button
                            className="refresh-button"
                            onClick={
                                loadDepartmentData
                            }
                        >
                            🔄 Reset Filters
                        </button>

                    </div>

                </section>


                {/* COMPLAINTS */}

                <section className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                📋 Department Complaints
                            </h3>

                            <p>
                                Complaints assigned to{" "}
                                <strong>
                                    {department.replace(
                                        "_",
                                        " "
                                    )}
                                </strong>
                            </p>

                        </div>

                        <button
                            className="refresh-button"
                            onClick={
                                loadDepartmentData
                            }
                        >
                            🔄 Refresh
                        </button>

                    </div>


                    {loading ? (

                        <div className="empty-state">
                            Loading complaints...
                        </div>

                    ) : complaints.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                📋
                            </div>

                            <h4>
                                No complaints found
                            </h4>

                            <p>
                                There are currently no
                                complaints for this
                                department.
                            </p>

                        </div>

                    ) : (

                        <div className="complaints-list">

                            {complaints.map(
                                (complaint) => (

                                    <div
                                        className="complaint-item"
                                        key={complaint.id}
                                    >

                                        <div className="complaint-top">

                                            <div>

                                                <h4>
                                                    {
                                                        complaint.title
                                                    }
                                                </h4>

                                                <span className="tracking-token">
                                                    {
                                                        complaint.trackingToken
                                                    }
                                                </span>

                                            </div>


                                            <span
                                                className={`status-badge ${getStatusClass(
                                                    complaint.status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    complaint.status
                                                )}
                                            </span>

                                        </div>


                                        <p className="complaint-description">

                                            {
                                                complaint.description
                                            }

                                        </p>


                                        <div className="complaint-meta">

                                            <div>

                                                <span>
                                                    Priority
                                                </span>

                                                <strong>

                                                    <span
                                                        className={`priority-badge ${getPriorityClass(
                                                            complaint.priority
                                                        )}`}
                                                    >
                                                        {
                                                            complaint.priority
                                                        }
                                                    </span>

                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Department
                                                </span>

                                                <strong>
                                                    {
                                                        complaint.department
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Submitted
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        complaint.createdAt
                                                    )}
                                                </strong>

                                            </div>

                                        </div>


                                        {complaint.aiSummary && (

                                            <div className="ai-summary">

                                                <strong>
                                                    🤖 AI Summary
                                                </strong>

                                                <p>
                                                    {
                                                        complaint.aiSummary
                                                    }
                                                </p>

                                            </div>

                                        )}


                                        {/* STATUS UPDATE */}

                                        <div className="status-update">

                                            <label>
                                                Update Status
                                            </label>

                                            <select
                                                value={
                                                    complaint.status
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        complaint.id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                {statuses.map(
                                                    (item) => (

                                                        <option
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {formatStatus(
                                                                item
                                                            )}
                                                        </option>

                                                    )
                                                )}

                                            </select>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default AuthorityDashboard;