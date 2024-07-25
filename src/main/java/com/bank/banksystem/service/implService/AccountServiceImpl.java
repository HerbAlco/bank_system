package com.bank.banksystem.service.implService;

import com.bank.banksystem.controller.transRequest.TransRequest;
import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import com.bank.banksystem.repository.AccountRepository;
import com.bank.banksystem.service.AbstractService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AccountServiceImpl extends AbstractService<BankAccount, Long>
{

	private final TransactionServiceImpl transactionService;

	@Autowired
	public AccountServiceImpl(AccountRepository repository, TransactionServiceImpl transactionService)
	{
		super(repository);
		this.transactionService = transactionService;
	}

	@Override
	@Transactional
	public BankAccount save(BankAccount account)
	{
		if (account.getAccountNumber() == null)
			account.setAccountNumber(generateUniqueAccountNumber());

		return super.save(account);
	}

	private String generateUniqueAccountNumber()
	{
		String accountNumber;
		do
		{
			accountNumber = "CZ100025" + ThreadLocalRandom.current().nextInt(10000, 100000);
		}
		while (((AccountRepository)repository).existsByAccountNumber(accountNumber));

		return accountNumber;
	}

	@Transactional
	public void processTransaction(TransRequest trans) throws EntityNotFoundException, IllegalArgumentException
	{
		String accountNumber = trans.getAccountNumber();
		BankAccount fromBankAccount;
		fromBankAccount = ((AccountRepository)repository).findByAccountNumber(accountNumber)
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
				BankAccount toBankAccount = ((AccountRepository)repository).findByAccountNumber(toAccountNumber)
					.orElseThrow(() -> new EntityNotFoundException("Zadejte platné číslo protiúčtu"));
				handleTransfer(trans, fromBankAccount, toBankAccount);
				transaction.setToAccount(toBankAccount);
				yield fromBankAccount.getBalance().subtract(trans.getAmount());
			}
			default -> throw new IllegalArgumentException("Unsupported transaction type: " + trans.getTransType());
		};

		fromBankAccount.setBalance(newBalance);
		super.save(fromBankAccount);

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
		BigDecimal fromAccountBalance = fromBankAccount.getBalance();
		if (fromAccountBalance.compareTo(amount) < 0)
		{
			throw new InsufficientFundsException("Nedostatěčný zůstatek na účtě");
		}
		toBankAccount.setBalance(toBankAccount.getBalance().add(amount));
		super.save(toBankAccount);
	}

	@Transactional(readOnly = true)
	public List<Transaction> getAllTransactions(Long accountId)
	{
		BankAccount bankAccount = super.findById(accountId)
			.orElseThrow(() -> new EntityNotFoundException("Bank account not found with id: " + accountId));
		return bankAccount.getTransactions();
	}


	public List<BankAccount> getAllAccountByUsername(String username)
	{
		return super.findAll().stream().filter(account -> account.getUser().getUsername().equals(username)).toList();
	}
}