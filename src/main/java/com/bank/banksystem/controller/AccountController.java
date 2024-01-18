package com.bank.banksystem.controller;

import com.bank.banksystem.entity.account_entity.Account;
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
	public ResponseEntity<List<Account>> getAllAccounts() {
		List<Account> accounts = accountService.findAllAccounts();
		return ResponseEntity.ok(accounts);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
		Account account = accountService.findAccountById(id);
		return ResponseEntity.ok(account);
	}

	@PostMapping
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		Account newAccount = accountService.saveAccount(account);
		return ResponseEntity.ok(newAccount);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account accountDetails) {
		Account existingAccount = accountService.findAccountById(id);
		// Aktualizujte existující účet s novými detaily
		// Toto je místo, kde byste měli implementovat logiku aktualizace
		// Například:
		// existingAccount.setBalance(accountDetails.getBalance());
		// ... další nastavení polí
		Account updatedAccount = accountService.saveAccount(existingAccount);
		return ResponseEntity.ok(updatedAccount);
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

