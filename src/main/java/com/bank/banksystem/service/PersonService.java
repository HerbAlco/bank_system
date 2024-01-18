package com.bank.banksystem.service;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.person_entity.Person;
import com.bank.banksystem.entity.person_entity.User;

import java.time.LocalDate;
import java.util.List;

public interface PersonService {
	Person findById(Long id);
	List<Person> findAll();
	Person save(Person person);
	void delete(Long id);
	User updatePerson(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String username, String password, String phoneNumber);

}

