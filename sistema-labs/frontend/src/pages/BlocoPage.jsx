import { useState, useEffect } from 'react';
import { createCrudService } from '../services/api';

const blocoService = createCrudService('/blocos');

function BlocoPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ turno: '', diaSemana: '', inicio: '', fim: '', ordem: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await blocoService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await blocoService.update(editingId, formData);
      } else {
        await blocoService.create(formData);
      }
      setFormData({ turno: '', diaSemana: '', inicio: '', fim: '', ordem: '' });
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
      await blocoService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ turno: '', diaSemana: '', inicio: '', fim: '', ordem: '' });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Blocos de Horário</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Turno:</label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dia da Semana:</label>
              <select
                value={formData.diaSemana}
                onChange={(e) => setFormData({...formData, diaSemana: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                <option value="Segunda">Segunda</option>
                <option value="Terça">Terça</option>
                <option value="Quarta">Quarta</option>
                <option value="Quinta">Quinta</option>
                <option value="Sexta">Sexta</option>
                <option value="Sábado">Sábado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Início:</label>
              <input
                type="time"
                value={formData.inicio}
                onChange={(e) => setFormData({...formData, inicio: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Fim:</label>
              <input
                type="time"
                value={formData.fim}
                onChange={(e) => setFormData({...formData, fim: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Ordem:</label>
              <input
                type="number"
                value={formData.ordem}
                onChange={(e) => setFormData({...formData, ordem: e.target.value})}
                required
              />
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
                <th>Turno</th>
                <th>Dia</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Ordem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.turno}</td>
                  <td>{item.diaSemana}</td>
                  <td>{item.inicio}</td>
                  <td>{item.fim}</td>
                  <td>{item.ordem}</td>
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

export default BlocoPage;