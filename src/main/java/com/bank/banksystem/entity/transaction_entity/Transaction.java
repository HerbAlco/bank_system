package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id", nullable = false)
	@JsonIgnore
	private BankAccount account;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "to_account_id")
	@JsonIgnore
	private BankAccount toAccount;

	private String symbol;

	private String note;

	@Enumerated(EnumType.STRING)
	private TransType transType;

	@PrePersist
	protected void onCreate() {
		this.dateTimeTrans = LocalDateTime.now();
	}

	@JsonProperty("accountNumber")
	public String getAccountNumber() {
		return account != null ? account.getAccountNumber() : null;
	}

	@JsonProperty("toAccountNumber")
	public String getToAccountNumber() {
		return toAccount != null ? toAccount.getAccountNumber() : null;
	}

}
