import { useEffect, useState } from "react";
import {
    getMyComplaints,
    submitComplaint,
    trackComplaint,
} from "../services/api";
import MyComplaints from "./MyComplaints";
function CitizenDashboard() {
    const username = localStorage.getItem("username");

    const [activeSection, setActiveSection] = useState("HOME");

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        description: "",
        imagePath: "",
    });

    const [imageFile, setImageFile] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [trackingToken, setTrackingToken] = useState("");
    const [trackedComplaint, setTrackedComplaint] = useState(null);
    const [tracking, setTracking] = useState(false);

    useEffect(() => {
        loadMyComplaints();
    }, []);

    async function loadMyComplaints() {
        try {
            setLoading(true);

            const response = await getMyComplaints();

            setComplaints(response.data || []);
        } catch (err) {
            setError(err.message || "Failed to load complaints");
        } finally {
            setLoading(false);
        }
    }

    function openSection(section) {
        setError("");
        setMessage("");
        setActiveSection(section);
    }

    function goHome() {
        setError("");
        setMessage("");
        setActiveSection("HOME");
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) {
            setImageFile(null);
            return;
        }

        setImageFile(file);

        setForm({
            ...form,
            imagePath: file.name,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!form.title.trim()) {
            setError("Please enter a complaint title.");
            return;
        }

        if (!form.description.trim()) {
            setError("Please enter a complaint description.");
            return;
        }

        try {
            setSubmitting(true);

            const complaintData = {
                title: form.title,
                description: form.description,
                imagePath: form.imagePath || null,
                latitude: null,
                longitude: null,
            };

            const response = await submitComplaint(complaintData);

            setMessage(
                `Complaint submitted successfully. Tracking Token: ${response.data.trackingToken}`
            );

            setForm({
                title: "",
                description: "",
                imagePath: "",
            });

            setImageFile(null);

            const imageInput =
                document.getElementById("complaint-image");

            if (imageInput) {
                imageInput.value = "";
            }

            await loadMyComplaints();
        } catch (err) {
            setError(err.message || "Failed to submit complaint");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleTrack(e) {
        e.preventDefault();

        setError("");
        setMessage("");
        setTrackedComplaint(null);

        if (!trackingToken.trim()) {
            setError("Please enter a tracking token.");
            return;
        }

        try {
            setTracking(true);

            const response = await trackComplaint(
                trackingToken.trim()
            );

            setTrackedComplaint(response.data);
        } catch (err) {
            setError(err.message || "Complaint not found");
        } finally {
            setTracking(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        window.location.href = "/login";
    }

    function getStatusClass(status) {
        switch (status) {
            case "PENDING":
                return "status-pending";

            case "IN_PROGRESS":
                return "status-progress";

            case "RESOLVED":
                return "status-resolved";

            default:
                return "";
        }
    }

    function getPriorityClass(priority) {
        switch (priority) {
            case "CRITICAL":
                return "priority-critical";

            case "HIGH":
                return "priority-high";

            case "NORMAL":
                return "priority-normal";

            default:
                return "";
        }
    }

    function formatStatus(status) {
        if (!status) return "";

        return status
            .replace("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    }

    function formatDate(date) {
        if (!date) return "-";

        return new Date(date).toLocaleString();
    }

    return (
        <div className="citizen-dashboard">

            {/* HEADER */}

            <header className="dashboard-header">

                <div className="brand">

                    <span className="brand-icon">
                        🛡️
                    </span>

                    <div>
                        <h1>CivicShield</h1>
                        <span>Citizen Portal</span>
                    </div>

                </div>

                <div className="user-section">

                    <div className="user-info">
                        <span>Welcome</span>
                        <strong>{username}</strong>
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

                {/* TITLE */}

                <div className="dashboard-title">

                    <div>
                        <h2>Citizen Dashboard</h2>

                        <p>
                            Report civic issues and track
                            your complaints.
                        </p>
                    </div>

                </div>


                {/* GLOBAL MESSAGES */}

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


                {/* HOME */}

                {activeSection === "HOME" && (

                    <section className="citizen-menu">

                        <div
                            className="citizen-action-card"
                            onClick={() =>
                                openSection("SUBMIT")
                            }
                        >

                            <div className="citizen-action-icon">
                                📝
                            </div>

                            <h3>
                                Submit a Complaint
                            </h3>

                            <p>
                                Report a civic issue
                                in your area.
                            </p>

                            <button className="action-card-button">
                                Open
                            </button>

                        </div>


                        <div
                            className="citizen-action-card"
                            onClick={() =>
                                openSection("TRACK")
                            }
                        >

                            <div className="citizen-action-icon">
                                🔎
                            </div>

                            <h3>
                                Track Complaint
                            </h3>

                            <p>
                                Track your complaint
                                using its tracking token.
                            </p>

                            <button className="action-card-button">
                                Open
                            </button>

                        </div>


                        <div
                            className="citizen-action-card"
                            onClick={() =>
                                openSection("MY_COMPLAINTS")
                            }
                        >

                            <div className="citizen-action-icon">
                                📋
                            </div>

                            <h3>
                                My Complaints
                            </h3>

                            <p>
                                View all complaints
                                submitted by you.
                            </p>

                            <button className="action-card-button">
                                Open
                            </button>

                        </div>

                    </section>

                )}


                {/* SUBMIT COMPLAINT */}

                {activeSection === "SUBMIT" && (

                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    📝 Submit a Complaint
                                </h3>

                                <p>
                                    Report an issue in
                                    your area.
                                </p>

                            </div>

                            <button
                                className="citizen-back-button"
                                onClick={goHome}
                            >
                                ← Dashboard
                            </button>

                        </div>


                        <form
                            className="complaint-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">

                                <label>
                                    Complaint Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Example: Garbage not collected"
                                    maxLength={200}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the problem clearly..."
                                    rows="5"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Upload Image
                                    <span className="optional">
                                        {" "} (Optional)
                                    </span>
                                </label>

                                <input
                                    id="complaint-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                />

                                {imageFile && (
                                    <small className="file-name">
                                        Selected:{" "}
                                        {imageFile.name}
                                    </small>
                                )}

                            </div>


                            <div className="location-note">

                                Image is optional.
                                You can submit the
                                complaint without an
                                image.

                            </div>


                            <button
                                type="submit"
                                className="primary-button submit-button"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Complaint"}
                            </button>

                        </form>

                    </section>

                )}


                {/* TRACK COMPLAINT */}

                {activeSection === "TRACK" && (

                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <h3>
                                    🔎 Track Complaint
                                </h3>

                                <p>
                                    Enter your tracking
                                    token to view the
                                    latest status.
                                </p>

                            </div>

                            <button
                                className="refresh-button"
                                onClick={goHome}
                            >
                                ← Dashboard
                            </button>

                        </div>


                        <form
                            className="track-form"
                            onSubmit={handleTrack}
                        >

                            <input
                                type="text"
                                value={trackingToken}
                                onChange={(e) =>
                                    setTrackingToken(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: CS-ADBB9300"
                            />

                            <button
                                type="submit"
                                className="primary-button track-button"
                                disabled={tracking}
                            >
                                {tracking
                                    ? "Tracking..."
                                    : "Track"}
                            </button>

                        </form>


                        {trackedComplaint && (

                            <div className="tracked-result">

                                <div className="tracked-header">

                                    <div>

                                        <span>
                                            Tracking Token
                                        </span>

                                        <strong>
                                            {
                                                trackedComplaint.trackingToken
                                            }
                                        </strong>

                                    </div>

                                    <span
                                        className={`status-badge ${getStatusClass(
                                            trackedComplaint.status
                                        )}`}
                                    >
                                        {formatStatus(
                                            trackedComplaint.status
                                        )}
                                    </span>

                                </div>


                                <div className="tracked-details">

                                    <div>
                                        <label>
                                            Title
                                        </label>

                                        <p>
                                            {
                                                trackedComplaint.title
                                            }
                                        </p>
                                    </div>


                                    <div>
                                        <label>
                                            Department
                                        </label>

                                        <p>
                                            {
                                                trackedComplaint.department ||
                                                "Not assigned"
                                            }
                                        </p>
                                    </div>


                                    <div>
                                        <label>
                                            Priority
                                        </label>

                                        <p>

                                            <span
                                                className={`priority-badge ${getPriorityClass(
                                                    trackedComplaint.priority
                                                )}`}
                                            >
                                                {
                                                    trackedComplaint.priority
                                                }
                                            </span>

                                        </p>

                                    </div>


                                    <div>
                                        <label>
                                            Status
                                        </label>

                                        <p>
                                            {formatStatus(
                                                trackedComplaint.status
                                            )}
                                        </p>
                                    </div>


                                    <div>
                                        <label>
                                            Last Updated
                                        </label>

                                        <p>
                                            {formatDate(
                                                trackedComplaint.updatedAt
                                            )}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        )}

                    </section>

                )}


                {/* MY COMPLAINTS */}

                {/* MY COMPLAINTS */}

                {activeSection === "MY_COMPLAINTS" && (

                    <MyComplaints
                        complaints={complaints}
                        loading={loading}
                        loadMyComplaints={loadMyComplaints}
                        goHome={goHome}
                        getStatusClass={getStatusClass}
                        getPriorityClass={getPriorityClass}
                        formatStatus={formatStatus}
                        formatDate={formatDate}
                    />

                )}


            </main>

        </div>
    );
}

export default CitizenDashboard;