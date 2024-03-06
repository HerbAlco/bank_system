package com.bank.banksystem.entity.bank_account_entity;

import com.bank.banksystem.entity.transaction_entity.Transaction;

import com.bank.banksystem.entity.user_entity.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AbstractBankAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private BigDecimal balance;

	@Enumerated(EnumType.STRING)
	private AccountType accountType;

	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = false)
	private User user;

	@OneToMany(mappedBy = "account")
	private List<Transaction> transactions;

	protected AbstractBankAccount() {
	}

	protected AbstractBankAccount(String accountNumber, BigDecimal balance, AccountType accountType, User user) {
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountType = accountType;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public BigDecimal getBalance() {
		return this.balance;
	}


	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public AccountType getAccountType(){
		return accountType;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void withdraw(BigDecimal amount) {
		if (amount.compareTo(BigDecimal.ZERO) <= 0) {
			throw new IllegalArgumentException("Vyžadovaná částka pro výběr musí být kladná");
		}

		BigDecimal newBalance = getBalance().subtract(amount);
		if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
			throw new IllegalArgumentException("Nedostatečný zůstatek na účtu pro provedení výběru");
		}

		setBalance(newBalance);
	}

	public void deposit(BigDecimal amount) {
		if (amount.compareTo(BigDecimal.ZERO) > 0) {
			setBalance(getBalance().add(amount));
		} else {
			throw new IllegalArgumentException("Vkládaná částka musí být kladná");
		}
	}

	public void transfer(BigDecimal amount, AbstractBankAccount targetAccount) {
		this.withdraw(amount);
		targetAccount.deposit(amount);
	}



	@Override
	public String toString() {
		return "Account{" +
			"id=" + id +
			", accountNumber='" + accountNumber + '\'' +
			", balance=" + balance +
			", user=" + user +
			'}';
	}
}
