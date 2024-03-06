package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import jakarta.persistence.Entity;

import java.math.BigDecimal;

@Entity
public class DepositTrans extends Transaction {

	public DepositTrans(BigDecimal amount, BankAccount account) {
		super(amount, account);
	}

	@Override
	public void execute() {
		this.getAccount().setBalance(this.getAccount().getBalance().add(this.getAmount()));
	}
}
