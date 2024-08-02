import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss'
})
export class ListagemDocentesComponent {

}
