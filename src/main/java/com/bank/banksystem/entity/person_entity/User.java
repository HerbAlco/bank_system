package com.bank.banksystem.entity.person_entity;

import com.bank.banksystem.entity.address_entity.Address;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;
import java.util.List;

@Entity
public class User extends Person {
	@NotEmpty
	private String username;
	@NotEmpty
	private String password;

	public User() {
		super();
	}

	public User(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String username, String password, String phoneNumber) {
		super(id, firstName, lastName, email, birthDate, address, phoneNumber);
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User{" +
			"id=" + getId() +
			", firstName='" + getFirstName() + '\'' +
			", lastName='" + getLastName() + '\'' +
			", email='" + getEmail() + '\'' +
			", birthDate=" + getBirthDate() +
			", address=" + getAddress() +
			", username='" + username + '\'' +
			'}';
	}
}