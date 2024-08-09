package com.bank.banksystem.service;

import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.AccountType;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.TransType;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.repository.AccountRepository;
import com.bank.banksystem.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@AllArgsConstructor
public class AccountService
{

	private final TransactionService transactionService;
	private final UserService userService;
	private final AccountRepository accountRepository;
	private final UserRepository userRepository;


	@Transactional
	public BankAccount save(BankAccount account)
	{
		if (account.getAccountNumber() == null)
		{
			account.setAccountNumber(generateUniqueAccountNumber());
			account.setBalance(BigDecimal.valueOf(100000));
		}
		return accountRepository.save(account);
	}

	private String generateUniqueAccountNumber()
	{
		String accountNumber;
		do
		{
			accountNumber = "CZ100025" + ThreadLocalRandom.current().nextInt(10000, 100000);
		}
		while (accountRepository.existsByAccountNumber(accountNumber));

		return accountNumber;
	}

	@Transactional
	public void processTransaction(TransRequest trans)
	{
		String accountNumber = trans.getAccountNumber();
		BankAccount fromBankAccount;
		fromBankAccount = accountRepository.findByAccountNumber(accountNumber)
			.orElseThrow(() -> new EntityNotFoundException("Neplatné číslo vašeho účtu"));

		Transaction transaction = new Transaction();
		transaction.setAccount(fromBankAccount);
		transaction.setAmount(trans.getAmount());
		transaction.setNote(trans.getNote());
		transaction.setTransType(trans.getTransType());
		transaction.setSymbol(trans.getSymbol());

		BigDecimal newBalance = switch (trans.getTransType())
		{
			case DEPOSIT -> handleDeposit(fromBankAccount, trans.getAmount());
			case WITHDRAW -> handleWithdraw(fromBankAccount, trans.getAmount());
			case TRANSFER ->
			{
				String toAccountNumber = trans.getToAccountNumber();
				BankAccount toBankAccount = accountRepository.findByAccountNumber(toAccountNumber)
					.orElseThrow(() -> new EntityNotFoundException("Zadejte platné číslo protiúčtu"));
				handleTransfer(trans, fromBankAccount, toBankAccount);
				transaction.setToAccount(toBankAccount);
				yield fromBankAccount.getBalance().subtract(trans.getAmount());
			}
			default -> throw new IllegalArgumentException("Unsupported transaction type: " + trans.getTransType());
		};

		fromBankAccount.setBalance(newBalance);
		accountRepository.save(fromBankAccount);
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

	private void handleTransfer(TransRequest trans, BankAccount fromBankAccount, BankAccount toBankAccount)
	{
		BigDecimal amount = trans.getAmount();
		if (amount.compareTo(BigDecimal.ZERO) < 0)
		{
			throw new IllegalArgumentException("Částka nesmí být záporná");
		}
		if (fromBankAccount.getBalance().compareTo(amount) < 0)
		{
			throw new InsufficientFundsException("Nedostatěčný zůstatek na účtě");
		}
		toBankAccount.setBalance(toBankAccount.getBalance().add(amount));
		accountRepository.save(toBankAccount);
	}

	@Scheduled(cron = "0 0 14 * * ?")
	public void addDailySalary()
	{

		List<User> users = userRepository.findAll();
		BigDecimal salary = BigDecimal.valueOf(1500);

		for (User user : users)
		{
			List<BankAccount> accounts = accountRepository.findAccountsByUserId(user.getId());

			if (!accounts.isEmpty())
			{
				BankAccount firstAccount = accounts.get(0);

				Transaction transaction = new Transaction();
				transaction.setAccount(firstAccount);
				transaction.setAmount(salary);
				transaction.setTransType(TransType.DEPOSIT);
				transaction.setNote("Vaše výplata");
				transactionService.save(transaction);

				firstAccount.setBalance(firstAccount.getBalance().add(salary));

				accountRepository.save(firstAccount);
			}
		}
	}

	@Scheduled(cron = "0 0 14 * * ?")
	public void addDailySavingBonus()
	{

		List<User> users = userRepository.findAll();

		for (User user : users)
		{
			List<BankAccount> accounts = accountRepository.findAccountsByUserId(user.getId());

			BankAccount savingAccount = accounts.stream()
				.filter(bankAccount -> bankAccount.getAccountType() == AccountType.SAVINGS).findFirst().orElse(null);

			if (savingAccount != null && savingAccount.getBalance().equals(BigDecimal.valueOf(0)))
			{

				BigDecimal percentage = new BigDecimal("4").divide(new BigDecimal("100"), MathContext.DECIMAL128);
				Transaction transaction = new Transaction();
				transaction.setAccount(savingAccount);
				transaction.setAmount(savingAccount.getBalance().multiply(percentage));
				transaction.setTransType(TransType.DEPOSIT);
				transaction.setNote("Úroky z vkladu");
				transactionService.save(transaction);

				savingAccount.setBalance(savingAccount.getBalance().add(savingAccount.getBalance().multiply(percentage)));

				accountRepository.save(savingAccount);
			}
		}
	}

	@Transactional
	public BankAccount createAccountForUser(String username, BankAccount bankAccount)
	{
		Optional<User> currentUser = userService.getUserByEmail(username);

		if (currentUser.isPresent())
		{
			bankAccount.setUser(currentUser.get());
			bankAccount.setBalance(BigDecimal.valueOf(5000.00));
			return this.save(bankAccount);
		}
		else
		{
			throw new RuntimeException("User not found");
		}
	}

	@Transactional
	public Optional<BankAccount> findById(Long accountId)
	{
		return accountRepository.findById(accountId);
	}

	@Transactional
	public List<BankAccount> findAll()
	{
		return accountRepository.findAll();
	}

	@Transactional
	public boolean deleteById(Long accountId)
	{

		if (accountRepository.existsById(accountId))
		{
			accountRepository.deleteById(accountId);
			return true;
		}
		else
		{
			return false;
		}
	}

	@Transactional
	public BankAccount updateBankAccount(Long id, BankAccount bankAccountDetails)
	{
		BankAccount existingBankAccount = accountRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + id));

		if (bankAccountDetails.getName() != null)
		{
			existingBankAccount.setName(bankAccountDetails.getName());
		}
		if (bankAccountDetails.getAccountType() != null)
		{
			existingBankAccount.setAccountType(bankAccountDetails.getAccountType());
		}

		return accountRepository.save(existingBankAccount);
	}
}