package com.bank.banksystem.entity.account_entity;

import com.bank.banksystem.entity.person_entity.Person;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class CheckingAccount extends Account {

	public CheckingAccount() {
		super();
	}

	public CheckingAccount(String accountNumber, BigDecimal balance, Person owner) {
		super(accountNumber, balance, AccountType.CHECKING, owner);
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

