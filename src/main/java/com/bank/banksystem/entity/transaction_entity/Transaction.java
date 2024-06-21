package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = ("_transaction"))
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

	public abstract void execute();
}

