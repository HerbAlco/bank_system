package com.bank.banksystem.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
@CrossOrigin(origins = "http://localhost:3000")
public class AuthResponse {

	private String token;

}


