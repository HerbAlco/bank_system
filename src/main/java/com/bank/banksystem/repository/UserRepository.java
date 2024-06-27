package com.bank.banksystem.repository;

import com.bank.banksystem.entity.user_entity.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String email);
}
