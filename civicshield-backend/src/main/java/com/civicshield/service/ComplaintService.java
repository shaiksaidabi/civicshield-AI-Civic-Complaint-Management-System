package com.civicshield.service;

import com.civicshield.dto.request.ComplaintRequestDTO;
import com.civicshield.dto.request.UpdateStatusRequestDTO;
import com.civicshield.dto.response.ComplaintResponseDTO;
import com.civicshield.dto.response.DashboardStatsDTO;
import com.civicshield.dto.response.DepartmentStatsDTO;
import com.civicshield.entity.enums.ComplaintStatus;
import com.civicshield.entity.enums.Department;
import com.civicshield.entity.enums.Priority;

import java.util.List;

public interface ComplaintService {

    ComplaintResponseDTO submitComplaint(
            ComplaintRequestDTO request
    );

    ComplaintResponseDTO getComplaintByTrackingToken(
            String trackingToken
    );

    ComplaintResponseDTO updateComplaintStatus(
            Long id,
            UpdateStatusRequestDTO request
    );

    List<ComplaintResponseDTO> getAllComplaints();

    List<ComplaintResponseDTO> getMyComplaints();

    List<ComplaintResponseDTO> getComplaintsByDepartment(
            Department department
    );

    List<ComplaintResponseDTO> getComplaintsByDepartmentAndPriority(
            Department department,
            Priority priority
    );

    List<ComplaintResponseDTO> getComplaintsByDepartmentAndStatus(
            Department department,
            ComplaintStatus status
    );

    DashboardStatsDTO getDashboardStats();

    DepartmentStatsDTO getDepartmentStats(
            Department department
    );
}