package com.bank.banksystem.service;

import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.service.implService.GenericService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService extends GenericService<Transaction, Long>
{

	public TransactionService(JpaRepository<Transaction, Long> repository)
	{
		super(repository);
	}

	@Transactional
	public Transaction save(Transaction trans) {
		if (trans.getTransType() == TransType.TRANSFER) {
			if (trans.getToAccount() == null) {
				throw new IllegalArgumentException("To account must be provided for transfers");
			}
		}
		return repository.save(trans);
	}

}