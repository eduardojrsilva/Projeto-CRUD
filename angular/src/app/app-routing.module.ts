import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'estados', pathMatch: 'full'},
  {path: 'estados', component: EstadoListComponent},
  {path: 'cidades', component: CidadeListComponent},
  {path: 'pessoas', component: PessoaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
