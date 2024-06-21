package com.bank.banksystem.service;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.user_entity.User;

import java.time.LocalDate;
import java.util.List;

public interface UserService {
	User findById(Long id);
	List<User> findAll();
	User save(User user);
	void delete(Long id);
	User updateUser(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String username, String password, String phoneNumber);

}

