import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss'
})
export class CadastroAlunoComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Cadastro do Aluno');
  }
}
