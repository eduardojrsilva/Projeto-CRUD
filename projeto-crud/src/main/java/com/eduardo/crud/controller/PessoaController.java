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
import com.eduardo.crud.model.Pessoa;
import com.eduardo.crud.model.PessoaDTO;
import com.eduardo.crud.repository.Pessoas;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/pessoas")
public class PessoaController {
	@Autowired
	private Pessoas pessoas;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping
	public List<PessoaDTO> listaPessoas(){
		return pessoas.findAll().stream().map(this::toPessoaDTO).collect(Collectors.toList());
	}
	
	@PostMapping
	public Pessoa criarPessoa(@RequestBody Pessoa pessoa) {
		return pessoas.save(pessoa);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Pessoa> buscarPessoaPorId(@PathVariable Long id) {
		Pessoa pessoa = pessoas.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A pessoa com id=" + id + " não existe!"));
		return ResponseEntity.ok(pessoa);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long id, @RequestBody Pessoa p){
		Pessoa pessoa = pessoas.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A pessoa com id=" + id + " não existe!"));
		
		pessoa.setNome(p.getNome());
		pessoa.setCpf(p.getCpf());
		pessoa.setCidade(p.getCidade());
		
		Pessoa atualizaPessoa = pessoas.save(pessoa);
		return ResponseEntity.ok(atualizaPessoa);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> ExcluirPessoa(@PathVariable Long id){
		Pessoa pessoa = pessoas.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("A pessoa com id=" + id + " não existe!"));
		
		pessoas.delete(pessoa);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	private PessoaDTO toPessoaDTO(Pessoa pessoa) {
		return modelMapper.map(pessoa, PessoaDTO.class);
	}
}
