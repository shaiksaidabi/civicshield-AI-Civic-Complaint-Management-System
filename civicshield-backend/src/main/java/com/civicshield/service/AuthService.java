package com.civicshield.service;

import com.civicshield.dto.request.LoginRequestDTO;
import com.civicshield.dto.request.RegisterRequestDTO;
import com.civicshield.dto.response.LoginResponseDTO;
import com.civicshield.entity.User;
import com.civicshield.repository.UserRepository;
import com.civicshield.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(request.username());
        user.setPassword(
                passwordEncoder.encode(request.password())
        );
        user.setRole(request.role());

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new LoginResponseDTO(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByUsername(
                request.username()
        ).orElseThrow(
                () -> new RuntimeException("Invalid username or password")
        );

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new LoginResponseDTO(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }
}