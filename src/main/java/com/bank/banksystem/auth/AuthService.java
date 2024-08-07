package com.bank.banksystem.auth;

import com.bank.banksystem.config.JwtService;
import com.bank.banksystem.entity.user_entity.Role;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.exceptions.UserAlreadyExistsException;
import com.bank.banksystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private final JwtService jwtService;
	private final AuthenticationManager authManager;

	public AuthResponse register(RegisterRequest request) {
		var existUser = repository.findByEmail(request.getEmail());
		if (existUser.isPresent()) {
			throw new UserAlreadyExistsException("Uživatel s touto emailovou adresou již existuje, prosím zadejte jiný email.");
		}

		var user = User.builder()
			.firstName(request.getFirstname())
			.lastName(request.getLastname())
			.username(request.getEmail())
			.email(request.getEmail())
			.password(passwordEncoder.encode(request.getPassword()))
			.role(Role.USER)
			.build();

		repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthResponse.builder().token(jwtToken).build();
	}

	public AuthResponse authenticate(AuthRequest request){
		authManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				request.getUsername(),
				request.getPassword()
			)
		);
		var user = repository.findByEmail(request.getUsername()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthResponse.builder()
			.token(jwtToken)
			.build();
	}
}
