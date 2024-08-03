import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss'
})
export class ListagemDocentesComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Listagem dos Docentes');
  }

}
