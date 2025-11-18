<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 200px 0 20px 0;">

<div style="font-size: 24px; margin-bottom: 12px;"><strong>Amazon Q</strong></div>
<div style="background: rgba(128, 128, 128, 0.15); border: 1px solid rgba(128, 128, 128, 0.25); border-radius: 8px; padding: 8px; margin: 4px 0; text-align: center;">
<div style="font-size: 14px; margin-bottom: 4px;"><strong>Did you know?</strong></div>
<div>Ask Q to review your code and see results in the code issues panel!</div>
</div>

Select code & ask me to explain, debug or optimize it, or type `/` for quick actions

</div>

---

 **@prompt-visual.md**

---


Vou implementar o novo design system conforme especificado. Primeiro, vou verificar a estrutura atual do projeto e depois implementar todas as mudanças necessárias.

---


Agora vou implementar o novo design system. Começarei instalando os ícones e depois implementando todos os arquivos necessários.

---

Instalando a biblioteca react-icons conforme especificado no prompt

---

shell

---


Agora vou implementar o arquivo CSS com todas as variáveis e classes utilitárias:

---

Implementando o novo design system com variáveis CSS e classes utilitárias

---


Agora vou implementar o layout principal com sidebar no App.jsx:

---

Implementando o layout principal com sidebar fixa e navegação com ícones

---


Agora vou atualizar todas as páginas seguindo a estrutura base do design. Começarei com a InstituicaoPage:

---

Atualizando InstituicaoPage com o novo design system

---

Atualizando CursoPage com o novo design system

---

Atualizando DisciplinaPage com o novo design system

---

Atualizando ProfessorPage com o novo design system

---

Atualizando LaboratorioPage com o novo design system

---

Atualizando BlocoPage com o novo design system

---

Atualizando AlocacaoPage com o novo design system

---

Atualizando ConsultaHorarioPage com o novo design system

---


Agora vou verificar se é necessário instalar o react-router-dom:

---


Perfeito! O react-router-dom já está instalado. Agora vou adicionar algumas melhorias no CSS para o botão secundário que foi usado no código:

---

Adicionando estilo para o botão secundário que foi usado nas páginas

---


Agora vou testar se o projeto está funcionando corretamente:

---

## ✨ Melhorias Implementadas

### 1. **Design System Moderno**
- **Cores**: Gradientes modernos com paleta azul/roxo
- **Tipografia**: Inter font para melhor legibilidade
- **Sombras**: Sistema de sombras em camadas
- **Bordas**: Cantos arredondados consistentes

### 2. **Layout Sidebar**
- Navegação lateral fixa com ícones
- Melhor organização visual
- Hover effects e animações suaves

### 3. **Componentes Atualizados**
- **Cards**: Design elevado com sombras
- **Formulários**: Inputs modernos com focus states
- **Tabelas**: Headers estilizados e hover effects
- **Botões**: Gradientes e ícones integrados

## 🛠️ Aplicação nas Outras Páginas

### Estrutura Base:
```jsx
import { useState, useEffect } from 'react';
import { FaIcon1, FaIcon2 } from 'react-icons/fa';
import { createCrudService } from '../services/api';

function ExemploPage() {
  return (
    <div>
      {/* Header da Página */}
      <div className="page-header">
        <h1 className="page-title">Título da Página</h1>
        <p className="page-subtitle">Descrição da funcionalidade</p>
      </div>
      
      {/* Layout em Grid */}
      <div className="content-grid">
        {/* Card do Formulário */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <FaIcon style={{marginRight: '0.5rem'}} />
              Título do Card
            </h2>
          </div>
          <div className="card-body">
            {/* Conteúdo do formulário */}
          </div>
        </div>
        
        {/* Card da Tabela */}
        <div className="table-card">
          <div className="table-header">
            <h2 className="table-title">Lista de Items</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              {/* Conteúdo da tabela */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Classes CSS Principais:

#### **Layout**
- `.page-header` - Cabeçalho da página
- `.page-title` - Título principal
- `.page-subtitle` - Subtítulo descritivo
- `.content-grid` - Grid 2 colunas (formulário + tabela)

#### **Cards**
- `.card` - Card básico
- `.card-header` - Cabeçalho do card
- `.card-title` - Título do card
- `.card-body` - Conteúdo do card
- `.table-card` - Card específico para tabelas

#### **Formulários**
- `.form-group` - Grupo de campo
- `.form-label` - Label estilizado
- `.form-input` - Input moderno
- `.form-checkbox` - Checkbox container
- `.checkbox` - Checkbox estilizado
- `.checkbox-group` - Grid de checkboxes
- `.checkbox-item` - Item individual

#### **Botões**
- `.btn` - Botão base
- `.btn-primary` - Botão principal (gradiente azul)
- `.btn-success` - Botão sucesso (gradiente verde)
- `.btn-danger` - Botão perigo (gradiente vermelho)
- `.btn-secondary` - Botão secundário (cinza)
- `.btn-sm` - Botão pequeno
- `.action-buttons` - Container de botões

#### **Tabelas**
- `.table` - Tabela moderna
- `.table-wrapper` - Container com scroll
- `.table-header` - Cabeçalho da tabela
- `.table-title` - Título da tabela

#### **Status e Badges**
- `.status-badge` - Badge base
- `.status-active` - Status ativo (verde)
- `.status-inactive` - Status inativo (vermelho)

## 🎯 Páginas atualizadas

✅ **App.jsx** - Layout sidebar com ícones e navegação moderna
✅ **InstituicaoPage.jsx** - Template base com cards e formulários
✅ **CursoPage.jsx** - Com ícones de turno e checkboxes estilizados
✅ **ConsultaHorarioPage.jsx** - Grade moderna com filtros dinâmicos
✅ **AlocacaoPage.jsx** - Formulário complexo com validações visuais
✅ **ProfessorPage.jsx** - Cadastro com ícones de contato
✅ **DisciplinaPage.jsx** - Gestão de disciplinas e carga horária
✅ **LaboratorioPage.jsx** - Capacidade e localização com ícones
✅ **BlocoPage.jsx** - Horários com ícones de turno e ordenação visual


## 🎨 Variáveis CSS Disponíveis

```css
/* Cores */
--primary: #667eea;
--secondary: #764ba2;
--success: #48bb78;
--danger: #f56565;
--warning: #ed8936;

/* Sombras */
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Bordas */
--border-radius: 12px;
--border-radius-sm: 8px;

/* Transições */
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## 💡 Dicas

1. **Ícones**: Use react-icons/fa para consistência
2. **Confirmações**: Use window.confirm() para exclusões
3. **Feedback**: Adicione alerts para sucesso/erro
4. **Estados vazios**: Sempre mostre mensagem quando não há dados
5. **Responsividade**: O design já é responsivo por padrão