package com.bank.banksystem.controller;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.service.implService.TransactionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth/trans")
@CrossOrigin(origins = "http://localhost:3000")
public class TransController {

	private final TransactionServiceImpl transactionService;

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getTransactionById(@PathVariable Long id) {
		Optional<Transaction> transaction = transactionService.findById(id);
		return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Transaction>> getAllTransactions() {
		return ResponseEntity.ok(transactionService.findAll());
	}

//	@PutMapping("/update/{id}")
//	public ResponseEntity<?> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
//		transaction.setId(id);
//		Transaction updatedTransaction = transactionService.save(transaction);
//		return ResponseEntity.ok(updatedTransaction);
//	}

//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
//		if (transactionService.findById(id).isPresent()) {
//			transactionService.deleteById(id);
//			return ResponseEntity.noContent().build();
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
}
