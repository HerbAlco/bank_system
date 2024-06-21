package com.bank.banksystem.service;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.exceptions.ResourceNotFoundException;
import com.bank.banksystem.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransactionService extends GenericService<Transaction, Long>{

	public TransactionService(TransactionRepository repository)
	{
		super(repository);
	}

	public Transaction createTransaction(BankAccount account, BigDecimal amount, TransType transType) {
		Transaction transaction = new Transaction();
		transaction.setAccount(account);
		transaction.setAmount(amount);
		transaction.setTransType(transType);
		transaction.setDateTimeTrans(LocalDateTime.now());
		try {
			return repository.save(transaction);
		} catch (Exception e) {
			throw new ResourceNotFoundException("Chyba při ukládání transakce do databáze: " + e);
		}
	}

}