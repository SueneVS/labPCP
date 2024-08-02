import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  userPerfil: string | null = null;
  sidebarOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
    }
    console.log('User Perfil:', this.userPerfil);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
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
