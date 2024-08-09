package com.bank.banksystem.controller;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth/trans")
public class TransController {

	private final TransactionService service;

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getTransactionById(@PathVariable Long id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Transaction>> getAllTransactions() {
		return ResponseEntity.ok(service.findAll());
	}

}
