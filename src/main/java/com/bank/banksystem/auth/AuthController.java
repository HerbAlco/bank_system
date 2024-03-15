package com.bank.banksystem.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	private final AuthService service;

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(
		@RequestBody RegisterRequest request
	){
		return ResponseEntity.ok(service.register(request));
	}


	@PostMapping("/authenticate")
	public ResponseEntity<AuthResponse> authenticate(
		@RequestBody AuthRequest request
	){
		return ResponseEntity.ok(service.authenticate(request));
	}
}
