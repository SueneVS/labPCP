import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss'
})
export class CadastroDocenteComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Cadastro do Docente');
  }
}
