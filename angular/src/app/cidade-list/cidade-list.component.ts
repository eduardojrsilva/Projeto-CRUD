import { Component, OnInit } from '@angular/core';
import { Cidade } from '../cidade';
import { Estado } from '../estado';
import { CidadeService } from '../cidade.service';
import { EstadoService } from '../estado.service'; 
import { ConfirmationService } from 'primeng/api'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CidadeListComponent implements OnInit {

  cidade: Cidade = new Cidade();
  cidades!: Cidade[];
  selecionados!: Cidade[];
  estados!: Estado[];
  cidadeDialog!: boolean;
  enviado!: boolean;

  constructor(private cidadeService: CidadeService, private estadoService: EstadoService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarCidades();
    this.listaEstados();
  }

  private listarCidades(){
    this.cidadeService.listaCidades().subscribe(data => {
      this.cidades = data;
    });
  }

  private listaEstados(){
    this.estadoService.listaEstados().subscribe(data => {
      this.estados = data;
    })
  }

  abrirDialogo(){
    this.cidade = new Cidade();
    this.cidadeDialog = true;
    this.enviado = false;
  }

  fecharDialogo(){
    this.cidadeDialog = false;
    this.enviado = false;
  }

  salvarCidade(){
    this.enviado = true;
    if(this.cidade.nome.trim() && this.cidade.estado){
      if(this.cidade.id){
        this.cidadeService.atualizarCidade(this.cidade.id, this.cidade).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cidade atualizada', life: 2000});
          this.listarCidades();
        },
        error => {
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar atualizar os dados da cidade', life: 2000});
        });
      }else{
        this.cidadeService.criarCidade(this.cidade).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cidade cadastrada', life: 2000});
          this.listarCidades();
        },
        error => {
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar cadastrar a pessoa', life: 2000});
        });
      }
      this.cidadeDialog = false;
    }
  }

  editarCidade(cidade: Cidade){
    this.cidade = {...cidade};
    this.cidadeDialog = true;
  }

  excluirCidade(cidade: Cidade){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir a cidade ' + cidade.nome + '?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(cidade);
      }
    })  
  }

  excluirCidadesSelecionadas(){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir as cidades selecionadas?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.selecionados.forEach(cidade => {
          this.excluir(cidade);
        })
        this.selecionados = [];  
      }
    })
  }

  excluir(cidade: Cidade){
    this.cidadeService.excluirCidade(cidade.id).subscribe( data => {
      console.log(data);
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cidade ' + cidade.nome + ' excluída', life: 2000});
      this.listarCidades();
    },
    error =>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar excluir a cidade ' + cidade.nome, life: 2000});
    });
  }
}