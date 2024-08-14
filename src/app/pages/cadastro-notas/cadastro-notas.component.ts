import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios/usuarios.service';
import { Aluno, Docente } from '../../shared/interfaces/usuarios';
import { MateriasInterface } from '../../shared/interfaces/materias';
import { TurmasInterface } from '../../shared/interfaces/turmas';
import { TurmasService } from '../../shared/services/turmas/turmas.service';
import { MateriasService } from '../../shared/services/materias/materias.service';

@Component({
  selector: 'app-cadastro-notas',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-notas.component.html',
  styleUrl: './cadastro-notas.component.scss'
})
export class CadastroNotasComponent implements OnInit {
  formCadastro!: FormGroup;
  docentes: Docente[] = [];
  alunos: Aluno[] = [];
  turmas: TurmasInterface[] = [];
  materias: MateriasInterface[] = [];
  userPerfil!: string;
  userDocenteId!: string;
  userDocenteNome!: string;

  constructor(private titleService: Title, private usuarioService: UsuariosService, private turmasService: TurmasService, private materiaService: MateriasService) {
    this.formCadastro = new FormGroup({
      turma: new FormControl('', Validators.required),
      docente: new FormControl('', Validators.required),
      materia: new FormControl('', Validators.required),
      nomeAvaliacao: new FormControl('', [Validators.required]),
      aluno: new FormControl('', Validators.required),
      nota: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
      dataAvaliacao: new FormControl(this.getDataAvaliacao(), Validators.required),
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Cadastro de Notas');
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
        this.selecionarTurma();
        this.selecionarAluno();
        this.selecionarMateria();
      } else if (this.userPerfil === 'Docente') {
        this.selecionarTurma();
        this.selecionarAluno();
        this.selecionarMateria();
      }
    }
  }

  getDataAvaliacao(): string {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  }


  selecionarTurma(): void {
    this.turmasService.getTurmas().subscribe((data: TurmasInterface[]) => {
      this.turmas = data;
    });
  }

  selecionarAluno(): void {
    this.usuarioService.getAluno().subscribe((data: Aluno[]) => {
      this.alunos = data;
    });
  }

  selecionarMateria(): void {
    this.materiaService.getMaterias().subscribe((data: MateriasInterface[]) => {
      this.materias = data;
    });
  }

  selecionarDocentes(): void {
    this.usuarioService.getDocentes().subscribe((data: Docente[]) => {
      this.docentes = data;
    });
  }

  onSubmit(): void {
    if (this.formCadastro.valid) {
      const url = 'http://localhost:3000/cadastro-notas';

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
