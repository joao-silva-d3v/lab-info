import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaTrash, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';
import { createCrudService } from '../services/api';

const professorService = createCrudService('/professores');

function ProfessorPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ nome: '', emailInstitucional: '', telefone: '', status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await professorService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await professorService.update(editingId, formData);
      } else {
        await professorService.create(formData);
      }
      setFormData({ nome: '', emailInstitucional: '', telefone: '', status: true });
      setEditingId(null);
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        await professorService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', emailInstitucional: '', telefone: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Professores</h1>
        <p className="page-subtitle">Gerencie o cadastro dos professores da instituição</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Professor' : 'Novo Professor'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope style={{marginRight: '0.5rem'}} />
                  Email Institucional
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.emailInstitucional}
                  onChange={(e) => setFormData({...formData, emailInstitucional: e.target.value})}
                  placeholder="professor@instituicao.edu.br"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaPhone style={{marginRight: '0.5rem'}} />
                  Telefone
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div className="form-group">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="status"
                    checked={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.checked})}
                  />
                  <label htmlFor="status" className="form-label">Professor Ativo</label>
                </div>
              </div>
              
              <div className="action-buttons">
                <button type="submit" className="btn btn-primary">
                  <FaSave />
                  {editingId ? 'Atualizar' : 'Criar'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    <FaTimes />
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="table-card">
          <div className="table-header">
            <h2 className="table-title">Lista de Professores</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td><strong>{item.nome}</strong></td>
                    <td>{item.emailInstitucional}</td>
                    <td>{item.telefone || '-'}</td>
                    <td>
                      <span className={`status-badge ${
                        item.status ? 'status-active' : 'status-inactive'
                      }`}>
                        {item.status ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-success btn-sm" 
                          onClick={() => handleEdit(item)}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => handleDelete(item._id)}
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                      Nenhum professor cadastrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorPage;