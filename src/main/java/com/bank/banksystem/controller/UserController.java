package com.bank.banksystem.controller;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.AccountService;
import com.bank.banksystem.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth/user")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class UserController {

	private final UserService userService;
	private final AccountService accountService;

	@PostMapping("/add")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		User savedUser = userService.save(user);

		BankAccount newBankAccount = new BankAccount();
		newBankAccount.setUser(savedUser);
		newBankAccount.setBalance(BigDecimal.valueOf(100));
		accountService.save(newBankAccount);

		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	@GetMapping("/allusers")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.findAll();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/getuser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		Optional<User> user = userService.findById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
		Optional<User> existingUser = userService.findById(id);
		if (existingUser.isPresent()) {
			userService.save(updatedUser);
			return ResponseEntity.ok(updatedUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/delete/{id}")
	@Transactional
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		Optional<User> user = userService.findById(id);
		if (user.isPresent()) {
			userService.deleteById(id);
			return ResponseEntity.ok("User with ID " + id + " has been successfully deleted.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + id + " not found.");
		}
	}
}
