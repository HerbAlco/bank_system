package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.account_entity.Account;
import jakarta.persistence.Entity;

import java.math.BigDecimal;

@Entity
public class DepositTrans extends Transaction {

	public DepositTrans(BigDecimal amount, Account account) {
		super(amount, account);
	}

	@Override
	public void execute() {
		this.getAccount().setBalance(this.getAccount().getBalance().add(this.getAmount()));
	}
}
