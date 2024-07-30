package com.bank.banksystem.service.implService;

import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import com.bank.banksystem.service.AbstractService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl extends AbstractService<User, Long>
{

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository repository, UserRepository userRepository)
	{
		super(repository);
		this.userRepository = userRepository;
	}

	public Optional<User> getUserByEmail(String email)
	{
		return userRepository.findByEmail(email);
	}

}