package com.bank.banksystem.entity.person_entity;

import com.bank.banksystem.entity.address_entity.Address;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Administrator extends Person {

	@NotEmpty
	private String username;

	@NotEmpty
	private String password;

	@OneToMany(mappedBy = "administrator")
	private List<User> managedUsers;

	public Administrator() {
		super();
	}

	public Administrator(Long id, String firstName, String lastName, String email, LocalDate birthDate, Address address, String username, String password, String phoneNumber) {
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

	public List<User> getManagedUsers() {
		return managedUsers;
	}

	public void setManagedUsers(List<User> managedUsers) {
		this.managedUsers = managedUsers;
	}

	public void addUser(User user) {
		this.managedUsers.add(user);
	}

	public void removeUser(User user) {
		this.managedUsers.remove(user);
	}

	@Override
	public String toString() {
		return "Administrator{" +
			"id=" + getId() +
			", firstName='" + getFirstName() + '\'' +
			", lastName='" + getLastName() + '\'' +
			", email='" + getEmail() + '\'' +
			", birthDate=" + getBirthDate() +
			", address=" + getAddress() +
			", username='" + username + '\'' +
			", managedUsers=" + managedUsers +
			'}';
	}
}

