package com.devconnector.controller;

import com.devconnector.dto.AuthRequestDTO;
import com.devconnector.dto.AuthResponseDTO;
import com.devconnector.dto.RegisterRequestDTO;
import com.devconnector.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth API")
public class AuthController {

    private final AuthService authService;

    @Operation(
        description = "Get endpoint to load user information",
        summary = "This is a summary for getting a user information endpoint",
        responses = {
            @ApiResponse(
                description = "Success",
                responseCode = "200"
            ),
            @ApiResponse(
                description = "Not found",
                responseCode = "404"
            )
        }
    )
    @GetMapping("/me")
    public ResponseEntity<Authentication> getMe(Authentication authentication) {
        return ResponseEntity.ok(authService.getUserMe(authentication));
    }

    @Operation(
        description = "Post endpoint for registering a user",
        summary = "This is a summary for registering a user endpoint",
        responses = {
            @ApiResponse(
                description = "Success",
                responseCode = "201"
            ),
            @ApiResponse(
                description = "Invalid Parameters",
                responseCode = "403"
            )
        }
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @Operation(
        description = "Post endpoint for authenticate a user",
        summary = "This is a summary for authenticate a user endpoint",
        responses = {
            @ApiResponse(
                description = "Success",
                    responseCode = "200"
                ),
                @ApiResponse(
                    description = "Invalid Parameters",
                    responseCode = "403"
                )
        }
    )
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}