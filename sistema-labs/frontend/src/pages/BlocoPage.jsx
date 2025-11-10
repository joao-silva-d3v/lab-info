import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaTrash, FaTimes, FaSun, FaMoon, FaCloudSun, FaSortNumericDown } from 'react-icons/fa';
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
    if (window.confirm('Tem certeza que deseja excluir este bloco de horário?')) {
      try {
        await blocoService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ turno: '', diaSemana: '', inicio: '', fim: '', ordem: '' });
    setEditingId(null);
  };

  const getTurnoIcon = (turno) => {
    switch(turno) {
      case 'Manhã': return <FaSun style={{color: '#f6ad55'}} />;
      case 'Tarde': return <FaCloudSun style={{color: '#ed8936'}} />;
      case 'Noite': return <FaMoon style={{color: '#4299e1'}} />;
      default: return null;
    }
  };

  const diasSemana = [
    { value: 'Segunda', label: 'Segunda-feira' },
    { value: 'Terça', label: 'Terça-feira' },
    { value: 'Quarta', label: 'Quarta-feira' },
    { value: 'Quinta', label: 'Quinta-feira' },
    { value: 'Sexta', label: 'Sexta-feira' },
    { value: 'Sábado', label: 'Sábado' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Blocos de Horário</h1>
        <p className="page-subtitle">Configure os horários das aulas por turno e dia da semana</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Bloco' : 'Novo Bloco de Horário'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Turno</label>
                <select
                  className="form-input"
                  value={formData.turno}
                  onChange={(e) => setFormData({...formData, turno: e.target.value})}
                  required
                >
                  <option value="">Selecione o turno</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Dia da Semana</label>
                <select
                  className="form-input"
                  value={formData.diaSemana}
                  onChange={(e) => setFormData({...formData, diaSemana: e.target.value})}
                  required
                >
                  <option value="">Selecione o dia</option>
                  {diasSemana.map(dia => (
                    <option key={dia.value} value={dia.value}>{dia.label}</option>
                  ))}
                </select>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div className="form-group">
                  <label className="form-label">Horário de Início</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.inicio}
                    onChange={(e) => setFormData({...formData, inicio: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Horário de Fim</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.fim}
                    onChange={(e) => setFormData({...formData, fim: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaSortNumericDown style={{marginRight: '0.5rem'}} />
                  Ordem de Exibição
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.ordem}
                  onChange={(e) => setFormData({...formData, ordem: e.target.value})}
                  placeholder="1, 2, 3..."
                  min="1"
                  required
                />
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
            <h2 className="table-title">Lista de Blocos de Horário</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Turno</th>
                  <th>Dia</th>
                  <th>Horário</th>
                  <th>Ordem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>
                      <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        {getTurnoIcon(item.turno)}
                        {item.turno}
                      </span>
                    </td>
                    <td>{item.diaSemana}</td>
                    <td>
                      <span style={{
                        background: 'var(--gray-100)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontWeight: '600',
                        color: 'var(--primary)'
                      }}>
                        {item.inicio} - {item.fim}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '50%',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        minWidth: '1.5rem',
                        textAlign: 'center',
                        display: 'inline-block'
                      }}>
                        {item.ordem}
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
                      Nenhum bloco de horário cadastrado
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

export default BlocoPage;