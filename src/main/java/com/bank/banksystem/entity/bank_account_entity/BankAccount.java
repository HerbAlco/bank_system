package com.bank.banksystem.entity.bank_account_entity;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_account")
@Inheritance(strategy = InheritanceType.JOINED)
public class BankAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private BigDecimal balance;

	@Enumerated(EnumType.STRING)
	private AccountType accountType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	@ToString.Exclude
	private User user;

	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
	@ToString.Exclude
	private List<Transaction> transactions;

	@OneToMany(mappedBy = "toAccount", cascade = CascadeType.ALL, orphanRemoval = true)
	@ToString.Exclude
	private List<Transaction> incomingTransactions;
}
