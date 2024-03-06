package com.bank.banksystem.controller;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.service.AccountService;
import com.bank.banksystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

	private final AccountService accountService;
	private final TransactionService transactionService;

	@Autowired
	public AccountController(AccountService accountService, TransactionService transactionService) {
		this.accountService = accountService;
		this.transactionService = transactionService;
	}

	@GetMapping
	public ResponseEntity<List<BankAccount>> getAllAccounts() {
		List<BankAccount> bankAccount = accountService.findAllAccounts();
		return ResponseEntity.ok(bankAccount);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BankAccount> getAccountById(@PathVariable Long id) {
		BankAccount bankAccount = accountService.findAccountById(id);
		return ResponseEntity.ok(bankAccount);
	}

	@PostMapping
	public ResponseEntity<BankAccount> createAccount(@RequestBody BankAccount bankAccount) {
		BankAccount newBankAccount = accountService.saveAccount(bankAccount);
		return ResponseEntity.ok(newBankAccount);
	}

	@PutMapping("/{id}")
	public ResponseEntity<BankAccount> updateAccount(@PathVariable Long id, @RequestBody BankAccount bankAccountDetails) {
		BankAccount existingBankAccount = accountService.findAccountById(id);
		BankAccount updatedBankAccount = accountService.saveAccount(existingBankAccount);
		return ResponseEntity.ok(updatedBankAccount);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		accountService.deleteAccount(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/{id}/deposit")
	public ResponseEntity<?> deposit(@PathVariable Long id, @RequestBody BigDecimal amount) {
		accountService.deposit(id, amount);
		return ResponseEntity.ok("Vklad byl úspěšně proveden.");
	}

	@PostMapping("/{id}/withdraw")
	public ResponseEntity<?> withdraw(@PathVariable Long id, @RequestBody BigDecimal amount) {
		accountService.withdraw(id, amount);
		return ResponseEntity.ok("Výběr byl úspěšně proveden.");
	}

	@PostMapping("/{id}/transfer")
	public ResponseEntity<?> transfer(@PathVariable Long id, @RequestParam("toAccountId") Long toAccountId, @RequestBody BigDecimal amount) {
		accountService.transfer(id, toAccountId, amount);
		return ResponseEntity.ok("Převod byl úspěšně proveden.");
	}

	@GetMapping("/{id}/transactions")
	public ResponseEntity<List<Transaction>> getTransactionsForAccount(@PathVariable Long id) {
		List<Transaction> transactions = transactionService.getTransactionsForAccount(id);
		return ResponseEntity.ok(transactions);
	}
}

