package com.bank.banksystem.service.implService;

import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.repository.TransactionRepository;
import com.bank.banksystem.service.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionServiceImpl extends AbstractService<Transaction, Long>
{

	public TransactionServiceImpl(TransactionRepository repository)
	{
		super(repository);
	}

	@Override
	@Transactional
	public Transaction save(Transaction trans) {
		if (trans.getTransType() == TransType.TRANSFER) {
			if (trans.getToAccount() == null) {
				throw new IllegalArgumentException("To account must be provided for transfers");
			}
		}
		return super.save(trans);
	}

}