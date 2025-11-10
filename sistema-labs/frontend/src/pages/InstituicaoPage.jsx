import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { createCrudService } from '../services/api';

const instituicaoService = createCrudService('/instituicoes');

function InstituicaoPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ nome: '', sigla: '', cnpj: '', endereco: '', status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await instituicaoService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await instituicaoService.update(editingId, formData);
      } else {
        await instituicaoService.create(formData);
      }
      setFormData({ nome: '', sigla: '', cnpj: '', endereco: '', status: true });
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
    if (window.confirm('Tem certeza que deseja excluir esta instituição?')) {
      try {
        await instituicaoService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', sigla: '', cnpj: '', endereco: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Instituições</h1>
        <p className="page-subtitle">Gerencie as instituições de ensino do sistema</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Instituição' : 'Nova Instituição'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome da Instituição</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Digite o nome da instituição"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Sigla</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.sigla}
                  onChange={(e) => setFormData({...formData, sigla: e.target.value})}
                  placeholder="Ex: UFSC, IFSC"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">CNPJ</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Endereço</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  placeholder="Endereço completo"
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
                  <label htmlFor="status" className="form-label">Instituição Ativa</label>
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
            <h2 className="table-title">Lista de Instituições</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sigla</th>
                  <th>CNPJ</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>{item.nome}</td>
                    <td><strong>{item.sigla}</strong></td>
                    <td>{item.cnpj || '-'}</td>
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
                      Nenhuma instituição cadastrada
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

export default InstituicaoPage;