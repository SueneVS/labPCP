import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroDocenteComponent } from './pages/cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { CadastroNotasComponent } from './pages/cadastro-notas/cadastro-notas.component';
import { ListagemDocentesComponent } from './pages/listagem-docentes/listagem-docentes.component';
import { NotasComponent } from './pages/notas/notas.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent },
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent },
  {
    path: 'cadastro-notas',
    component: CadastroNotasComponent },
  {
    path: 'listagem-docentes',
    component: ListagemDocentesComponent },
  {
    path: 'notas',
    component: NotasComponent },
  {
    path: '**',
    component: LoginComponent
  },
];
