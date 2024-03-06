package com.bank.banksystem.entity.bank_account_entity;

import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class BankAccount extends AbstractBankAccount {

	public BankAccount() {
		super();
	}

	@Override
	public void deposit(BigDecimal amount) {
		setBalance(getBalance().add(amount));
	}

	@Override
	public void withdraw(BigDecimal amount) {
		BigDecimal newBalance = getBalance().subtract(amount);
		if (newBalance.compareTo(BigDecimal.ZERO) >= 0) {
			setBalance(newBalance);
		} else {
			throw new IllegalArgumentException("Nedostatečný zůstatek na účtu pro provedení výběru");
		}
	}
}

