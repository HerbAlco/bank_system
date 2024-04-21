package com.bank.banksystem.entity.transaction_entity;

public enum TransType
{
	KART_PAYMENT("Platba kartou"),
	PAYMENT_TRANSFER("Platba převodem")
	;

	TransType(String s)
	{
	}
}
