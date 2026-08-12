package com.civicshield.dto.request;

import com.civicshield.entity.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequestDTO(

        @NotBlank
        String username,

        @NotBlank
        String password,

        @NotNull
        Role role
) {
}