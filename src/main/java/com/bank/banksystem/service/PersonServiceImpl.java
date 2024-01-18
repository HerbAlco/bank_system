package com.bank.banksystem.service;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.person_entity.Person;
import com.bank.banksystem.entity.person_entity.User;
import com.bank.banksystem.exceptions.ResourceNotFoundException;
import com.bank.banksystem.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

	private final PersonRepository personRepository;

	@Autowired
	public PersonServiceImpl(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public Person findById(Long id) {
		return personRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Person not found with id " + id));
	}

	@Override
	@Transactional(readOnly = true)
	public List<Person> findAll() {
		return personRepository.findAll();
	}

	@Override
	@Transactional
	public Person save(Person person) {
		return personRepository.save(person);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		personRepository.deleteById(id);
	}

	@Transactional
	public User updatePerson(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String username, String password, String phoneNumber) {
		User user = (User) personRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setBirthDate(birthDate);
		user.setAddress(address);
		user.setUsername(username);
		user.setPassword(password);
		user.setPhoneNumber(phoneNumber);

		return personRepository.save(user);
	}

}

