import { useState, useEffect } from 'react';
import { createCrudService } from '../services/api';

const disciplinaService = createCrudService('/disciplinas');
const professorService = createCrudService('/professores');
const laboratorioService = createCrudService('/laboratorios');
const blocoService = createCrudService('/blocos');
const aulaService = createCrudService('/aulas');

function AlocacaoPage() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [blocosFiltered, setBlocosFiltered] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [formData, setFormData] = useState({
    semestre: '',
    cursoId: '',
    disciplinaId: '',
    professorId: '',
    laboratorioId: '',
    diaSemana: '',
    blocos: [],
    dataInicio: '',
    dataFim: ''
  });

  useEffect(() => {
    loadDisciplinas();
    loadProfessores();
    loadLaboratorios();
    loadBlocos();
    loadAulas();
  }, []);

  useEffect(() => {
    if (formData.diaSemana && blocos.length > 0) {
      const filtered = blocos.filter(bloco => bloco.diaSemana === formData.diaSemana);
      setBlocosFiltered(filtered);
    } else {
      setBlocosFiltered([]);
    }
  }, [formData.diaSemana, blocos]);

  useEffect(() => {
    if (formData.disciplinaId) {
      const disciplina = disciplinas.find(d => d._id === formData.disciplinaId);
      if (disciplina) {
        setFormData(prev => ({
          ...prev,
          professorId: disciplina.professorId?._id || '',
          cursoId: disciplina.cursoId?._id || ''
        }));
      }
    }
  }, [formData.disciplinaId, disciplinas]);

  const loadDisciplinas = async () => {
    try {
      const response = await disciplinaService.getAll();
      setDisciplinas(response.data);
    } catch (error) {
      console.error('Error loading disciplinas:', error);
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

  const loadLaboratorios = async () => {
    try {
      const response = await laboratorioService.getAll();
      setLaboratorios(response.data);
    } catch (error) {
      console.error('Error loading laboratorios:', error);
    }
  };

  const loadBlocos = async () => {
    try {
      const response = await blocoService.getAll();
      setBlocos(response.data);
    } catch (error) {
      console.error('Error loading blocos:', error);
    }
  };

  const loadAulas = async () => {
    try {
      const response = await aulaService.getAll();
      setAulas(response.data);
    } catch (error) {
      console.error('Error loading aulas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await aulaService.create(formData);
      setFormData({
        semestre: '',
        cursoId: '',
        disciplinaId: '',
        professorId: '',
        laboratorioId: '',
        diaSemana: '',
        blocos: [],
        dataInicio: '',
        dataFim: ''
      });
      loadAulas();
    } catch (error) {
      if (error.response?.status === 409) {
        alert(error.response.data.msg);
      } else {
        console.error('Error saving aula:', error);
      }
    }
  };

  const handleBlocoChange = (blocoId) => {
    const newBlocos = formData.blocos.includes(blocoId)
      ? formData.blocos.filter(id => id !== blocoId)
      : [...formData.blocos, blocoId];
    setFormData({...formData, blocos: newBlocos});
  };

  const handleDelete = async (id) => {
    try {
      await aulaService.delete(id);
      loadAulas();
    } catch (error) {
      console.error('Error deleting aula:', error);
    }
  };

  return (
    <div>
      <h1>Alocação de Aulas</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Semestre:</label>
              <input
                type="text"
                value={formData.semestre}
                onChange={(e) => setFormData({...formData, semestre: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Disciplina:</label>
              <select
                value={formData.disciplinaId}
                onChange={(e) => setFormData({...formData, disciplinaId: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                {disciplinas.map(disc => (
                  <option key={disc._id} value={disc._id}>{disc.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Professor:</label>
              <select
                value={formData.professorId}
                onChange={(e) => setFormData({...formData, professorId: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                {professores.map(prof => (
                  <option key={prof._id} value={prof._id}>{prof.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Laboratório:</label>
              <select
                value={formData.laboratorioId}
                onChange={(e) => setFormData({...formData, laboratorioId: e.target.value})}
                required
              >
                <option value="">Selecione</option>
                {laboratorios.map(lab => (
                  <option key={lab._id} value={lab._id}>{lab.nome}</option>
                ))}
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
              <label>Blocos:</label>
              <div className="checkbox-group">
                {blocosFiltered.map(bloco => (
                  <div key={bloco._id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.blocos.includes(bloco._id)}
                      onChange={() => handleBlocoChange(bloco._id)}
                    />
                    <label>{bloco.inicio} - {bloco.fim}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Data Início:</label>
              <input
                type="date"
                value={formData.dataInicio}
                onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Data Fim:</label>
              <input
                type="date"
                value={formData.dataFim}
                onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Alocar Aula
            </button>
          </form>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Semestre</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Laboratório</th>
                <th>Dia</th>
                <th>Horários</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map(aula => (
                <tr key={aula._id}>
                  <td>{aula.semestre}</td>
                  <td>{aula.disciplinaId?.nome}</td>
                  <td>{aula.professorId?.nome}</td>
                  <td>{aula.laboratorioId?.nome}</td>
                  <td>{aula.diaSemana}</td>
                  <td>
                    {aula.blocos?.map(bloco => `${bloco.inicio}-${bloco.fim}`).join(', ')}
                  </td>
                  <td>
                    <button className="btn btn-delete" onClick={() => handleDelete(aula._id)}>
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

export default AlocacaoPage;