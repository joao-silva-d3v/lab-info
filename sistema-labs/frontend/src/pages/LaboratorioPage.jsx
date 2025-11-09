import { useState, useEffect } from 'react';
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
    try {
      await laboratorioService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', capacidade: '', localizacao: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Laboratórios</h1>
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
              <label>Capacidade:</label>
              <input
                type="number"
                value={formData.capacidade}
                onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Localização:</label>
              <input
                type="text"
                value={formData.localizacao}
                onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
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
                <th>Capacidade</th>
                <th>Localização</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.nome}</td>
                  <td>{item.capacidade}</td>
                  <td>{item.localizacao}</td>
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

export default LaboratorioPage;