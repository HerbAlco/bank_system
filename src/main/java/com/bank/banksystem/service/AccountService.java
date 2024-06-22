package com.bank.banksystem.service;

import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.repository.AccountRepository;
import com.bank.banksystem.service.implService.GenericService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService extends GenericService<BankAccount, Long>
{


	private final TransactionService transactionService;

	@Autowired
	public AccountService(AccountRepository repository, TransactionService transactionService)
	{
		super(repository);
		this.transactionService = transactionService;
	}

	@Transactional
	public void processTransaction(TransRequest trans)
	{
		Long accountId = trans.getAccountId();
		BankAccount fromBankAccount = repository.findById(accountId)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + accountId));

		Transaction transaction = new Transaction();
		transaction.setAccount(fromBankAccount);
		transaction.setAmount(trans.getAmount());
		transaction.setNote(trans.getNote());
		transaction.setTransType(trans.getTransType());
		transaction.setSymbol(trans.getSymbol());

		BigDecimal newBalance = switch (trans.getTransType()) {
			case DEPOSIT -> handleDeposit(fromBankAccount, trans.getAmount());
			case WITHDRAW -> handleWithdraw(fromBankAccount, trans.getAmount());
			case TRANSFER -> {
				Long toAccountId = trans.getToAccountId();
				BankAccount toBankAccount = repository.findById(toAccountId)
					.orElseThrow(() -> new EntityNotFoundException("Account not found with id: " + toAccountId));
				handleTransfer(trans, fromBankAccount, toBankAccount);
				transaction.setToAccount(toBankAccount);
				yield fromBankAccount.getBalance().subtract(trans.getAmount());
			}
			default -> throw new IllegalArgumentException("Unsupported transaction type: " + trans.getTransType());
		};

		fromBankAccount.setBalance(newBalance);
		repository.save(fromBankAccount);

		transactionService.save(transaction);
	}

	private BigDecimal handleDeposit(BankAccount bankAccount, BigDecimal amount)
	{
		return bankAccount.getBalance().add(amount);
	}

	private BigDecimal handleWithdraw(BankAccount bankAccount, BigDecimal amount)
	{
		return bankAccount.getBalance().subtract(amount);
	}

	private void handleTransfer(TransRequest trans, BankAccount fromBankAccount, BankAccount toBankAccount) {
		BigDecimal amount = trans.getAmount();
		if (amount.compareTo(BigDecimal.ZERO) < 0) {
			throw new IllegalArgumentException("Transfer amount must be positive");
		}
		BigDecimal fromAccountBalance = fromBankAccount.getBalance();
		if (fromAccountBalance.compareTo(amount) < 0) {
			throw new InsufficientFundsException("Insufficient balance in the account to make the transfer");
		}
		toBankAccount.setBalance(toBankAccount.getBalance().add(amount));
		repository.save(toBankAccount);
	}

	@Transactional(readOnly = true)
	public List<Transaction> getAllTransactions(Long accountId)
	{
		BankAccount bankAccount = repository.findById(accountId)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + accountId));
		return bankAccount.getTransactions();
	}
}