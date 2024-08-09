package com.bank.banksystem.entity.realty_entity;

import com.bank.banksystem.entity.address_entity.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_realty")
@Entity
public class Realty
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String name;
	private String description;
	private TypeRealty type;
	private Address address;
	private BigDecimal area;
	private int numberOfRooms;
	private Condition condition;
	private BigDecimal price;
	private BigDecimal pricePerSquareMeter;
	private BigDecimal rent;
	private BigDecimal estimatedValue;
	private String priceHistory;
	private String owner;
	private boolean mortgage;
	private boolean gardenOrBalcony;

}
