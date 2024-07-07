package com.bank.banksystem.controller;

import com.bank.banksystem.config.JwtService;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.implService.AccountServiceImpl;
import com.bank.banksystem.service.implService.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth/user")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class UserController
{

	private final UserServiceImpl userService;
	private final AccountServiceImpl accountService;
	private final JwtService jwtService;

	@PostMapping("/add")
	public ResponseEntity<User> addUser(@RequestBody User user)
	{
		//TODO: vytvoření accountu pro usera pri registraci nového usera
		//		User savedUser = userService.save(user);
		//		BankAccount newBankAccount = new BankAccount();
		//		newBankAccount.setUser(savedUser);
		//		newBankAccount.setBalance(BigDecimal.valueOf(100));
		//		accountService.save(newBankAccount);

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
	}

	@GetMapping("/allusers")
	public ResponseEntity<List<User>> getAllUsers()
	{
		List<User> users = userService.findAll();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/getuser/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable Long userId)
	{
		Optional<User> user = userService.findById(userId);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser)
	{
		Optional<User> existingUserOptional = userService.findById(userId);
		if (existingUserOptional.isPresent())
		{
			User existingUser = existingUserOptional.get();

			if (updatedUser.getFirstName() != null)
			{
				existingUser.setFirstName(updatedUser.getFirstName());
			}
			if (updatedUser.getLastName() != null)
			{
				existingUser.setLastName(updatedUser.getLastName());
			}
			if (updatedUser.getEmail() != null)
			{
				existingUser.setEmail(updatedUser.getEmail());
			}
			if (updatedUser.getUsername() != null)
			{
				existingUser.setUsername(updatedUser.getUsername());
			}
			if (updatedUser.getPassword() != null)
			{
				existingUser.setPassword(updatedUser.getPassword());
			}
			if (updatedUser.getBirthDate() != null)
			{
				existingUser.setBirthDate(updatedUser.getBirthDate());
			}
			if (updatedUser.getAddress() != null)
			{
				existingUser.setAddress(updatedUser.getAddress());
			}
			if (updatedUser.getPhoneNumber() != null)
			{
				existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
			}
			if (updatedUser.getRole() != null)
			{
				existingUser.setRole(updatedUser.getRole());
			}

			userService.save(existingUser);
			return ResponseEntity.ok(existingUser);
		}
		else
		{
			return ResponseEntity.notFound().build();
		}
	}


	@DeleteMapping("/delete/{userId}")
	@Transactional
	public ResponseEntity<String> deleteUser(@PathVariable Long userId)
	{
		Optional<User> user = userService.findById(userId);
		if (user.isPresent())
		{
			userService.deleteById(userId);
			return ResponseEntity.ok("User with ID " + userId + " has been successfully deleted.");
		}
		else
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
		}
	}

	@GetMapping("/getcurrentaccounts")
	public ResponseEntity<List<BankAccount>> getCurrentAccounts()
	{

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		List<BankAccount> accounts = accountService.getAllAccountByUsername(username);

		if (accounts != null && !accounts.isEmpty())
		{
			return ResponseEntity.ok(accounts);
		}
		else
		{
			return ResponseEntity.noContent().build();
		}

	}
}
