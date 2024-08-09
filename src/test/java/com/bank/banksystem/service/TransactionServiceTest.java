package com.bank.banksystem.service;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class TransactionServiceTest
{

	@InjectMocks
	private TransactionService transactionService;

	@Mock
	private TransactionRepository transactionRepository;

	public TransactionServiceTest()
	{
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testSaveValidTransfer()
	{
		Transaction trans = new Transaction();
		trans.setTransType(TransType.TRANSFER);
		trans.setToAccount(new BankAccount());

		transactionService.save(trans);

		verify(transactionRepository, times(1)).save(trans);
	}

	@Test
	public void testSaveInvalidTransfer()
	{
		Transaction trans = new Transaction();
		trans.setTransType(TransType.TRANSFER);
		trans.setToAccount(null);

		IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
			transactionService.save(trans);
		});

		assertEquals("To account must be provided for transfers", thrown.getMessage());
	}
}

