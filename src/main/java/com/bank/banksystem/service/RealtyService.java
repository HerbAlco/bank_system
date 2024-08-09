package com.bank.banksystem.service;

import com.bank.banksystem.repository.RealtyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RealtyService
{
	private final RealtyRepository repository;
}
