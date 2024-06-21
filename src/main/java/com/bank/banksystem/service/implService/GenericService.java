package com.bank.banksystem.service.implService;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GenericService<T, ID> {

	protected final JpaRepository<T, ID> repository;

	public GenericService(JpaRepository<T, ID> repository) {
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