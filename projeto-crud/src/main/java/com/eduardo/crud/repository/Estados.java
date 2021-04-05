package com.eduardo.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduardo.crud.model.Estado;

@Repository
public interface Estados extends JpaRepository<Estado, Long>{
	
}
