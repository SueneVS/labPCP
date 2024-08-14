import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { UsuariosService } from '../../shared/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { NotasService } from '../../shared/services/notas/notas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent, FormsModule, CommonModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent implements OnInit {
  userPerfil!: string;
  historicoNotas: any[] = [];
  searchQuery: string = '';

  constructor(private titleService: Title, private usuariosService: UsuariosService, private notasService: NotasService,  private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Notas');
    this.buscaHistoricoNotas();
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
    }
  }

  get notasFiltradas() {
    const buscar = this.searchQuery.toLowerCase().trim();
    if (buscar) {
      return this.historicoNotas.filter(nota =>
        nota.turma.toLowerCase().includes(buscar) ||
        nota.docente.toLowerCase().includes(buscar) ||
        nota.materia.toLowerCase().includes(buscar) ||
        nota.avaliacao.toLowerCase().includes(buscar)
      );
    } else {
      return this.historicoNotas;
    }
  }

  buscaHistoricoNotas(): void {
    if (this.Aluno()) {
      this.notasService.getNotas().subscribe(
        data => {
          this.historicoNotas = data;
        },
        error => {
          console.error('Erro ao carregar histórico de notas', error);
        }
      );
    } }

  Aluno(): boolean {
    return this.userPerfil === 'Aluno';
  }
}
