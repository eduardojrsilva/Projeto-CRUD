import { Component, OnInit } from '@angular/core';
import { Estado } from '../estado';
import { EstadoService } from '../estado.service';
import { ConfirmationService } from 'primeng/api'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EstadoListComponent implements OnInit {

  estado: Estado = new Estado();
  estados!: Estado[];
  selecionados!: Estado[];
  estadoDialog!: boolean;
  enviado!: boolean;

  constructor(private estadoService: EstadoService, private messageService: MessageService,
     private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarEstados();
  }

  private listarEstados(){
    this.estadoService.listaEstados().subscribe(data => {
      this.estados = data;
    });
  }

  abrirDialogo(){
    this.estado = new Estado();
    this.estadoDialog = true;
    this.enviado = false;
  }

  fecharDialogo(){
    this.estadoDialog = false;
    this.enviado = false;
  }

  salvarEstado(){
    this.enviado = true;
    if(this.estado.nome.trim() && this.estado.sigla.trim()){
      if(this.estado.id){
        this.estadoService.atualizarEstado(this.estado.id, this.estado).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Estado atualizado', life: 2000});
          this.listarEstados();
        },
        error =>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar atualizar o estado', life: 2000});
        });
      }else{
        this.estadoService.criarEstado(this.estado).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Estado cadastrado', life: 2000});
          this.listarEstados();
        },
        error => {
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar cadastrar o estado', life: 2000});
        });
      }
      this.estadoDialog = false;
    }
  }

  editarEstado(estado: Estado){
    this.estado = {...estado};
    this.estadoDialog = true;
  }

  excluirEstado(estado: Estado){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir o estado ' + estado.nome + '?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(estado);
      }
    })  
  }

  excluirEstadosSelecionados(){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir os estados selecionados?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.selecionados.forEach(estado => {
          this.excluir(estado);
        })
        this.selecionados = [];  
      }
    })
  }

  excluir(estado: Estado){
    this.estadoService.excluirEstado(estado.id).subscribe( data => {
      console.log(data);
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Estado ' + estado.nome + ' excluído', life: 2000});
      this.listarEstados();
    },
    error =>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar excluir o estado ' + estado.nome, life: 2000});
    });
  }
}
