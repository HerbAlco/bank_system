package com.bank.banksystem.controller;

import com.bank.banksystem.controller.transRequest.DepositWithdrawRequest;
import com.bank.banksystem.controller.transRequest.TransferRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.service.AccountService;
import com.bank.banksystem.service.TransactionService;
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
	private final TransactionService transactionService;

	@GetMapping("/getall")
	public ResponseEntity<List<BankAccount>> getAllAccounts() {
		List<BankAccount> bankAccounts = accountService.findAll();
		return ResponseEntity.ok(bankAccounts);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<BankAccount> getAccountById(@PathVariable Long id) {
		BankAccount bankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));
		return ResponseEntity.ok(bankAccount);
	}

	@PostMapping("/create")
	public ResponseEntity<BankAccount> createAccount(@RequestBody BankAccount bankAccount) {
		Optional<User> optionalUser = userService.findById(bankAccount.getUser().getId());
		if (optionalUser.isPresent()) {
			bankAccount.setUser(optionalUser.get());
			BankAccount savedBankAccount = accountService.save(bankAccount);
			return ResponseEntity.ok(savedBankAccount);
		} else {
			throw new EntityNotFoundException("User not found with id: " + bankAccount.getUser().getId());
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<BankAccount> updateAccount(@PathVariable Long id, @RequestBody BankAccount bankAccountDetails) {
		BankAccount existingBankAccount = accountService.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));

		existingBankAccount.setBalance(bankAccountDetails.getBalance());
		BankAccount updatedBankAccount = accountService.save(existingBankAccount);
		return ResponseEntity.ok(updatedBankAccount);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
		accountService.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/deposit")
	public ResponseEntity<String> deposit(@RequestBody DepositWithdrawRequest request) {
		accountService.deposit(request.getId(), request.getAmount());
		BankAccount account = accountService.findById(request.getId())
			.orElseThrow(() -> new EntityNotFoundException("BankAccount not found with id: " + request.getId()));
		transactionService.createTransaction(account, request.getAmount(), TransType.DEPOSIT);
		return ResponseEntity.ok("Deposit successful.");
	}

	@PostMapping("/withdraw")
	public ResponseEntity<String> withdraw(@RequestBody DepositWithdrawRequest request) {
		accountService.withdraw(request.getId(), request.getAmount());
		BankAccount account = accountService.findById(request.getId())
			.orElseThrow(() -> new EntityNotFoundException("BankAccount not found with id: " + request.getId()));
		Transaction newTransaction = transactionService.createTransaction(account, request.getAmount(), TransType.WITHDRAW);
		return ResponseEntity.ok("Withdrawal successful.");
	}

	@PostMapping("/transfer")
	public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
		accountService.transfer(request.getFromAccountId(), request.getToAccountId(), request.getAmount());
		return ResponseEntity.ok("Transfer successful.");
	}

	@GetMapping("/transactions/{id}")
	public ResponseEntity<List<Transaction>> getTransactionsForAccount(@PathVariable Long id) {
		List<Transaction> transactions = accountService.getAllTransactions(id);
		return ResponseEntity.ok(transactions);
	}
}
