import { useState, useEffect } from 'react';
import { FaSave, FaEdit, FaTrash, FaTimes, FaClock, FaHashtag } from 'react-icons/fa';
import { createCrudService } from '../services/api';

const disciplinaService = createCrudService('/disciplinas');
const cursoService = createCrudService('/cursos');
const professorService = createCrudService('/professores');

function DisciplinaPage() {
  const [items, setItems] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [formData, setFormData] = useState({ codigo: '', cursoId: '', nome: '', cargaHoraria: '', professorId: '', status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
    loadCursos();
    loadProfessores();
  }, []);

  const loadItems = async () => {
    try {
      const response = await disciplinaService.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const loadCursos = async () => {
    try {
      const response = await cursoService.getAll();
      setCursos(response.data);
    } catch (error) {
      console.error('Error loading cursos:', error);
    }
  };

  const loadProfessores = async () => {
    try {
      const response = await professorService.getAll();
      setProfessores(response.data);
    } catch (error) {
      console.error('Error loading professores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        cargaHoraria: Number(formData.cargaHoraria),
        professorId: formData.professorId === '' ? null : formData.professorId
      };
      
      if (editingId) {
        await disciplinaService.update(editingId, submitData);
      } else {
        await disciplinaService.create(submitData);
      }
      setFormData({ codigo: '', cursoId: '', nome: '', cargaHoraria: '', professorId: '', status: true });
      setEditingId(null);
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      codigo: item.codigo,
      cursoId: item.cursoId?._id || item.cursoId,
      nome: item.nome,
      cargaHoraria: item.cargaHoraria,
      professorId: item.professorId?._id || item.professorId || '',
      status: item.status
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
      try {
        await disciplinaService.delete(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ codigo: '', cursoId: '', nome: '', cargaHoraria: '', professorId: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Disciplinas</h1>
        <p className="page-subtitle">Gerencie as disciplinas dos cursos e suas cargas horárias</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {editingId ? 'Editar Disciplina' : 'Nova Disciplina'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <FaHashtag style={{marginRight: '0.5rem'}} />
                  Código da Disciplina
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.codigo}
                  onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                  placeholder="Ex: INF001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Curso</label>
                <select
                  className="form-input"
                  value={formData.cursoId}
                  onChange={(e) => setFormData({...formData, cursoId: e.target.value})}
                  required
                >
                  <option value="">Selecione um curso</option>
                  {cursos.map(curso => (
                    <option key={curso._id} value={curso._id}>{curso.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Nome da Disciplina</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Ex: Programação I"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaClock style={{marginRight: '0.5rem'}} />
                  Carga Horária (horas)
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.cargaHoraria}
                  onChange={(e) => setFormData({...formData, cargaHoraria: e.target.value})}
                  placeholder="60"
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Professor Responsável</label>
                <select
                  className="form-input"
                  value={formData.professorId}
                  onChange={(e) => setFormData({...formData, professorId: e.target.value})}
                >
                  <option value="">Selecione um professor (opcional)</option>
                  {professores.map(prof => (
                    <option key={prof._id} value={prof._id}>{prof.nome}</option>
                  ))}
                </select>
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
                  <label htmlFor="status" className="form-label">Disciplina Ativa</label>
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
            <h2 className="table-title">Lista de Disciplinas</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Curso</th>
                  <th>Nome</th>
                  <th>Carga Horária</th>
                  <th>Professor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td><strong>{item.codigo}</strong></td>
                    <td>{item.cursoId?.nome}</td>
                    <td>{item.nome}</td>
                    <td>{item.cargaHoraria}h</td>
                    <td>{item.professorId?.nome || <em style={{color: 'var(--gray-500)'}}>Não atribuído</em>}</td>
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
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                      Nenhuma disciplina cadastrada
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

export default DisciplinaPage;