package com.bank.banksystem.entity.person_entity;

import com.bank.banksystem.entity.address_entity.Address;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.Period;


@MappedSuperclass
public abstract class Person {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotEmpty
	private String firstName;
	@NotEmpty
	private String lastName;
	@Email
	private String email;
	private LocalDate birthDate;
	private Address address;

	private String phoneNumber;

	Person() {
	}

	Person(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String phoneNumber) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.birthDate = birthDate;
		this.address = address;
		this.phoneNumber = phoneNumber;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFullName() {
		return firstName + " " + lastName;
	}

	public int getAge() {
		return Period.between(birthDate, LocalDate.now()).getYears();
	}

	public boolean isAdult() {
		return getAge() >= 18;
	}

	public void updateInfo(Person updatedPerson) {
		this.firstName = updatedPerson.getFirstName();
		this.lastName = updatedPerson.getLastName();
		this.email = updatedPerson.getEmail();
		this.birthDate = updatedPerson.getBirthDate();
		this.address = updatedPerson.getAddress();
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
			+ ", birthDate=" + birthDate + ", address=" + address + "]";
	}

}