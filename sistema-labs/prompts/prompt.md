@projeto @backend @frontend

1.) se não existir, crie a pasta sistema-labs 

2.) se não existir, crie a pasta sistema-labs/backend (manualmente) 

3.) dentro da pasta backend, inicie o Node.js com npm init -y e instale as dependências: npm install express mongoose cors dotenv 

4.) volte para a pasta raiz sistema-labs 

5.) execute o comando npm create vite@latest frontend -- --template react (Este comando criará a pasta frontend e instalará o React + Vite) 

6.) entre na pasta frontend (cd frontend) 

7.) instale as dependências do Vite/React: npm install 

8.) instale as dependências do projeto: npm install axios react-router-dom 

9.) configure o backend com node_modules, models, routes, controllers e server.js 

10.) configure o frontend com node_modules, src/pages, src/services e src/App.jsx (Note que o Vite usa .jsx) 

11.) inclua o arquivo .gitignore no backend (para node_modules e .env) 

12.) inclua o arquivo .gitignore no frontend (para node_modules) 

13.) inclua um arquivo .env no backend para a string de conexão do container Docker: MONGO_URI=mongodb://root:example@localhost:27017/lab_system?authSource=admin 

14.) crie um arquivo docker-compose.yml na pasta raiz (sistema-labs) para definir o serviço do container mongo (MongoDB). O serviço deve: * Usar a imagem mongo:latest. * Mapear a porta 27017 (container) para 27017 (host/máquina local). * Definir as variáveis de ambiente MONGO_INITDB_ROOT_USERNAME=root e MONGO_INITDB_ROOT_PASSWORD=example. 

15.) defina os modelos de dados (tabelas) do sistema com os seguintes atributos: * Instituição: nome, sigla, CNPJ (opcional), endereço (opcional), status. * Curso: instituição (referência), nome, turno(s), status. * Professor: nome, e-mail institucional, telefone (opcional), status. * Disciplina: codigo (String, required), curso (referência), nome, carga horária, professor (referência, opcional), status. * Laboratório: nome/identificador, capacidade, localização (opcional), status. * Blocos de horário: turno, dia da semana, início, fim, ordem. * Aulas: semestre, cursoId (referência), disciplinaId (referência), professorId (referência), laboratorioId (referência), diaSemana, blocos (array de referências), dataInicio (opcional), dataFim (opcional). 

16.) crie os seguintes ficheiros no backend com esta lógica de implementação específica: * Na pasta models/: Crie os 8 ficheiros de schema (Instituicao.js, Curso.js, Professor.js, Disciplina.js, Laboratorio.js, Bloco.js, Aula.js). * Na pasta controllers/: * Crie um helper _crudControllerFactory.js. Esta factory deve exportar uma função createCrudController que recebe um Modelo e retorna um objeto com 5 funções: create, getAll, getById, update, delete. A função update deve usar findByIdAndUpdate com as opções { new: true, runValidators: true }. A função create deve tratar erros com catch e retornar status 400. * Crie os controllers instituicaoController.js, professorController.js, laboratorioController.js, blocoController.js usando a _crudControllerFactory. * Importante: Em cursoController.js, sobrescreva o método getAll para usar .populate('instituicaoId'). * Importante: Em disciplinaController.js, sobrescreva o método getAll para usar .populate('cursoId').populate('professorId'). * Importante: Em aulaController.js, implemente a lógica de negócio principal: * O getAll deve popular 5 campos: disciplinaId, professorId, laboratorioId, blocos, cursoId. * O create (POST) deve, antes de salvar, realizar duas buscas Aula.findOne para validação: 1. Conflito de Laboratório: Verifique semestre, laboratorioId, diaSemana, e blocos: { $in: req.body.blocos }. Se encontrar, retorne um status 409 com a mensagem "Conflito de Laboratório...". 2. Conflito de Professor: Verifique semestre, professorId, diaSemana, e blocos: { $in: req.body.blocos }. Se encontrar, retorne um status 409 com a mensagem "Conflito de Professor...". * O delete deve ser um findByIdAndDelete. * Na pasta routes/: Crie as 8 rotas (instituicaoRoutes.js, etc.) que conectam os endpoints HTTP (POST, GET, PUT, DELETE) aos seus respectivos controllers. 

17.) crie os seguintes ficheiros no frontend com esta lógica de implementação específica: * Em src/index.css: Crie estilos CSS globais para um layout profissional, incluindo grid-template-columns: 1fr 2fr para formulários e cores distintas para botões de edit, delete, e cancel. * Em src/index.jsx (ou main.jsx): Remova o <React.StrictMode>. * Em src/App.jsx: Use react-router-dom para configurar todas as 8 rotas, usando NavLink na barra de navegação para estilização ativa. * Na pasta src/services/: * Crie api.js. Dentro dele, crie uma função createCrudService(endpoint) que retorna um objeto com 5 funções (getAll, getById, create, update, delete) que usam axios (ex: create: (data) => api.post(endpoint, data)). Exporte esta função. * Na pasta src/pages/: * Crie as 6 páginas de CRUD (InstituicaoPage.jsx, ProfessorPage.jsx, LaboratorioPage.jsx, BlocoPage.jsx, CursoPage.jsx, DisciplinaPage.jsx). Todas devem usar o createCrudService, useState para formData e useEffect para carregar os dados. * Importante: Em DisciplinaPage.jsx, o formulário deve incluir o campo codigo. A função handleSubmit deve converter cargaHoraria para Number(formData.cargaHoraria) e professorId para null (se formData.professorId for '') antes de enviar. A função handleEdit deve tratar os IDs populados (ex: cursoId: item.cursoId?._id). * Importante: Em AlocacaoPage.jsx: * O useEffect inicial deve carregar dados de 5 serviços: disciplina, professor, laboratorio, bloco, aula. * Deve haver um useEffect que filtra a lista de blocos quando formData.diaSemana ou blocos (a lista total) mudarem. * Deve haver um useEffect que, ao mudar formData.disciplinaId, auto-preencha formData.professorId e formData.cursoId com os dados da disciplina selecionada. * A seleção de blocos deve ser feita por checkbox. * O handleSubmit deve ter um try...catch que, em caso de erro 409, exiba a error.response.data.msg do backend. * Importante: Em ConsultaHorarioPage.jsx: * Deve ter 3 useState para os filtros: filtroLab, filtroProf, filtroCurso. * A grade (tabela) deve ser renderizada baseada em uma lista de blocosUnicos (agrupados por inicio-fim, independentemente do dia). * A lógica de preenchimento da célula (findAulas) deve filtrar as aulas que correspondem ao dia e à bloco.ordem.