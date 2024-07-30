package com.bank.banksystem.init;

import com.bank.banksystem.entity.user_entity.Role;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Bean
	public ApplicationRunner initializer() {
		return args -> {
			if (userRepository.findByEmail("admin").isEmpty()) {
				User admin = new User();
				admin.setEmail("admin");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setRole(Role.ADMIN);
				userRepository.save(admin);
			}
		};
	}

}