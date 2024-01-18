package com.bank.banksystem.entity.account_entity;

import com.bank.banksystem.entity.person_entity.Person;
import com.bank.banksystem.entity.transaction_entity.Transaction;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Account {
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
	private Person owner;

	@OneToMany(mappedBy = "account")
	private List<Transaction> transactions;

	protected Account() {
	}

	protected Account(String accountNumber, BigDecimal balance,AccountType accountType, Person owner) {
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountType = accountType;
		this.owner = owner;
	}

	public Long getId() {
		return id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public AccountType getAccountType(){
		return accountType;
	}

	public Person getOwner() {
		return owner;
	}

	public void setOwner(Person owner) {
		this.owner = owner;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public abstract void deposit(BigDecimal amount);
	public abstract void withdraw(BigDecimal amount);

	@Override
	public String toString() {
		return "Account{" +
			"id=" + id +
			", accountNumber='" + accountNumber + '\'' +
			", balance=" + balance +
			", owner=" + owner +
			'}';
	}
}
