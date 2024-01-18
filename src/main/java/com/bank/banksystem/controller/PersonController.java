package com.bank.banksystem.controller;

import com.bank.banksystem.entity.address_entity.Address;
import com.bank.banksystem.entity.person_entity.Person;
import com.bank.banksystem.entity.person_entity.User;
import com.bank.banksystem.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

	@Autowired
	private PersonService personService;

	@GetMapping
	public ResponseEntity<List<Person>> getAllPersons() {
		List<Person> persons = personService.findAll();
		return ResponseEntity.ok(persons);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Person> getPersonById(@PathVariable Long id) {
		Person person = personService.findById(id);
		return ResponseEntity.ok(person);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id,
		@RequestParam String firstName,
		@RequestParam String lastName,
		@RequestParam String email,
		@RequestParam LocalDate birthDate,
		@RequestParam String street,
		@RequestParam String city,
		@RequestParam String zipCode,
		@RequestParam String state,
		@RequestParam String country,
		@RequestParam String phoneNumber,
		@RequestParam String username,
		@RequestParam String password) {
		Address address = new Address(street, city, zipCode, state, country);
		User updatedUser = personService.updatePerson(id, firstName, lastName, email, birthDate, address, username, password, phoneNumber);
		return ResponseEntity.ok(updatedUser);
	}

}
