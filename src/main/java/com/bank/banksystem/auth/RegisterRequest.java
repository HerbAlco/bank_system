package com.bank.banksystem.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterRequest {

	private String firstname;
	private String lastname;
	private String email;
	private String password;

}
