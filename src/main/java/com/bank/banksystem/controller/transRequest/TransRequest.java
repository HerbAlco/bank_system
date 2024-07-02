package com.bank.banksystem.controller.transRequest;

import com.bank.banksystem.entity.transaction_entity.TransType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class TransRequest
{
	private BigDecimal amount;

	private String accountNumber;

	private String toAccountNumber;

	private String symbol;

	private String note;

	private TransType transType;

}
