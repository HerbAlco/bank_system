package com.bank.banksystem.service;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.service.implService.GenericService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service

public class TransactionService extends GenericService<Transaction, Long>
{

	public TransactionService(JpaRepository<Transaction, Long> repository)
	{
		super(repository);
	}
}