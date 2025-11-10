
# Sistema de Reserva de Laboratórios 

Este é um sistema web (MVP) para cadastro e gerenciamento de horários de aulas em laboratórios de informática, construído com a stack MERN (MongoDB, Express, React, Node.js) e utilizando Docker para o banco de dados.

## ✨ Funcionalidades

* **Gerenciamento (CRUD):** CRUD completo para 7 entidades:
    * Instituições
    * Cursos
    * Professores
    * Disciplinas
    * Laboratórios
    * Blocos de Horário
* **Alocação de Aulas:** Módulo principal para alocar uma disciplina a um professor, laboratório e conjunto de blocos de horário em um dia da semana.
* **Validação de Conflitos:** O backend impede automaticamente a criação de alocações que gerem conflitos de horário (seja para o **Laboratório** ou para o **Professor**).
* **Consulta em Grade:** Uma tela de consulta que exibe todas as aulas em uma grade semanal, com filtros dinâmicos por Curso, Professor ou Laboratório.

## 🛠️ Stack & Arquitetura

Este projeto utiliza uma arquitetura de microsserviços local:

* **Frontend:** [React](https://reactjs.org/) (com [Vite](https://vitejs.dev/))
    * `react-router-dom` para navegação (SPA).
    * `axios` para chamadas de API.
* **Backend:** [Node.js](https://nodejs.org/) (com [Express](https://expressjs.com/))
    * `mongoose` para modelagem de dados (ODM).
    * `cors` para permitir a comunicação com o frontend.
    * `dotenv` para gerenciamento de variáveis de ambiente.
* **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
    * Rodando como um container [Docker](https://www.docker.com/).

## 🚀 Pré-requisitos

Para rodar este projeto, você precisará ter as seguintes ferramentas instaladas:

* **Windows 10/11:**
    * [WSL 2](https://learn.microsoft.com/pt-br/windows/wsl/install) (Subsistema do Windows para Linux) com uma distribuição (ex: **Ubuntu**).
* **Dentro do seu ambiente WSL (Ubuntu):**
    * [Node.js (LTS)](https://github.com/nvm-sh/nvm) (Instalado via `nvm`).
    * [Docker](https://www.docker.com/).
* **No Windows:**
    * Um editor de código (ex: [VS Code](https://code.visualstudio.com/) com a extensão WSL).

## 📦 Arquivos de Configuração

O projeto requer os seguintes arquivos (que estão no `.gitignore` e precisam ser criados manualmente):

### 1. `docker-compose.yml`

Este arquivo deve ser criado na **raiz do projeto (`sistema-labs/`)**. Ele define o serviço do banco de dados MongoDB.

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:latest
    container_name: mongodb_labs_example
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
````

### 2\. `backend/.env`

Este arquivo deve ser criado na **pasta `backend/`**. Ele diz ao Node.js como se conectar ao container do Mongo.

```.env
MONGO_URI=mongodb://root:example@localhost:27017/lab_system?authSource=admin
```

## ▶️ Como Executar (Ambiente de Desenvolvimento)

Siga estes passos utilizando um terminal **WSL (Ubuntu)**:

### 1\. Entre na pasta do projeto

```bash
cd lab-info
cd sistema-labs
```

### 2\. Inicie o Banco de Dados (Docker)

Verifique se o Docker está rodando no Windows. Então, no terminal WSL, rode:

```bash
docker compose up -d
```

### 3\. Execute o Backend (Terminal 1)

  * Abra seu primeiro terminal WSL.
  * Navegue até a pasta do backend, instale as dependências e inicie o servidor.

<!-- end list -->

```bash
cd backend
npm install
node server.js
```

  * *Você deve ver a mensagem que o MongoDB foi conectado com sucesso. Deixe este terminal rodando.*

### 4\. Execute o Frontend (Terminal 2 ou pelo VSCode Local)

  * Abra um **segundo** terminal WSL ou abra a pasta frontend pelo VSCode.
  * Navegue até a pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento do Vite.

<!-- end list -->

```bash
cd frontend
npm install
npm run dev
```

### 5\. Acesse a Aplicação

  * O Vite mostrará uma URL local no terminal. Abra-a no seu navegador (geralmente `http://localhost:5173`).

## 🌐 API Endpoints

A API do backend expõe as seguintes rotas:

| Entidade | Endpoint |
| :--- | :--- |
| Instituições | `GET`, `POST`, `PUT`, `DELETE` /api/instituicoes |
| Cursos | `GET`, `POST`, `PUT`, `DELETE` /api/cursos |
| Professores | `GET`, `POST`, `PUT`, `DELETE` /api/professores |
| Disciplinas | `GET`, `POST`, `PUT`, `DELETE` /api/disciplinas |
| Laboratórios | `GET`, `POST`, `PUT`, `DELETE` /api/laboratorios |
| Blocos de Horário | `GET`, `POST`, `PUT`, `DELETE` /api/blocos |
| Aulas (Alocações) | `GET`, `POST`, `PUT`, `DELETE` /api/aulas |


