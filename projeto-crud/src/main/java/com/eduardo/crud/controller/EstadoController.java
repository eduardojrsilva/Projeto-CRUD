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
import com.eduardo.crud.model.Estado;
import com.eduardo.crud.model.EstadoDTO;
import com.eduardo.crud.repository.Estados;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/estados")
public class EstadoController {
	@Autowired
	private Estados estados;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping
	public List<EstadoDTO> listaEstados(){
		return estados.findAll().stream().map(this::toEstadoDTO).collect(Collectors.toList());
	}
	
	@PostMapping
	public EstadoDTO criarEstado(@RequestBody Estado estado) {
		return this.toEstadoDTO(estados.save(estado));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<EstadoDTO> buscarEstadoPorId(@PathVariable Long id) {
		Estado estado = estados.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("O estado com id=" + id + " não existe!"));
		return ResponseEntity.ok(this.toEstadoDTO(estado));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<EstadoDTO> atualizarEstado(@PathVariable Long id, @RequestBody Estado e){
		Estado estado = estados.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("O estado com id=" + id + " não existe!"));
		
		estado.setNome(e.getNome());
		estado.setSigla(e.getSigla());
		
		Estado atualizaEstado = estados.save(estado);
		return ResponseEntity.ok(this.toEstadoDTO(atualizaEstado));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> excluirEstado(@PathVariable Long id){
		Estado estado = estados.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("O estado com id=" + id + " não existe!"));
		
		estados.delete(estado);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	private EstadoDTO toEstadoDTO(Estado estado) {
		return modelMapper.map(estado, EstadoDTO.class);
	}
}
