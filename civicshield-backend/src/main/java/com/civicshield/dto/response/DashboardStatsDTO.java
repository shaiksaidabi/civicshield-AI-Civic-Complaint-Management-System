package com.civicshield.dto.response;

public record DashboardStatsDTO(
        long totalComplaints,
        long pendingComplaints,
        long inProgressComplaints,
        long resolvedComplaints,
        long criticalComplaints,
        long highPriorityComplaints
) {
}