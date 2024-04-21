package com.bank.banksystem.entity.address_entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Address {

	private String street;
	private String city;
	private String postalCode;
	private String state;
	private String country;

}