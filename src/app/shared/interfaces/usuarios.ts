export interface UsuariosInterface {
  id: number;
  nome: string;
  email: string;
  senha: string;
  celular: number;
  idade: number;
  perfil: 'Administrador' | 'Docente' | 'Aluno';
  img: string;
}
