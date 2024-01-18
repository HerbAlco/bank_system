package com.bank.banksystem.service;

import com.bank.banksystem.entity.account_entity.Account;
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
	public Account findAccountById(Long id) {
		return accountRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
	}

	@Transactional(readOnly = true)
	public List<Account> findAllAccounts() {
		return accountRepository.findAll();
	}

	@Transactional
	public Account saveAccount(Account newAccount){
		return accountRepository.save(newAccount);
	}

	@Transactional
	public void deleteAccount(Long id){
		accountRepository.deleteById(id);
	}

	@Transactional
	public void deposit(Long accountId, BigDecimal amount) {
		Account account = accountRepository.findById(accountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + accountId));

		account.setBalance(account.getBalance().add(amount));
		accountRepository.save(account);
	}

	@Transactional
	public void withdraw(Long accountId, BigDecimal amount) {
		Account account = accountRepository.findById(accountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + accountId));

		BigDecimal newBalance = account.getBalance().subtract(amount);

		if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
			throw new InsufficientFundsException("Insufficient funds for withdrawal");
		}

		account.setBalance(newBalance);
		accountRepository.save(account);
	}

	@Transactional
	public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
		Account fromAccount = accountRepository.findById(fromAccountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + fromAccountId));

		Account toAccount = accountRepository.findById(toAccountId)
			.orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + toAccountId));

		if (fromAccount.getBalance().compareTo(amount) < 0) {
			throw new InsufficientFundsException("Nedostatečný zůstatek na účtu pro provedení převodu");
		}

		fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
		toAccount.setBalance(toAccount.getBalance().add(amount));

		accountRepository.save(fromAccount);
		accountRepository.save(toAccount);
	}

}
