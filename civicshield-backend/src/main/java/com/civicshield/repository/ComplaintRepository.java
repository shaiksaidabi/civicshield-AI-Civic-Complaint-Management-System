package com.civicshield.repository;

import com.civicshield.entity.Complaint;
import com.civicshield.entity.enums.ComplaintStatus;
import com.civicshield.entity.enums.Department;
import com.civicshield.entity.enums.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Optional<Complaint> findByTrackingToken(String trackingToken);

    List<Complaint> findByDepartment(
            Department department
    );

    List<Complaint> findByDepartmentAndPriority(
            Department department,
            Priority priority
    );

    List<Complaint> findByDepartmentAndStatus(
            Department department,
            ComplaintStatus status
    );

    List<Complaint> findByUserUsername(
            String username
    );

    long countByStatus(
            ComplaintStatus status
    );

    long countByPriority(
            Priority priority
    );

    long countByDepartment(
            Department department
    );

    long countByDepartmentAndStatus(
            Department department,
            ComplaintStatus status
    );

    long countByDepartmentAndPriority(
            Department department,
            Priority priority
    );
}