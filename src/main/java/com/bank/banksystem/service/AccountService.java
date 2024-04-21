package com.bank.banksystem.service;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AccountService extends GenericService<BankAccount, Long> {

	public AccountService(AccountRepository repository) {
		super(repository);
	}

	@Transactional
	public void deposit(Long accountId, BigDecimal amount) {
		BankAccount bankAccount = repository.findById(accountId)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + accountId));
		BigDecimal balance = bankAccount.getBalance().add(amount);
		bankAccount.setBalance(balance);
		repository.save(bankAccount);
	}

	@Transactional
	public void withdraw(Long accountId, BigDecimal amount) {
		BankAccount bankAccount = repository.findById(accountId)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + accountId));
		BigDecimal balance = bankAccount.getBalance().subtract(amount);
		bankAccount.setBalance(balance);
		repository.save(bankAccount);
	}

	@Transactional
	public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
		BankAccount fromBankAccount = repository.findById(fromAccountId)
			.orElseThrow(() -> new EntityNotFoundException("Account not found with id: " + fromAccountId));
		BankAccount toBankAccount = repository.findById(toAccountId)
			.orElseThrow(() -> new EntityNotFoundException("Account not found with id: " + toAccountId));

		BigDecimal fromAccountBalance = fromBankAccount.getBalance();
		if (fromAccountBalance.compareTo(amount) < 0) {
			throw new InsufficientFundsException("Insufficient balance in the account to make the transfer");
		}

		BigDecimal newFromAccountBalance = fromAccountBalance.subtract(amount);
		fromBankAccount.setBalance(newFromAccountBalance);
		repository.save(fromBankAccount);

		BigDecimal toAccountBalance = toBankAccount.getBalance();
		BigDecimal newToAccountBalance = toAccountBalance.add(amount);
		toBankAccount.setBalance(newToAccountBalance);
		repository.save(toBankAccount);
	}
}