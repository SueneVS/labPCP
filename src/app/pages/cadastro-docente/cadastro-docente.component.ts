import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar/sidebar.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [SidebarComponent, ToolbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss'
})
export class CadastroDocenteComponent implements OnInit {
  formCadastro!: FormGroup;
  userPerfil!: string;
  materiasDisponiveis = [
    { id: '1', materia: 'HTML' },
    { id: '2', materia: 'CSS' },
    { id: '3', materia: 'Angular' },
    { id: '4', materia: 'React' },
    { id: '5', materia: 'JavaScript' },
    { id: '6', materia: 'TypeScript' }
  ];

  constructor(private titleService: Title, private http: HttpClient) {}

  ngOnInit(): void {
    this.titleService.setTitle('Cadastro do Docente');
    this.formCadastro = new FormGroup({
      nomeCompleto: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      ]),
      rg: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      materias: new FormControl([], Validators.required)
    });

    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.userPerfil = userObj.perfil;
    }
  }

  buscarEndereco(): void {
    const cep = this.formCadastro.get('cep')?.value;
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.formCadastro.patchValue({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch(() => {
          alert('Erro ao buscar o CEP. Tente novamente.');
        });
    } else {
      alert('Digite um CEP válido com 8 dígitos.');
    }
  }

  onSubmit(): void {
    if (this.formCadastro.valid) {
      console.log('Formulário válido:', this.formCadastro.value);
      const url = 'http://localhost:3000/cadastro-docente';
      const formData = this.formCadastro.value;

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
        console.error('Erro ao realizar o cadastro:', error);
        alert('Erro ao realizar o cadastro. Tente novamente.');
      });
    } else {
      this.checkFormErrors();
      alert('Por favor, verifique os dados informados.');
    }
  }

  checkFormErrors(): void {
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
