import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Notas');
  }
}
