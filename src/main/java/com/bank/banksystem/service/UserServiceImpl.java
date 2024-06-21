package com.bank.banksystem.service;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.user_entity.User;
import com.bank.banksystem.exceptions.ResourceNotFoundException;
import com.bank.banksystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public User findById(Long id) {
		return userRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Person not found with id " + id));
	}

	@Override
	@Transactional(readOnly = true)
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	@Transactional
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User updateUser(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address,
		String username, String password, String phoneNumber) {
		return null;
	}


}

