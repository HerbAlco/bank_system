package com.bank.banksystem.service.implService;

import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import com.bank.banksystem.service.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends AbstractService<User, Long>
{

	public UserServiceImpl(UserRepository repository)
	{
		super(repository);
	}
}