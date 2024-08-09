package com.bank.banksystem.controller;

import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.service.AccountService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/account")
@AllArgsConstructor
public class AccountController
{

	private final AccountService accountService;

	@PostMapping("/create")
	public ResponseEntity<?> createAccount(@RequestBody BankAccount bankAccount)
	{
		try
		{
			String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
			BankAccount savedBankAccount = accountService.createAccountForUser(currentUsername, bankAccount);
			return new ResponseEntity<>(savedBankAccount, HttpStatus.CREATED);
		}
		catch (RuntimeException e)
		{
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
		catch (Exception e)
		{
			return new ResponseEntity<>("Error creating account", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<BankAccount> getAccountById(@PathVariable Long id)
	{
		return accountService.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/getall")
	public ResponseEntity<List<BankAccount>> getAllAccounts()
	{
		List<BankAccount> bankAccounts = accountService.findAll();
		return bankAccounts.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(bankAccounts);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<BankAccount> updateAccount(@PathVariable Long id, @RequestBody BankAccount bankAccountDetails)
	{
		try
		{
			BankAccount updatedBankAccount = accountService.updateBankAccount(id, bankAccountDetails);
			return ResponseEntity.ok(updatedBankAccount);
		}
		catch (EntityNotFoundException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}


	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id)
	{
		return accountService.deleteById(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}

	@PostMapping("/processTransaction")
	public ResponseEntity<String> transfer(@RequestBody TransRequest trans)
	{
		try
		{
			accountService.processTransaction(trans);
			return ResponseEntity.ok("Transfer successful.");
		}
		catch (EntityNotFoundException | IllegalArgumentException | InsufficientFundsException e)
		{
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}
