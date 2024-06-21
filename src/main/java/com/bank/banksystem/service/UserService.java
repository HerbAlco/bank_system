package com.bank.banksystem.service;

import com.bank.banksystem.entity.user_entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends GenericService<User, Long> {

	public UserService(JpaRepository<User, Long> repository)
	{
		super(repository);
	}
}