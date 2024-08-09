package com.bank.banksystem.service;

import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService
{

	private final UserRepository repository;

	public Optional<User> getUserByEmail(String email)
	{
		return repository.findByEmail(email);
	}

	@Transactional
	public Optional<User> updateUser(Long userId, User updatedUser)
	{
		return repository.findById(userId).map(existingUser -> {
			if (updatedUser.getFirstName() != null)
			{
				existingUser.setFirstName(updatedUser.getFirstName());
			}
			if (updatedUser.getLastName() != null)
			{
				existingUser.setLastName(updatedUser.getLastName());
			}
			if (updatedUser.getEmail() != null)
			{
				existingUser.setEmail(updatedUser.getEmail());
			}
			if (updatedUser.getUsername() != null)
			{
				existingUser.setUsername(updatedUser.getUsername());
			}
			if (updatedUser.getPassword() != null)
			{
				existingUser.setPassword(updatedUser.getPassword());
			}
			if (updatedUser.getBirthDate() != null)
			{
				existingUser.setBirthDate(updatedUser.getBirthDate());
			}
			if (updatedUser.getAddress() != null)
			{
				existingUser.setAddress(updatedUser.getAddress());
			}
			if (updatedUser.getPhoneNumber() != null)
			{
				existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
			}
			if (updatedUser.getRole() != null)
			{
				existingUser.setRole(updatedUser.getRole());
			}
			return repository.save(existingUser);
		});
	}

	@Transactional(readOnly = true)
	public Optional<User> findById(Long id)
	{
		return repository.findById(id);
	}

	@Transactional(readOnly = true)
	public List<User> findAll()
	{
		return repository.findAll();
	}

	@Transactional
	public User save(User user)
	{
		return repository.save(user);
	}

	@Transactional
	public boolean deleteById(Long userId)
	{
		if (repository.existsById(userId))
		{
			repository.deleteById(userId);
			return true;
		}
		else
		{
			return false;
		}
	}


}