package com.bank.banksystem.auth;

import com.bank.banksystem.config.JwtService;
import com.bank.banksystem.entity.user_entity.Role;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authManager;

	public AuthResponse register (RegisterRequest request){
		var user = User.builder()
			.firstName(request.getFirstname())
			.lastName(request.getLastname())
			.username(request.getUsername())
			.email(request.getUsername())
			.password(passwordEncoder.encode(request.getPassword()))
			.role(Role.USER)
			.build();
		repository.save(user);
		System.err.println(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthResponse.builder()
			.token(jwtToken)
			.build();
	}

	public AuthResponse authenticate(AuthRequest request){
		authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				request.getUsername(),
				request.getPassword()
			)
		);
		var user = repository.findByUsername(request.getUsername()).orElseThrow();
		System.err.println(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthResponse.builder()
			.token(jwtToken)
			.build();
	}
}
