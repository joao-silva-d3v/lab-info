import { useState, useEffect } from 'react';
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
    try {
      await disciplinaService.delete(id);
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ codigo: '', cursoId: '', nome: '', cargaHoraria: '', professorId: '', status: true });
    setEditingId(null);
  };

  return (
    <div>
      <h1>Disciplinas</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Código:</label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Curso:</label>
              <select
                value={formData.cursoId}
                onChange={(e) => setFormData({...formData, cursoId: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                {cursos.map(curso => (
                  <option key={curso._id} value={curso._id}>{curso.nome}</option>
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
              <label>Carga Horária:</label>
              <input
                type="number"
                value={formData.cargaHoraria}
                onChange={(e) => setFormData({...formData, cargaHoraria: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Professor:</label>
              <select
                value={formData.professorId}
                onChange={(e) => setFormData({...formData, professorId: e.target.value})}
              >
                <option value="">Selecione</option>
                {professores.map(prof => (
                  <option key={prof._id} value={prof._id}>{prof.nome}</option>
                ))}
              </select>
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
                  <td>{item.codigo}</td>
                  <td>{item.cursoId?.nome}</td>
                  <td>{item.nome}</td>
                  <td>{item.cargaHoraria}</td>
                  <td>{item.professorId?.nome || 'Não atribuído'}</td>
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

export default DisciplinaPage;