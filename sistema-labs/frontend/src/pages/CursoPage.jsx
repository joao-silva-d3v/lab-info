import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaTrash, FaTimes, FaSun, FaMoon, FaCloudSun } from 'react-icons/fa';
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
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await cursoService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
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

  const getTurnoIcon = (turno) => {
    switch(turno) {
      case 'Manhã': return <FaSun />;
      case 'Tarde': return <FaCloudSun />;
      case 'Noite': return <FaMoon />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cursos</h1>
        <p className="page-subtitle">Gerencie os cursos oferecidos pelas instituições</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Curso' : 'Novo Curso'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Instituição</label>
                <select
                  className="form-input"
                  value={formData.instituicaoId}
                  onChange={(e) => setFormData({...formData, instituicaoId: e.target.value})}
                  required
                >
                  <option value="">Selecione uma instituição</option>
                  {instituicoes.map(inst => (
                    <option key={inst._id} value={inst._id}>{inst.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Nome do Curso</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Ex: Ciência da Computação"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Turnos Disponíveis</label>
                <div className="checkbox-group">
                  {['Manhã', 'Tarde', 'Noite'].map(turno => (
                    <div key={turno} className="checkbox-item">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id={`turno-${turno}`}
                        checked={formData.turnos.includes(turno)}
                        onChange={() => handleTurnoChange(turno)}
                      />
                      <label htmlFor={`turno-${turno}`} className="form-label">
                        {getTurnoIcon(turno)}
                        {turno}
                      </label>
                    </div>
                  ))}
                </div>
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
                  <label htmlFor="status" className="form-label">Curso Ativo</label>
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
            <h2 className="table-title">Lista de Cursos</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
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
                    <td><strong>{item.nome}</strong></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {item.turnos?.map(turno => (
                          <span key={turno} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {getTurnoIcon(turno)}
                            {turno}
                          </span>
                        ))}
                      </div>
                    </td>
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
                      Nenhum curso cadastrado
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

export default CursoPage;