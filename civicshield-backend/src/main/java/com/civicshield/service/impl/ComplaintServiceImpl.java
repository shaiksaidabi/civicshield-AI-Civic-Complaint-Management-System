package com.civicshield.service.impl;
import com.civicshield.entity.User;
import com.civicshield.repository.UserRepository;
import com.civicshield.ai.AiClassificationService;
import com.civicshield.ai.ReportAnalysis;
import com.civicshield.dto.request.ComplaintRequestDTO;
import com.civicshield.dto.request.UpdateStatusRequestDTO;
import com.civicshield.dto.response.ComplaintResponseDTO;
import com.civicshield.dto.response.DashboardStatsDTO;
import com.civicshield.dto.response.DepartmentStatsDTO;
import com.civicshield.entity.Complaint;
import com.civicshield.entity.User;
import com.civicshield.entity.enums.ComplaintStatus;
import com.civicshield.entity.enums.Department;
import com.civicshield.entity.enums.Priority;
import com.civicshield.repository.ComplaintRepository;
import com.civicshield.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;

    private final AiClassificationService aiClassificationService;
    private final UserRepository userRepository;
    @Override
    public ComplaintResponseDTO submitComplaint(
            ComplaintRequestDTO request) {

        Complaint complaint = new Complaint();

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        complaint.setUser(user);

        complaint.setTrackingToken(generateTrackingToken());

        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setImagePath(request.getImagePath());
        complaint.setLatitude(request.getLatitude());
        complaint.setLongitude(request.getLongitude());

        ReportAnalysis analysis =
                aiClassificationService.analyzeComplaint(
                        request.getDescription()
                );

        complaint.setDepartment(
                convertToDepartment(analysis.category())
        );

        complaint.setPriority(
                convertToPriority(analysis.urgency())
        );

        complaint.setAiSummary(
                analysis.summary()
        );

        complaint.setStatus(ComplaintStatus.PENDING);

        Complaint savedComplaint =
                complaintRepository.save(complaint);

        return mapToResponse(savedComplaint);
    }

    @Override
    public ComplaintResponseDTO getComplaintByTrackingToken(
            String trackingToken) {

        Complaint complaint =
                complaintRepository
                        .findByTrackingToken(trackingToken)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"
                                ));

        return mapToResponse(complaint);
    }

    @Override
    public ComplaintResponseDTO updateComplaintStatus(
            Long id,
            UpdateStatusRequestDTO request) {

        Complaint complaint =
                complaintRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"
                                ));

        complaint.setStatus(request.getStatus());

        Complaint updatedComplaint =
                complaintRepository.save(complaint);

        return mapToResponse(updatedComplaint);
    }

    @Override
    public List<ComplaintResponseDTO> getComplaintsByDepartment(
            Department department) {

        return complaintRepository
                .findByDepartment(department)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ComplaintResponseDTO>
    getComplaintsByDepartmentAndPriority(
            Department department,
            Priority priority) {

        return complaintRepository
                .findByDepartmentAndPriority(
                        department,
                        priority
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ComplaintResponseDTO>
    getComplaintsByDepartmentAndStatus(
            Department department,
            ComplaintStatus status) {

        return complaintRepository
                .findByDepartmentAndStatus(
                        department,
                        status
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ComplaintResponseDTO> getAllComplaints() {

        return complaintRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DashboardStatsDTO getDashboardStats() {

        long total =
                complaintRepository.count();

        long pending =
                complaintRepository.countByStatus(
                        ComplaintStatus.PENDING
                );

        long inProgress =
                complaintRepository.countByStatus(
                        ComplaintStatus.IN_PROGRESS
                );

        long resolved =
                complaintRepository.countByStatus(
                        ComplaintStatus.RESOLVED
                );

        long critical =
                complaintRepository.countByPriority(
                        Priority.CRITICAL
                );

        long high =
                complaintRepository.countByPriority(
                        Priority.HIGH
                );

        return new DashboardStatsDTO(
                total,
                pending,
                inProgress,
                resolved,
                critical,
                high
        );
    }

    @Override
    public DepartmentStatsDTO getDepartmentStats(
            Department department) {

        long total =
                complaintRepository.countByDepartment(
                        department
                );

        long pending =
                complaintRepository.countByDepartmentAndStatus(
                        department,
                        ComplaintStatus.PENDING
                );

        long inProgress =
                complaintRepository.countByDepartmentAndStatus(
                        department,
                        ComplaintStatus.IN_PROGRESS
                );

        long resolved =
                complaintRepository.countByDepartmentAndStatus(
                        department,
                        ComplaintStatus.RESOLVED
                );

        long critical =
                complaintRepository.countByDepartmentAndPriority(
                        department,
                        Priority.CRITICAL
                );

        long high =
                complaintRepository.countByDepartmentAndPriority(
                        department,
                        Priority.HIGH
                );

        return new DepartmentStatsDTO(
                department.name(),
                total,
                pending,
                inProgress,
                resolved,
                critical,
                high
        );
    }

    private Department convertToDepartment(
            String category) {

        if (category == null) {
            return Department.MUNICIPAL;
        }

        return switch (category.toUpperCase()) {

            case "IMMEDIATE_SAFETY" ->
                    Department.WOMEN_SAFETY;

            case "INFRASTRUCTURE" ->
                    Department.PUBLIC_WORKS;

            case "TRAFFIC" ->
                    Department.TRAFFIC;

            case "MUNICIPAL" ->
                    Department.MUNICIPAL;

            case "ELECTRICITY" ->
                    Department.ELECTRICITY;

            case "HEALTH" ->
                    Department.HEALTH;

            default ->
                    Department.MUNICIPAL;
        };
    }

    private Priority convertToPriority(
            String urgency) {

        if (urgency == null) {
            return Priority.NORMAL;
        }

        return switch (urgency.toUpperCase()) {

            case "CRITICAL" ->
                    Priority.CRITICAL;

            case "HIGH" ->
                    Priority.HIGH;

            case "MEDIUM", "LOW" ->
                    Priority.NORMAL;

            default ->
                    Priority.NORMAL;
        };
    }

    private ComplaintResponseDTO mapToResponse(
            Complaint complaint) {

        return new ComplaintResponseDTO(
                complaint.getId(),
                complaint.getTrackingToken(),
                complaint.getTitle(),
                complaint.getDescription(),
                complaint.getImagePath(),
                complaint.getLatitude(),
                complaint.getLongitude(),
                complaint.getDepartment(),
                complaint.getPriority(),
                complaint.getStatus(),
                complaint.getAiSummary(),
                complaint.getCreatedAt(),
                complaint.getUpdatedAt()
        );
    }

    private String generateTrackingToken() {

        return "CS-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }
    @Override
    public List<ComplaintResponseDTO> getMyComplaints() {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return complaintRepository
                .findByUserUsername(username)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}