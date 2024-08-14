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
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Início' }
  },
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent,
    data: { title: 'Cadastro de Docente' }
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
    data: { title: 'Cadastro de Aluno' }
  },
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent,
    data: { title: 'Cadastro de Turma' }
  },
  {
    path: 'cadastro-notas',
    component: CadastroNotasComponent,
    data: { title: 'Cadastro de Notas' }
  },
  {
    path: 'listagem-docentes',
    component: ListagemDocentesComponent,
    data: { title: 'Lista de Docentes' }
  },
  {
    path: 'notas',
    component: NotasComponent,
    data: { title: 'Notas' }
  },
  {
    path: '**',
    component: LoginComponent,
    data: { title: 'Login' }
  },
];
