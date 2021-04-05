package com.eduardo.crud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.eduardo.crud.exception.ResourceNotFoundException;
import com.eduardo.crud.model.Cidade;
import com.eduardo.crud.model.CidadeDTO;
import com.eduardo.crud.repository.Cidades;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cidades")
public class CidadeController {
	@Autowired
	private Cidades cidades;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping
	public List<CidadeDTO> listaCidades(){
		return cidades.findAll().stream().map(this::toCidadeDTO).collect(Collectors.toList());
	}
	
	@PostMapping
	public Cidade criarCidade(@RequestBody Cidade cidade) {
		return cidades.save(cidade);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Cidade> buscarCidadePorId(@PathVariable Long id) {
		Cidade cidade = cidades.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A cidade com id=" + id + " não existe!"));
		return ResponseEntity.ok(cidade);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Cidade> atualizarCidade(@PathVariable Long id, @RequestBody Cidade c){
		Cidade cidade = cidades.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A cidade com id=" + id + " não existe!"));
		
		cidade.setNome(c.getNome());
		cidade.setEstado(c.getEstado());
		
		Cidade atualizaCidade = cidades.save(cidade);
		return ResponseEntity.ok(atualizaCidade);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> excluirCidade(@PathVariable Long id){
		Cidade cidade = cidades.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A cidade com id=" + id + " não existe!"));
		
		cidades.delete(cidade);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	private CidadeDTO toCidadeDTO(Cidade cidade) {
		return modelMapper.map(cidade, CidadeDTO.class);
	}
}
