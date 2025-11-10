import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaTrash, FaTimes, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { createCrudService } from '../services/api';

const laboratorioService = createCrudService('/laboratorios');

function LaboratorioPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ nome: '', capacidade: '', localizacao: '', status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await laboratorioService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await laboratorioService.update(editingId, formData);
      } else {
        await laboratorioService.create(formData);
      }
      setFormData({ nome: '', capacidade: '', localizacao: '', status: true });
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
    if (window.confirm('Tem certeza que deseja excluir este laboratório?')) {
      try {
        await laboratorioService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', capacidade: '', localizacao: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Laboratórios</h1>
        <p className="page-subtitle">Gerencie os laboratórios de informática e suas capacidades</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Laboratório' : 'Novo Laboratório'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome do Laboratório</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Ex: Lab Informática 01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaUsers style={{marginRight: '0.5rem'}} />
                  Capacidade (alunos)
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.capacidade}
                  onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
                  placeholder="30"
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaMapMarkerAlt style={{marginRight: '0.5rem'}} />
                  Localização
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                  placeholder="Ex: Bloco A - Sala 101"
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
                  <label htmlFor="status" className="form-label">Laboratório Ativo</label>
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
            <h2 className="table-title">Lista de Laboratórios</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Capacidade</th>
                  <th>Localização</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td><strong>{item.nome}</strong></td>
                    <td>
                      <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <FaUsers style={{color: 'var(--primary)'}} />
                        {item.capacidade} alunos
                      </span>
                    </td>
                    <td>{item.localizacao || '-'}</td>
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
                      Nenhum laboratório cadastrado
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

export default LaboratorioPage;