import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  tituloDaPagina: string = '';
  nomeUsuario: string | null = '';
  perfilUsuario: string | null = '';
  imgUsuario: string | null = '';



  constructor(private titleService: Title, private usuariosService: UsuariosService) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      const userId = usuario.id;
      this.nomeUsuario = usuario.nome;
      this.perfilUsuario = usuario.perfil;

      this.usuariosService.getUsuario(userId).subscribe(userData => {
        this.imgUsuario = userData.img;
      });
    }
    this.tituloDaPagina = this.titleService.getTitle();
  }

}
