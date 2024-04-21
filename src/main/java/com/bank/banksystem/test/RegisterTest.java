package com.bank.banksystem.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/authResponse")
public class RegisterTest {

	@GetMapping
	public ResponseEntity<String> responseOk(){
		return ResponseEntity.ok("Request ok");
	}
}
