package com.bank.banksystem.controller;

import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/user")
@AllArgsConstructor
public class UserController
{

	private final UserService userService;

	@PostMapping("/create")
	public ResponseEntity<User> addUser(@Valid @RequestBody User user)
	{
		User savedUser = userService.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	@GetMapping("/allusers")
	public ResponseEntity<List<User>> getAllUsers()
	{
		List<User> users = userService.findAll();
		return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
	}

	@GetMapping("/getuser/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable Long userId)
	{
		return userService.findById(userId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser)
	{
		return userService.updateUser(userId, updatedUser).map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.notFound().build());

	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<Void> deleteByUserId(@PathVariable Long userId)
	{
		return userService.deleteById(userId) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@GetMapping("/getcurrentuser")
	public ResponseEntity<User> getCurrentUserDetails()
	{
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return userService.getUserByEmail(username).map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

}
