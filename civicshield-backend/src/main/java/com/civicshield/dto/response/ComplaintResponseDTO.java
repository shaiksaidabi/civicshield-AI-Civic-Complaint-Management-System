package com.civicshield.dto.response;

import com.civicshield.entity.enums.ComplaintStatus;
import com.civicshield.entity.enums.Department;
import com.civicshield.entity.enums.Priority;

import java.time.LocalDateTime;

public record ComplaintResponseDTO(

        Long id,

        String trackingToken,

        String title,

        String description,

        String imagePath,

        Double latitude,

        Double longitude,

        Department department,

        Priority priority,

        ComplaintStatus status,

        String aiSummary,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}