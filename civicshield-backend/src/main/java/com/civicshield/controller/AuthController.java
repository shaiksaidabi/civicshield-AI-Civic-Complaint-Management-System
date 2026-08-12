package com.civicshield.controller;

import com.civicshield.dto.request.LoginRequestDTO;
import com.civicshield.dto.request.RegisterRequestDTO;
import com.civicshield.dto.response.ApiResponse;
import com.civicshield.dto.response.LoginResponseDTO;
import com.civicshield.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<LoginResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO request) {

        return new ApiResponse<>(
                true,
                "Registration successful",
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request) {

        return new ApiResponse<>(
                true,
                "Login successful",
                authService.login(request)
        );
    }
}