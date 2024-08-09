package com.bank.banksystem.service;

import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class TransactionService
{

	private final TransactionRepository repository;

	@Transactional
	public void save(Transaction trans)
	{
		validateTransaction(trans);
		repository.save(trans);
	}

	private void validateTransaction(Transaction trans)
	{
		if (trans.getTransType() == TransType.TRANSFER) {
			if (trans.getToAccount() == null) {
				throw new IllegalArgumentException("To account must be provided for transfers");
			}
		}
	}

	@Transactional
	public List<Transaction> findAll()
	{
		return repository.findAll();
	}

	@Transactional
	public Optional<Transaction> findById(Long id)
	{
		return repository.findById(id);
	}

}