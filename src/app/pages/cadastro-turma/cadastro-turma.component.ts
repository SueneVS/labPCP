import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-turma.component.html',
  styleUrl: './cadastro-turma.component.scss'
})
export class CadastroTurmaComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Cadastro de Turmas');
  }
}
