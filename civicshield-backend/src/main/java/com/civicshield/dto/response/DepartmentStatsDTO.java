package com.civicshield.dto.response;

public record DepartmentStatsDTO(
        String department,
        long totalComplaints,
        long pendingComplaints,
        long inProgressComplaints,
        long resolvedComplaints,
        long criticalComplaints,
        long highPriorityComplaints
) {
}