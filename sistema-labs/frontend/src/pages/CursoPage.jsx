import { useState, useEffect } from 'react';
import { createCrudService } from '../services/api';

const cursoService = createCrudService('/cursos');
const instituicaoService = createCrudService('/instituicoes');

function CursoPage() {
  const [items, setItems] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [formData, setFormData] = useState({ instituicaoId: '', nome: '', turnos: [], status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
    loadInstituicoes();
  }, []);

  const loadItems = async () => {
    try {
      const response = await cursoService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const loadInstituicoes = async () => {
    try {
      const response = await instituicaoService.getAll();
      setInstituicoes(response.data);
    } catch (error) {
      console.error('Error loading instituicoes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await cursoService.update(editingId, formData);
      } else {
        await cursoService.create(formData);
      }
      setFormData({ instituicaoId: '', nome: '', turnos: [], status: true });
      setEditingId(null);
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      instituicaoId: item.instituicaoId?._id || item.instituicaoId,
      nome: item.nome,
      turnos: item.turnos,
      status: item.status
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await cursoService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ instituicaoId: '', nome: '', turnos: [], status: true });
    setEditingId(null);
  };

  const handleTurnoChange = (turno) => {
    const newTurnos = formData.turnos.includes(turno)
      ? formData.turnos.filter(t => t !== turno)
      : [...formData.turnos, turno];
    setFormData({...formData, turnos: newTurnos});
  };

  return (
    <div>
      <h1>Cursos</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Instituição:</label>
              <select
                value={formData.instituicaoId}
                onChange={(e) => setFormData({...formData, instituicaoId: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                {instituicoes.map(inst => (
                  <option key={inst._id} value={inst._id}>{inst.nome}</option>
                ))}
              </select>
            </div>
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
              <label>Turnos:</label>
              <div className="checkbox-group">
                {['Manhã', 'Tarde', 'Noite'].map(turno => (
                  <div key={turno} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.turnos.includes(turno)}
                      onChange={() => handleTurnoChange(turno)}
                    />
                    <label>{turno}</label>
                  </div>
                ))}
              </div>
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
                <th>Instituição</th>
                <th>Nome</th>
                <th>Turnos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.instituicaoId?.nome}</td>
                  <td>{item.nome}</td>
                  <td>{item.turnos?.join(', ')}</td>
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

export default CursoPage;