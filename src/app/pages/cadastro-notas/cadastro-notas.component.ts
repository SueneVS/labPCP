import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-notas',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-notas.component.html',
  styleUrl: './cadastro-notas.component.scss'
})
export class CadastroNotasComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Cadastro de notas');
  }
}
