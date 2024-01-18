package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.account_entity.Account;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

@Entity
public class TransferTrans extends Transaction {

	@ManyToOne
	private Account toAccount;

	public TransferTrans(BigDecimal amount, Account fromAccount, Account toAccount) {
		super(amount, fromAccount);
		this.toAccount = toAccount;
	}

	public Account getToAccount() {
		return toAccount;
	}

	@Override
	public void execute() {
		if (this.getAccount().getBalance().compareTo(this.getAmount()) >= 0) {
			this.getAccount().setBalance(this.getAccount().getBalance().subtract(this.getAmount()));
			this.toAccount.setBalance(this.toAccount.getBalance().add(this.getAmount()));
		} else {
			throw new InsufficientFundsException("Nedostatečný zůstatek na účtu pro provedení převodu");
		}
	}
}

