package com.eduardo.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduardo.crud.model.Pessoa;

@Repository
public interface Pessoas extends JpaRepository<Pessoa, Long>{
	
}
