# labPCP

## Descrição do Projeto

O **labPCP** é um sistema de gerenciamento educacional desenvolvido com Angular. A aplicação permite o cadastro e gerenciamento de docentes, alunos, turmas e avaliações, e possui diferentes funcionalidades baseadas no perfil do usuário (Administrador, Docente e Aluno).

## Funcionalidades

- **Página de Login**: Formulário de login com campos de email e senha. Inclui botões para "Criar Conta" e "Esqueci Minha Senha" (não implementados).
- **Menu Lateral**: Disponível em todas as páginas (exceto login), com navegação para:
  - Início
  - Cadastro de Docente (apenas Administradores)
  - Cadastro de Aluno (apenas Administradores)
  - Cadastro de Turma (Administradores e Docentes)
  - Cadastro de Avaliação (Administradores e Docentes)
  - Listagem de Docentes (apenas Administradores)
  - Notas  (apenas Alunos)
- **Toolbar**: Exibe o título da página, nome do usuário logado e ícone da foto do usuário. Disponível em todas as páginas (exceto login).
- **Página de Início**:
  - **Para Administradores**: Estatísticas do sistema e listagem de alunos.
  - **Para Docentes**: Estatísticas do sistema e listagem de alunos.
  - **Para Alunos**: Exibição de avaliações recentes, matérias em curso e cursos extras.
- **Cadastro de Docente**: Formulário para cadastro e edição de docentes (acessível apenas para Administradores).
- **Cadastro de Aluno**: Formulário para cadastro e edição de alunos (acessível apenas para Administradores).
- **Cadastro de Turma**: Formulário para cadastro e edição de turmas (acessível para Administradores e Docentes).
- **Cadastro de Avaliação/Nota**: Formulário para cadastro e edição de avaliações (acessível para Administradores e Docentes).
- **Listagem de Docentes**: Listagem e detalhes dos docentes (acessível apenas para Administradores).
- **Notas**: Histórico de avaliações do aluno (acessível apenas para Alunos).

## Tecnologias Utilizadas

- **Angular**: Framework para construção da aplicação.
- **SCSS**: Para estilização avançada e organização de estilos.
- **Bootstrap**: Para design responsivo e componentes de interface prontos.
- **API ViaCEP**: Para cadastro e busca de endereços.
- **sessionStorage/JSON Server**: Para armazenamento de dados locais.
- **GitHub**: Versionamento de código com GitFlow.
- **Trello**: Organização de tarefas.

## Instruções de Execução

Para executar o projeto localmente, siga os seguintes passos:

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/SueneVS/labPCP.git
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd labPCP
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Execute o json-server de desenvolvimento:**

    ```bash
    npm run db
    ```

5. **Execute o servidor de desenvolvimento:**

    ```bash
    npm run start
    ```

6. **Abra o navegador e acesse:**

    [http://localhost:4200](http://localhost:4200)


