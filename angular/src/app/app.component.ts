import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itens!: MenuItem[];
  activeItens!: MenuItem;

  ngOnInit(){
    this.itens = [
      {label: 'Estados', routerLink: 'estados'},
      {label: 'Cidades', routerLink: 'cidades'},
      {label: 'Pessoas', routerLink: 'pessoas'}
    ];
    this.activeItens = this.itens[0];
  }
}
