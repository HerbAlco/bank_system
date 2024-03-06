package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public abstract class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private LocalDateTime timestamp;

	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	private BankAccount account;

	protected Transaction() {
	}

	protected Transaction(BigDecimal amount, BankAccount account) {
		this.amount = amount;
		this.timestamp = LocalDateTime.now();
		this.account = account;
	}

	public Long getId() {
		return id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public BankAccount getAccount() {
		return account;
	}

	public void setAccount(BankAccount account) {
		this.account = account;
	}

	public abstract void execute();

	@Override
	public String toString() {
		return "Transaction{" +
			"id=" + id +
			", amount=" + amount +
			", timestamp=" + timestamp +
			", account=" + account +
			'}';
	}
}

