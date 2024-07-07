package com.bank.banksystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public abstract class AbstractService<T, ID> {

	protected final JpaRepository<T, ID> repository;

	@Autowired
	public AbstractService(JpaRepository<T, ID> repository) {
		this.repository = repository;
	}

	@Transactional
	public T save(T entity) {
		return repository.save(entity);
	}

	@Transactional(readOnly = true)
	public Optional<T> findById(ID id) {
		return repository.findById(id);
	}

	@Transactional(readOnly = true)
	public List<T> findAll() {
		return repository.findAll();
	}

	@Transactional
	public void deleteById(ID id) {
		repository.deleteById(id);
	}
}