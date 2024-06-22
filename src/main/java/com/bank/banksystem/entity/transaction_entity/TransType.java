package com.bank.banksystem.entity.transaction_entity;

import lombok.Getter;

@Getter
public enum TransType {

	KART_PAYMENT("Platba kartou"),
	TRANSFER("Platba převodem"),
	WITHDRAW("Výběr"),
	DEPOSIT("Vklad");

	private final String value;

	TransType(String value) {
		this.value = value;
	}

}