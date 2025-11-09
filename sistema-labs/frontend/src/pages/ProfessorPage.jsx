import { useState, useEffect } from 'react';
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
    try {
      await professorService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', emailInstitucional: '', telefone: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Professores</h1>
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
              <label>Email Institucional:</label>
              <input
                type="email"
                value={formData.emailInstitucional}
                onChange={(e) => setFormData({...formData, emailInstitucional: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
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
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.nome}</td>
                  <td>{item.emailInstitucional}</td>
                  <td>{item.telefone}</td>
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

export default ProfessorPage;