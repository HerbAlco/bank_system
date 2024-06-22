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
@Table(name = "_transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private LocalDateTime dateTimeTrans;

	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	private BankAccount account;

	@ManyToOne
	@JoinColumn(name = "to_account_id")
	private BankAccount toAccount;

	private String symbol;

	private String note;

	@Enumerated(EnumType.STRING)
	private TransType transType;

	@PrePersist
	protected void onCreate() {
		this.dateTimeTrans = LocalDateTime.now();
	}
}
