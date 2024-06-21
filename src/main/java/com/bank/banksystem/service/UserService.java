package com.bank.banksystem.service;

import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends GenericService<User, Long> {

	public UserService(UserRepository repository)
	{
		super(repository);
	}
}