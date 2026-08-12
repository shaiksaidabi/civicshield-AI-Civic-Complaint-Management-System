function MyComplaints({
                          complaints = [],
                          loading = false,
                          loadMyComplaints,
                          goHome,
                          getStatusClass,
                          getPriorityClass,
                          formatStatus,
                          formatDate,
                      }) {
    function getComplaintIcon(complaint) {
        const text = `
        ${complaint.title || ""}
        ${complaint.description || ""}
    `.toLowerCase();

        if (
            text.includes("pothole") ||
            text.includes("potholes")
        ) {
            return "🕳️";
        }

        if (
            text.includes("garbage") ||
            text.includes("waste") ||
            text.includes("trash") ||
            text.includes("rubbish")
        ) {
            return "🗑️";
        }

        if (
            text.includes("street light") ||
            text.includes("streetlight") ||
            text.includes("lamp") ||
            text.includes("light not working")
        ) {
            return "💡";
        }

        if (
            text.includes("water leak") ||
            text.includes("water leakage") ||
            text.includes("leaking pipe") ||
            text.includes("pipe leak")
        ) {
            return "💧";
        }

        if (
            text.includes("road") ||
            text.includes("roads") ||
            text.includes("road damage")
        ) {
            return "🛣️";
        }

        if (
            text.includes("drainage") ||
            text.includes("drain") ||
            text.includes("sewage") ||
            text.includes("sewer")
        ) {
            return "🌊";
        }

        if (
            text.includes("traffic") ||
            text.includes("signal") ||
            text.includes("traffic light")
        ) {
            return "🚦";
        }

        return "📋";
    }
    return (
        <section className="my-complaints-page">

            {/* ================================
                PAGE HEADER
            ================================= */}

            <div className="my-complaints-header">

                <div className="my-complaints-title">

                    <div className="my-complaints-icon">
                        📋
                    </div>

                    <div>
                        <h2>My Complaints</h2>

                        <p>
                            View and track all complaints submitted by you.
                        </p>
                    </div>

                </div>


                <div className="my-complaints-actions">

                    <button
                        type="button"
                        className="my-complaints-btn secondary"
                        onClick={loadMyComplaints}
                        disabled={loading}
                    >
                        🔄 {loading ? "Refreshing..." : "Refresh"}
                    </button>

                    <button
                        type="button"
                        className="my-complaints-btn secondary"
                        onClick={goHome}
                    >
                        ← Dashboard
                    </button>

                </div>

            </div>


            {/* ================================
                LOADING
            ================================= */}

            {loading && (

                <div className="my-complaints-empty">

                    <div className="my-complaints-loading">
                        <div className="loading-spinner"></div>
                    </div>

                    <h3>Loading complaints...</h3>

                    <p>
                        Please wait while we fetch your complaints.
                    </p>

                </div>

            )}


            {/* ================================
                EMPTY STATE
            ================================= */}

            {!loading && complaints.length === 0 && (

                <div className="my-complaints-empty">

                    <div className="empty-complaint-icon">
                        📋
                    </div>

                    <h3>No complaints yet</h3>

                    <p>
                        You have not submitted any complaints yet.
                    </p>

                    <button
                        type="button"
                        className="empty-state-button"
                        onClick={goHome}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

            )}


            {/* ================================
                COMPLAINT LIST
            ================================= */}

            {!loading && complaints.length > 0 && (

                <div className="my-complaints-list">

                    {complaints.map((complaint, index) => (

                        <article
                            className="my-complaint-card"
                            key={complaint.id || complaint.trackingToken || index}
                        >

                            {/* ================================
                                CARD TOP
                            ================================= */}

                            <div className="my-complaint-top">

                                <div className="complaint-title-area">

                                    <div className="complaint-category-icon">
                                        {getComplaintIcon(complaint)}
                                    </div>

                                    <div>

                                        <h3>
                                            {complaint.title || "Untitled Complaint"}
                                        </h3>

                                        {complaint.trackingToken && (

                                            <div className="complaint-token">

                                                <span>
                                                    🏷️
                                                </span>

                                                <span>
                                                    {complaint.trackingToken}
                                                </span>

                                            </div>

                                        )}

                                    </div>

                                </div>


                                {/* STATUS */}

                                <span
                                    className={`my-status-badge ${
                                        getStatusClass
                                            ? getStatusClass(complaint.status)
                                            : ""
                                    }`}
                                >

                                    <span className="status-dot"></span>

                                    {formatStatus
                                        ? formatStatus(complaint.status)
                                        : complaint.status || "Pending"}

                                </span>

                            </div>


                            {/* ================================
                                DESCRIPTION
                            ================================= */}

                            <div className="my-complaint-description">

                                <span className="description-label">
                                    Description
                                </span>

                                <p>
                                    {complaint.description ||
                                        "No description provided."}
                                </p>

                            </div>


                            {/* ================================
                                DETAILS
                            ================================= */}

                            <div className="my-complaint-details">


                                {/* DEPARTMENT */}

                                <div className="complaint-detail">

                                    <span className="detail-icon">
                                        🏛️
                                    </span>

                                    <div>

                                        <span className="detail-label">
                                            Department
                                        </span>

                                        <strong>
                                            {complaint.department ||
                                                "Not assigned"}
                                        </strong>

                                    </div>

                                </div>


                                {/* PRIORITY */}

                                <div className="complaint-detail">

                                    <span className="detail-icon">
                                        🚩
                                    </span>

                                    <div>

                                        <span className="detail-label">
                                            Priority
                                        </span>

                                        <strong>

                                            <span
                                                className={`my-priority-badge ${
                                                    getPriorityClass
                                                        ? getPriorityClass(
                                                            complaint.priority ||
                                                            "NORMAL"
                                                        )
                                                        : ""
                                                }`}
                                            >
                                                {complaint.priority ||
                                                    "NORMAL"}
                                            </span>

                                        </strong>

                                    </div>

                                </div>


                                {/* SUBMITTED */}

                                <div className="complaint-detail">

                                    <span className="detail-icon">
                                        📅
                                    </span>

                                    <div>

                                        <span className="detail-label">
                                            Submitted
                                        </span>

                                        <strong>
                                            {formatDate
                                                ? formatDate(
                                                    complaint.createdAt
                                                )
                                                : "-"}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* ================================
                                AI SUMMARY
                            ================================= */}

                            {complaint.aiSummary && (

                                <div className="my-ai-summary">

                                    <div className="ai-summary-header">

                                        <div className="ai-icon">
                                            🤖
                                        </div>

                                        <strong>
                                            AI Summary
                                        </strong>

                                    </div>

                                    <p>
                                        {complaint.aiSummary}
                                    </p>

                                </div>

                            )}


                            {/* ================================
                                FOOTER
                            ================================= */}

                            <div className="my-complaint-footer">

                                <span>

                                    🕒 Last updated{" "}

                                    {formatDate
                                        ? formatDate(
                                            complaint.updatedAt ||
                                            complaint.createdAt
                                        )
                                        : "-"}

                                </span>


                                <button
                                    type="button"
                                    className="view-complaint-btn"
                                    onClick={() => {
                                        console.log(
                                            "Complaint details:",
                                            complaint
                                        );
                                    }}
                                >
                                    View Details
                                    <span>→</span>
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>
    );
}

export default MyComplaints;