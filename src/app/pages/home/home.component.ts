import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { UsuariosService } from '../../shared/services/usuarios/usuarios.service';
import { TurmasService } from '../../shared/services/turmas/turmas.service';
import { UsuariosInterface } from '../../shared/interfaces/usuarios';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  totalAlunos: number = 0;
  totalTurmas: number = 0;
  totalDocentes: number = 0;
  alunos: UsuariosInterface[] = [];
  filterAlunos: UsuariosInterface[] = [];
  buscarPorAluno: string = '';
  userPerfil: string | null = null;

  constructor(private titleService: Title, private usuariosService: UsuariosService, private turmasService: TurmasService) {}

  ngOnInit(): void {

    this.titleService.setTitle('Início');

    this.usuariosService.getTotalUsuariosByPerfil('Aluno').subscribe(count => this.totalAlunos = count);
    this.usuariosService.getTotalUsuariosByPerfil('Docente').subscribe(count => this.totalDocentes = count);
    this.turmasService.getTotalTurmas().subscribe(count => this.totalTurmas = count);

    this.usuariosService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
      this.filterAlunos = alunos;
    });


    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
    }
    console.log('User Perfil:', this.userPerfil);
  }

  buscarAluno() {
    const buscar = this.buscarPorAluno.toLowerCase().trim();
    if (buscar) {
      this.filterAlunos = this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(buscar) ||
        aluno.celular.toString().includes(buscar) ||
        aluno.email.toLowerCase().includes(buscar)
      );
    } else {
      this.filterAlunos = this.alunos;
    }
  }
  verTodosAlunos() {
    this.filterAlunos = this.alunos;
    this.buscarPorAluno = ''; 
  }

  Admin(): boolean {
    return this.userPerfil === 'Administrador';
  }

  Docente(): boolean {
    return this.userPerfil === 'Docente';
  }

  Aluno(): boolean {
    return this.userPerfil === 'Aluno';
  }
}

