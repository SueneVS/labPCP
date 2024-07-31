import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  login = {
    email: '',
    senha: ''
  };

  constructor(private loginService: LoginService, private router: Router) {}

  entrar() {
    if (this.login.email && this.login.senha) {
      this.loginService.login(this.login).subscribe(user => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify({
            id: user.id,
            nome: user.nome,
            perfil: user.perfil
          }));

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 500);
        } else {
          this.mensagemErro();
        }
      });
    } else {
      window.alert('Por favor, preencha os campos');
    }
  }

  cadastrar() {
    this.emConstrucao();
  }

  emConstrucao() {
    const modalElement = document.getElementById('underConstructionModal');
    if (modalElement) {
      const bootstrapModal = (window as any).bootstrap.Modal;
      if (bootstrapModal) {
        const modal = new bootstrapModal(modalElement);
        modal.show();
      } else {
        console.error('Bootstrap Modal não encontrado. Verifique se o Bootstrap está carregado.');
      }
    } else {
      console.error('Modal não encontrado. Verifique o ID do modal.');
    }
  }

  mensagemErro() {
    const errorPopup = document.getElementById('error-popup');
    if (errorPopup) {
      errorPopup.style.display = 'block';
      setTimeout(() => {
        errorPopup.style.display = 'none';
      }, 3000);
    }
  }
}
