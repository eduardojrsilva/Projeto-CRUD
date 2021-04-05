package com.eduardo.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduardo.crud.model.Cidade;

@Repository
public interface Cidades extends JpaRepository<Cidade, Long>{
	
}
