import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../shared/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent, CommonModule, FormsModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss'
})
export class ListagemDocentesComponent implements OnInit {
  userPerfil!: string;
  docentes: any[] = [];
  searchQuery: string = '';
  filterDocentes: any[] = [];

  constructor(private titleService: Title, private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Listagem dos Docentes');
    this.buscaDocentes();
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
    }
  }

  get docentesFiltrados() {
    const buscar = this.searchQuery.toLowerCase().trim();
    if (buscar) {
      return this.docentes.filter(docente =>
        docente.nome.toLowerCase().includes(buscar) ||
        docente.id.toString().includes(buscar)
      );
    } else {
      return this.docentes;
    }


  }

  buscaDocentes(): void {
    this.usuariosService.getDocentes().subscribe(
      data => {
        this.docentes = data;
      },
      error => {
        console.error('Erro ao carregar docentes', error);
      }
    );
  }

  verMais(docenteId: string): void {
    this.router.navigate(['/cadastro-docente']);
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
