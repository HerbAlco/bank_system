package com.bank.banksystem.controller;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/person")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/add")
	public ResponseEntity<User> addPerson(@RequestBody User person) {
		User savedPerson = userService.save(person);
		return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
	}


	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.findAll();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.findById(id);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id,
		@RequestParam String firstName,
		@RequestParam String lastName,
		@RequestParam String email,
		@RequestParam LocalDate birthDate,
		@RequestParam String street,
		@RequestParam String city,
		@RequestParam String zipCode,
		@RequestParam String state,
		@RequestParam String country,
		@RequestParam String phoneNumber,
		@RequestParam String username,
		@RequestParam String password) {
		Address address = new Address(street, city, zipCode, state, country);
		User updatedUser = userService.updateUser(id, firstName, lastName, email, birthDate, address, username, password, phoneNumber);
		return ResponseEntity.ok(updatedUser);
	}

}
