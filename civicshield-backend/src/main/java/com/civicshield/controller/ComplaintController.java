package com.civicshield.controller;

import com.civicshield.dto.request.ComplaintRequestDTO;
import com.civicshield.dto.request.UpdateStatusRequestDTO;
import com.civicshield.dto.response.ApiResponse;
import com.civicshield.dto.response.ComplaintResponseDTO;
import com.civicshield.dto.response.DashboardStatsDTO;
import com.civicshield.dto.response.DepartmentStatsDTO;
import com.civicshield.entity.enums.ComplaintStatus;
import com.civicshield.entity.enums.Department;
import com.civicshield.entity.enums.Priority;
import com.civicshield.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ComplaintResponseDTO> submitComplaint(
            @Valid @RequestBody ComplaintRequestDTO request) {

        return new ApiResponse<>(
                true,
                "Complaint submitted successfully",
                complaintService.submitComplaint(request)
        );
    }

    @GetMapping("/all")
    public ApiResponse<List<ComplaintResponseDTO>> getAllComplaints() {

        return new ApiResponse<>(
                true,
                "All complaints found",
                complaintService.getAllComplaints()
        );
    }

    @GetMapping("/dashboard/stats")
    public ApiResponse<DashboardStatsDTO> getDashboardStats() {

        return new ApiResponse<>(
                true,
                "Dashboard statistics found",
                complaintService.getDashboardStats()
        );
    }

    @GetMapping("/dashboard/stats/{department}")
    public ApiResponse<DepartmentStatsDTO> getDepartmentStats(
            @PathVariable Department department) {

        return new ApiResponse<>(
                true,
                "Department statistics found",
                complaintService.getDepartmentStats(department)
        );
    }

    @GetMapping("/department/{department}")
    public ApiResponse<List<ComplaintResponseDTO>> getComplaintsByDepartment(
            @PathVariable Department department) {

        return new ApiResponse<>(
                true,
                "Complaints found",
                complaintService.getComplaintsByDepartment(department)
        );
    }

    @GetMapping("/department/{department}/priority/{priority}")
    public ApiResponse<List<ComplaintResponseDTO>>
    getComplaintsByDepartmentAndPriority(
            @PathVariable Department department,
            @PathVariable Priority priority) {

        return new ApiResponse<>(
                true,
                "Complaints found",
                complaintService.getComplaintsByDepartmentAndPriority(
                        department,
                        priority
                )
        );
    }

    @GetMapping("/department/{department}/status/{status}")
    public ApiResponse<List<ComplaintResponseDTO>>
    getComplaintsByDepartmentAndStatus(
            @PathVariable Department department,
            @PathVariable ComplaintStatus status) {

        return new ApiResponse<>(
                true,
                "Complaints found",
                complaintService.getComplaintsByDepartmentAndStatus(
                        department,
                        status
                )
        );
    }

    @PutMapping("/{id}/status")
    public ApiResponse<ComplaintResponseDTO> updateComplaintStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequestDTO request) {

        return new ApiResponse<>(
                true,
                "Complaint status updated successfully",
                complaintService.updateComplaintStatus(id, request)
        );
    }
    @GetMapping("/my")
    public ApiResponse<List<ComplaintResponseDTO>> getMyComplaints() {

        return new ApiResponse<>(
                true,
                "My complaints found",
                complaintService.getMyComplaints()
        );
    }
    @GetMapping("/{trackingToken}")
    public ApiResponse<ComplaintResponseDTO> trackComplaint(
            @PathVariable String trackingToken) {

        return new ApiResponse<>(
                true,
                "Complaint found",
                complaintService.getComplaintByTrackingToken(trackingToken)
        );
    }
}