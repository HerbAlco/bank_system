package com.bank.banksystem.entity.transaction_entity;

import com.bank.banksystem.entity.account_entity.Account;
import com.bank.banksystem.exceptions.InsufficientFundsException;
import jakarta.persistence.Entity;

import java.math.BigDecimal;

@Entity
public class PaymentTrans extends Transaction {

	private String paymentDetails;

	public PaymentTrans(BigDecimal amount, Account account, String paymentDetails) {
		super(amount, account);
		this.paymentDetails = paymentDetails;
	}

	public String getPaymentDetails() {
		return paymentDetails;
	}

	@Override
	public void execute() {
		BigDecimal newBalance = this.getAccount().getBalance().subtract(this.getAmount());
		if (newBalance.compareTo(BigDecimal.ZERO) >= 0) {
			this.getAccount().setBalance(newBalance);
		} else {
			throw new InsufficientFundsException("Nedostatečný zůstatek na účtu pro provedení platby");
		}
	}
}

