package com.bank.banksystem.controller;

import com.bank.banksystem.config.JwtService;
import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.implService.AccountServiceImpl;
import com.bank.banksystem.service.implService.UserServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth/account")
@AllArgsConstructor
public class AccountController
{

	private final AccountServiceImpl accountService;
	private final UserServiceImpl userService;
	private final JwtService jwtService;

	@PostMapping("/create")
	public ResponseEntity<?> createAccount(@RequestHeader("Authorization") String authorizationHeader,
		@RequestBody BankAccount bankAccount)
	{
		try
		{
			String token = authorizationHeader.replace("Bearer ", "");
			String currentUsername = jwtService.extractUsername(token);
			Optional<User> currentUser = userService.getUserByEmail(currentUsername);

			if (currentUser.isPresent())
			{
				bankAccount.setUser(currentUser.get());
				bankAccount.setBalance(BigDecimal.valueOf(0.0));
				BankAccount savedBankAccount = accountService.save(bankAccount);
				return new ResponseEntity<>(savedBankAccount, HttpStatus.CREATED);
			}
			else
			{
				return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
			}
		}
		catch (Exception e)
		{
			return new ResponseEntity<>("Error creating account", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<BankAccount> getAccountById(@PathVariable Long id)
	{
		BankAccount bankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));
		return ResponseEntity.ok(bankAccount);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<BankAccount>> getAllAccounts()
	{
		List<BankAccount> bankAccounts = accountService.findAll();
		return ResponseEntity.ok(bankAccounts);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<BankAccount> updateAccount(@RequestHeader("Authorization") String authorizationHeader,
		@PathVariable Long id, @RequestBody BankAccount bankAccountDetails)
	{


		BankAccount existingBankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));

		if (bankAccountDetails.getName() != null)
			existingBankAccount.setName(bankAccountDetails.getName());
		if (bankAccountDetails.getAccountType() != null)
			existingBankAccount.setAccountType(bankAccountDetails.getAccountType());

		BankAccount updatedBankAccount = accountService.save(existingBankAccount);
		return ResponseEntity.ok(updatedBankAccount);

	}


	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id)
	{
		accountService.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/processTransaction")
	public ResponseEntity<String> transfer(@RequestBody TransRequest trans)
	{
		accountService.processTransaction(trans);
		return ResponseEntity.ok("Transfer successful.");
	}

	@GetMapping("/transactions/{id}")
	public ResponseEntity<List<Transaction>> getTransactionsForAccount(@PathVariable Long id)
	{
		List<Transaction> transactions = accountService.getAllTransactions(id);
		return ResponseEntity.ok(transactions);
	}

}
