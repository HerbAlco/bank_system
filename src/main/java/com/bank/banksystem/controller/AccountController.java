package com.bank.banksystem.controller;

import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.AccountService;
import com.bank.banksystem.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth/account")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class AccountController {

	private final AccountService accountService;
	private final UserService userService;

	@PostMapping("/create/{userId}")
	public ResponseEntity<BankAccount> createAccount(@PathVariable Long userId, @RequestBody BankAccount bankAccount) {
		Optional<User> optionalUser = userService.findById(userId);
		if (optionalUser.isPresent()) {
			bankAccount.setUser(optionalUser.get());
			BankAccount savedBankAccount = accountService.save(bankAccount);
			return ResponseEntity.ok(savedBankAccount);
		} else {
			throw new EntityNotFoundException("User not found with id: " + bankAccount.getUser().getId());
		}
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<BankAccount> getAccountById(@PathVariable Long id) {
		BankAccount bankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));
		return ResponseEntity.ok(bankAccount);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<BankAccount>> getAllAccounts() {
		List<BankAccount> bankAccounts = accountService.findAll();
		return ResponseEntity.ok(bankAccounts);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<BankAccount> updateAccount(@PathVariable Long id, @RequestBody BankAccount bankAccountDetails) {
		BankAccount existingBankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));

		if (bankAccountDetails.getName() != null)
			existingBankAccount.setName(bankAccountDetails.getName());

		BankAccount updatedBankAccount = accountService.save(existingBankAccount);
		return ResponseEntity.ok(updatedBankAccount);
	}


	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		accountService.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/processTransaction")
	public ResponseEntity<String> transfer(@RequestBody TransRequest trans) {
		accountService.processTransaction(trans);
		return ResponseEntity.ok("Transfer successful.");
	}

	@GetMapping("/transactions/{id}")
	public ResponseEntity<List<Transaction>> getTransactionsForAccount(@PathVariable Long id) {
		List<Transaction> transactions = accountService.getAllTransactions(id);
		return ResponseEntity.ok(transactions);
	}

//	@GetMapping("/currentAccountTransactions/{accountId}")
//	public ResponseEntity<List<Transaction>> getAllTransactionsForAccount(
//		@PathVariable Long accountId) {
//
//		List<Transaction> transactions = accountService.getAllTransactions(accountId);
//		return ResponseEntity.ok(transactions);
//	}
}
