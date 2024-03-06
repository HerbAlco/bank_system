package com.bank.banksystem.entity.address_entity;

import jakarta.persistence.*;

@Embeddable
public class Address {

	private String street;
	private String city;
	private String postalCode;
	private String state;
	private String country;

	public Address() {
	}
	public Address(String street, String city, String postalCode, String state, String country) {
		this.street = street;
		this.city = city;
		this.postalCode = postalCode;
		this.state = state;
		this.country = country;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}


	@Override
	public String toString() {
		return "Address [street=" + street + ", city=" + city + ", zipCode=" + postalCode +
			", state=" + state + ", country=" + country + "]";
	}
}