package com.bank.banksystem.service;

import com.bank.banksystem.entity.transaction_entity.Transaction;

import java.util.List;

public interface TransactionService {
	Transaction createTransaction(Transaction transaction);
	List<Transaction> getTransactionsForAccount(Long accountId);
}

