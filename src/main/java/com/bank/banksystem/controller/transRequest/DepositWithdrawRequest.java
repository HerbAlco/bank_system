package com.bank.banksystem.controller.transRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class DepositWithdrawRequest
{
	private Long id;
	private BigDecimal amount;
}
