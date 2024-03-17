package com.bank.banksystem.entity.bank_account_entity;

import com.bank.banksystem.entity.transaction_entity.Transaction;
import com.bank.banksystem.entity.user_entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = ("_account"))
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

	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = false)
	private User user;

	@OneToMany(mappedBy = "account")
	private List<Transaction> transactions;

	public void addTransaction(Transaction transaction) {
		this.transactions.add(transaction);
		transaction.setAccount(this);
	}

}

