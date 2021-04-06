import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Cidade } from '../cidade';
import { PessoaService } from '../pessoa.service';
import { CidadeService } from '../cidade.service';
import { ConfirmationService } from 'primeng/api'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PessoaListComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  pessoas!: Pessoa[];
  selecionados!: Pessoa[];
  cidades!: Cidade[];
  pessoaDialog!: boolean;
  enviado!: boolean;

  constructor(private pessoaService: PessoaService, private cidadeService: CidadeService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarPessoas();
    this.listarCidades();
  }

  private listarPessoas(){
    this.pessoaService.listaPessoas().subscribe(data => {
      this.pessoas = data;
    });
  }

  private listarCidades(){
    this.cidadeService.listaCidades().subscribe(data => {
      this.cidades = data;
    })
  }

  abrirDialogo(){
    this.pessoa = new Pessoa();
    this.pessoaDialog = true;
    this.enviado = false;
  }

  fecharDialogo(){
    this.pessoaDialog = false;
    this.enviado = false;
  }

  salvarPessoa(){
    this.enviado = true;
    if(this.pessoa.nome.trim() && this.pessoa.cpf.trim() && this.pessoa.cidade){
      if(this.pessoa.id){
        this.pessoaService.atualizarPessoa(this.pessoa.id, this.pessoa).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa atualizada', life: 2000});
          this.listarPessoas();
        },
        error =>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar atualizar os dados da pessoa', life: 2000});
        });
      }else{
        this.pessoaService.criarPessoa(this.pessoa).subscribe(data =>{
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa cadastrada', life: 2000});
          this.listarPessoas();
        },
        error =>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar cadastrar a pessoa', life: 2000});
        });
      }
      this.pessoaDialog = false;
    }
  }

  editarPessoa(pessoa: Pessoa){
    this.pessoa = {...pessoa};
    this.pessoaDialog = true;
  }

  excluirPessoa(pessoa: Pessoa){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir a pessoa ' + pessoa.nome + '?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(pessoa);
      }
    })  
  }

  excluirPessoasSelecionadas(){
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir as pessoas selecionadas?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.selecionados.forEach(pessoa => {
          this.excluir(pessoa);
        })
        this.selecionados = [];  
      }
    })
  }

  excluir(pessoa: Pessoa){
    this.pessoaService.excluirPessoa(pessoa.id).subscribe( data => {
      console.log(data);
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa ' + pessoa.nome + ' excluída', life: 2000});
      this.listarPessoas();
    },
    error =>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Falha ao tentar excluir a pessoa ' + pessoa.nome, life: 2000});
    })
  }
}
