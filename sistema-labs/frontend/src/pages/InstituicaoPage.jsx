import { useState, useEffect } from 'react';
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
    try {
      await instituicaoService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', sigla: '', cnpj: '', endereco: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Instituições</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Sigla:</label>
              <input
                type="text"
                value={formData.sigla}
                onChange={(e) => setFormData({...formData, sigla: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>CNPJ:</label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Endereço:</label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.checked})}
                />
                Ativo
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Atualizar' : 'Criar'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </form>
        </div>
        
        <div className="table-container">
          <table>
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
                  <td>{item.sigla}</td>
                  <td>{item.cnpj}</td>
                  <td>{item.status ? 'Ativo' : 'Inativo'}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(item._id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstituicaoPage;