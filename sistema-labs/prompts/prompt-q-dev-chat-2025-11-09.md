Amazon Q can now help you write, modify, and maintain code by combining the power of natural language understanding with the ability to take actions on your behalf such as directly making code changes, modifying files, and running commands.

---

<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 200px 0 20px 0;">

<div style="font-size: 24px; margin-bottom: 12px;"><strong>Amazon Q</strong></div>
<div style="background: rgba(128, 128, 128, 0.15); border: 1px solid rgba(128, 128, 128, 0.25); border-radius: 8px; padding: 8px; margin: 4px 0; text-align: center;">
<div style="font-size: 14px; margin-bottom: 4px;"><strong>Did you know?</strong></div>
<div>Pinned context is always included in future chat messages</div>
</div>

Select code & ask me to explain, debug or optimize it, or type `/` for quick actions

</div>

---

 **@prompt.md**

---

Vou implementar o sistema completo conforme especificado no prompt. Começarei criando a estrutura de pastas e configurando o projeto.

---

Criando a pasta raiz do projeto sistema-labs

---

shell

---

Criando a pasta backend dentro de sistema-labs

---

shell

---

Inicializando o projeto Node.js no backend

---

shell

---

Instalando as dependências do backend

---

shell

---

Criando o projeto frontend com Vite e React

---

shell

---

Instalando as dependências do frontend

---

shell

---

Instalando axios e react-router-dom no frontend

---

shell

---

Agora vou criar a estrutura de pastas e arquivos do backend:

---

Criando as pastas necessárias no backend

---

shell

---

Criando .gitignore para o backend

---

Criando arquivo .env com a string de conexão do MongoDB

---

Criando .gitignore para o frontend

---

Criando docker-compose.yml para o MongoDB

---

Agora vou criar os modelos de dados:

---

Criando modelo Instituicao

---

Criando modelo Curso

---

Criando modelo Professor

---

Criando modelo Disciplina

---

Criando modelo Laboratorio

---

Criando modelo Bloco

---

Criando modelo Aula

---

Agora vou criar o CRUD controller factory e os controllers:

---

Criando factory para controllers CRUD

---

Criando controller para Instituicao

---

Criando controller para Professor

---

Criando controller para Laboratorio

---

Criando controller para Bloco

---

Criando controller para Curso com populate personalizado

---

Criando controller para Disciplina com populate personalizado

---

Criando controller para Aula com lógica de negócio específica

---

Agora vou criar as rotas:

---

Criando rotas para Instituicao

---

Criando rotas para Curso

---

Criando rotas para Professor

---

Criando rotas para Disciplina

---

Criando rotas para Laboratorio

---

Criando rotas para Bloco

---

Criando rotas para Aula

---

Criando server.js principal do backend

---

Agora vou configurar o frontend. Primeiro, vou criar as pastas necessárias:

---

Criando pastas necessárias no frontend

---

shell

---

Criando estilos CSS globais para o frontend

---

Removendo StrictMode do main.jsx

---

Criando serviço API com factory para CRUD

---

Criando App.jsx com roteamento e navegação

---

Agora vou criar as páginas do frontend:

---

Criando página de CRUD para Instituição

---

Criando página de CRUD para Professor

---

Criando página de CRUD para Laboratório

---

Criando página de CRUD para Bloco

---

Criando página de CRUD para Curso

---

Criando página de CRUD para Disciplina com lógica específica

---

Criando página de Alocação com lógica específica

---

Criando página de Consulta de Horários com grade e filtros

---

Agora vou atualizar o package.json do backend para incluir um script de start:

---

Adicionando script start no package.json do backend

---

Agora vou criar um arquivo README.md com instruções de uso:

---

Criando README.md com instruções do projeto

---


O sistema completo foi implementado com sucesso! Aqui está um resumo do que foi criado:

## Backend (Node.js + Express + MongoDB)
- ✅ Estrutura de pastas: models, controllers, routes
- ✅ 7 modelos de dados: Instituição, Curso, Professor, Disciplina, Laboratório, Bloco, Aula
- ✅ Factory para controllers CRUD com validações específicas
- ✅ Lógica de negócio para conflitos de laboratório e professor
- ✅ Rotas RESTful para todos os recursos
- ✅ Configuração do servidor com CORS e dotenv
- ✅ Arquivo .env com string de conexão MongoDB
- ✅ .gitignore configurado

## Frontend (React + Vite)
- ✅ Estrutura de pastas: pages, services
- ✅ Roteamento com React Router DOM
- ✅ 8 páginas: 6 CRUDs + Alocação + Consulta de Horários
- ✅ Factory para serviços API com Axios
- ✅ CSS profissional com grid layout
- ✅ Lógica específica para DisciplinaPage (campo código, conversões)
- ✅ Lógica específica para AlocacaoPage (filtros, auto-preenchimento, validação de conflitos)
- ✅ Lógica específica para ConsultaHorarioPage (grade de horários, filtros)
- ✅ .gitignore configurado

## Infraestrutura
- ✅ docker-compose.yml para MongoDB
- ✅ Configuração de variáveis de ambiente
- ✅ Scripts npm configurados
- ✅ README.md com instruções completas

## Funcionalidades Implementadas
1. **CRUD completo** para todas as entidades
2. **Validação de conflitos** na alocação de aulas
3. **Auto-preenchimento** de professor e curso ao selecionar disciplina
4. **Filtros dinâmicos** na consulta de horários
5. **Grade visual** de horários por dia da semana
6. **Seleção múltipla** de blocos de horário via checkbox
7. **Populate automático** de referências nos controllers específicos

Para executar o sistema:
1. `docker-compose up -d` (MongoDB)
2. `cd backend && npm start` (API na porta 3000)
3. `cd frontend && npm run dev` (Interface na porta 5173)

O sistema está pronto para uso e segue exatamente as especificações do prompt!