@projeto @frontend

1.) crie os seguintes ficheiros no *frontend* implementando o *Novo Design System*:
    * Execute o comando para instalar os ícones: npm install react-icons.
    * Em src/index.css: Implemente as Variáveis CSS (--primary: #667eea, --secondary: #764ba2, --shadow, --border-radius) e as classes utilitárias do design:
        * Layout: .page-header (cabeçalho), .page-title (Inter font), .page-subtitle, .content-grid (Grid 2 colunas).
        * Cards: .card (sombra elevada), .card-header (com suporte a ícones), .card-title, .card-body, .table-card.
        * Formulários: .form-group, .form-label, .form-input (com estados de focus modernos), .form-checkbox, .checkbox-group.
        * Botões: .btn (base), .btn-primary (gradiente azul), .btn-success (gradiente verde), .btn-danger (gradiente vermelho), .btn-sm.
        * Tabelas: .table (header estilizado, hover effects), .table-wrapper (scroll), .table-header.
        * Status: .status-badge, .status-active (verde), .status-inactive (vermelho).
    * Em src/App.jsx: Implemente o Layout Sidebar fixo à esquerda contendo navegação com ícones (react-icons/fa) e uma área de conteúdo principal à direita onde as rotas são renderizadas.
    * Na pasta src/pages/:
        * Atualize/Crie todas as páginas (InstituicaoPage.jsx, CursoPage.jsx, etc.) seguindo a Estrutura Base do design:
            * Header: Use <div className="page-header"> com título e subtítulo descritivo.
            * Layout: Use <div className="content-grid"> para separar visualmente o formulário (card esquerdo/topo) da tabela (card direito/baixo).
            * Formulários: Envolva em <div className="card">. O <div className="card-header"> deve conter um ícone FaIcon alinhado ao título.
            * Tabelas: Envolva em <div className="table-card">.
            * Inputs: Aplique a classe .form-input em todos os campos de texto/número e .form-group nos containers.
            * Ações: Utilize .action-buttons na tabela com botões contendo ícones (ex: FaEdit, FaTrash).