package com.bank.banksystem.repository;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<BankAccount, Long>
{
	boolean existsByAccountNumber(String accountNumber);

	Optional<BankAccount> findByAccountNumber(String accountNumber);

	List<BankAccount> findAccountsByUserId(Long userId);
}
