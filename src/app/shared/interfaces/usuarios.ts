export interface UsuariosInterface {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  perfil: 'Administrador' | 'Docente' | 'Aluno';
  img: string;
}
