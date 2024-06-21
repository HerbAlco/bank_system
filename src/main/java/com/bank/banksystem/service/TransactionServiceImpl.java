package com.bank.banksystem.service;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.repository.AccountRepository;
import com.bank.banksystem.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

	private final TransactionRepository transactionRepository;
	private final AccountRepository accountRepository;

	@Autowired
	public TransactionServiceImpl(TransactionRepository transactionRepository, AccountRepository accountRepository) {
		this.transactionRepository = transactionRepository;
		this.accountRepository = accountRepository;
	}

	@Override
	@Transactional
	public Transaction createTransaction(Transaction transaction) {
		transaction.execute();
		return transactionRepository.save(transaction);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Transaction> getTransactionsForAccount(Long accountId) {
		// Můžete přidat kontrolu existence účtu
		return transactionRepository.findByAccountId(accountId);
	}

}

