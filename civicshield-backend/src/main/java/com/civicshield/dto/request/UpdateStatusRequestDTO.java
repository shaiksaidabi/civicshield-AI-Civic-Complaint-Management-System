package com.civicshield.dto.request;

import com.civicshield.entity.enums.ComplaintStatus;
import lombok.Data;

@Data
public class UpdateStatusRequestDTO {

    private ComplaintStatus status;

}