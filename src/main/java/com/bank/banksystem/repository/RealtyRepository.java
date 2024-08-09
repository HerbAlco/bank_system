package com.bank.banksystem.repository;

import com.bank.banksystem.entity.realty_entity.Realty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealtyRepository extends JpaRepository<Realty, Long>
{

}
