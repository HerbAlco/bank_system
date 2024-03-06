package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class WithdrawalTrans extends Transaction {

	public WithdrawalTrans(BigDecimal amount, BankAccount account) {
		super(amount, account);
	}

	@Override
	public void execute() {
		BigDecimal newBalance = this.getAccount().getBalance().subtract(this.getAmount());
		if (newBalance.compareTo(BigDecimal.ZERO) >= 0) {
			this.getAccount().setBalance(newBalance);
		} else {
			throw new InsufficientFundsException("Nedostatečný zůstatek na účtu pro provedení výběru");
		}
	}
}

