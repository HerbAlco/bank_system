package com.bank.banksystem.service;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.exceptions.ResourceNotFoundException;
import com.bank.banksystem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

	private final AccountRepository accountRepository;

	@Autowired
	public AccountService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	@Transactional(readOnly = true)
	public BankAccount findAccountById(Long id) {
		return accountRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
	}

	@Transactional(readOnly = true)
	public List<BankAccount> findAllAccounts() {
		return accountRepository.findAll();
	}

	@Transactional
	public BankAccount saveAccount(BankAccount newBankAccount){
		return accountRepository.save(newBankAccount);
	}

	@Transactional
	public void deleteAccount(Long id){
		accountRepository.deleteById(id);
	}

	@Transactional
	public void deposit(Long accountId, BigDecimal amount) {
		BankAccount bankAccount = accountRepository.findById(accountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + accountId));

		bankAccount.setBalance(bankAccount.getBalance().add(amount));
		accountRepository.save(bankAccount);
	}

	@Transactional
	public void withdraw(Long accountId, BigDecimal amount) {
		BankAccount bankAccount = accountRepository.findById(accountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + accountId));

		BigDecimal newBalance = bankAccount.getBalance().subtract(amount);

		if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
			throw new InsufficientFundsException("Insufficient funds for withdrawal");
		}

		bankAccount.setBalance(newBalance);
		accountRepository.save(bankAccount);
	}

	@Transactional
	public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
		BankAccount fromBankAccount = accountRepository.findById(fromAccountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + fromAccountId));

		BankAccount toBankAccount = accountRepository.findById(toAccountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + toAccountId));

		if (fromBankAccount.getBalance().compareTo(amount) < 0) {
			throw new InsufficientFundsException("Nedostatečný zůstatek na účtu pro provedení převodu");
		}

		fromBankAccount.setBalance(fromBankAccount.getBalance().subtract(amount));
		toBankAccount.setBalance(toBankAccount.getBalance().add(amount));

		accountRepository.save(fromBankAccount);
		accountRepository.save(toBankAccount);
	}

}
