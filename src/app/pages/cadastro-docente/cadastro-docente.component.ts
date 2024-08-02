import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss'
})
export class CadastroDocenteComponent {

}
