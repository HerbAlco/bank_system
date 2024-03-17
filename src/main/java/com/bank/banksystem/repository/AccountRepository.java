package com.bank.banksystem.repository;

import com.bank.banksystem.entity.bank_account_entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<BankAccount, Long> {

}
