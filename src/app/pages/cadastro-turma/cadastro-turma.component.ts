import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios/usuarios.service';
import { CommonModule } from '@angular/common';
import { Docente } from '../../shared/interfaces/usuarios';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-turma.component.html',
  styleUrl: './cadastro-turma.component.scss'
})
export class CadastroTurmaComponent implements OnInit {
  formCadastro!: FormGroup;
  docentes: Docente[] = [];
  userPerfil!: string;
  userDocenteId!: string;
  userDocenteNome: string = '';

  constructor(private titleService: Title, private usuarioService: UsuariosService) {
    this.formCadastro = new FormGroup({
      nomeTurma: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      dataInicio: new FormControl(this.getDataInicio(), Validators.required),
      dataTermino: new FormControl('', Validators.required),
      horarioTurma: new FormControl(this.getHora(), Validators.required),
      docente: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Cadastro de Turmas');
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
      this.userDocenteId = userObj.id;

      this.usuarioService.getDocentes().subscribe((data: Docente[]) => {
        this.docentes = data;

        if (this.userPerfil === 'Docente' && this.userDocenteId) {
          const docente = this.docentes.find(d => d.id === this.userDocenteId);
          if (docente) {
            this.userDocenteNome = docente.nome;
            this.formCadastro.patchValue({
              docente: this.userDocenteNome
            });
            this.formCadastro.controls['docente'].disable();
          }
        }
      });

      if (this.userPerfil === 'Administrador') {
        this.selecionarDocentes();
      }
    }
  }

  getDataInicio(): string {
    const DataInicio = new Date();
    return DataInicio.toISOString().split('T')[0];
  }

  getHora(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  selecionarDocentes(): void {
    this.usuarioService.getDocentes().subscribe((data: Docente[]) => {
      this.docentes = data;
    });
  }

  onSubmit(): void {
    if (this.formCadastro.valid) {
      const url = 'http://localhost:3000/turmas';

      const user = sessionStorage.getItem('user');
      let userObj: any = null;

      if (user) {
        userObj = JSON.parse(user);


        if (userObj.perfil === 'Docente') {
          this.formCadastro.patchValue({
            docente: userObj.nome
          });
        }
      }

      const formData = {
        ...this.formCadastro.value,
        docente: this.formCadastro.get('docente')?.value || userObj?.nome || ''
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Erro na resposta do servidor.');
          });
        }
        return response.json();
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
      })
      .catch(error => {
        alert('Erro ao realizar o cadastro. Tente novamente.');
      });
    } else {
      this.validacaoDados();
      alert('Por favor, verifique os dados informados.');
    }
  }
  validacaoDados(): void {
    Object.keys(this.formCadastro.controls).forEach(field => {
      const control = this.formCadastro.get(field);
      if (control?.invalid) {
        console.log(`${field} é inválido`);
        console.log(control.errors);
      }
    });
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
