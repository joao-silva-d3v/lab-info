import { useState, useEffect } from 'react';
import { FaCalendarPlus, FaTrash, FaClock, FaExclamationTriangle } from 'react-icons/fa';
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
      alert('✅ Aula alocada com sucesso!');
    } catch (error) {
      if (error.response?.status === 409) {
        alert(`⚠️ Conflito de horário: ${error.response.data.msg}`);
      } else {
        console.error('Error saving aula:', error);
        alert('❌ Erro ao alocar aula. Tente novamente.');
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
    if (window.confirm('Tem certeza que deseja excluir esta alocação?')) {
      try {
        await aulaService.delete(id);
        loadAulas();
      } catch (error) {
        console.error('Error deleting aula:', error);
      }
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
        <h1 className="page-title">Alocação de Aulas</h1>
        <p className="page-subtitle">Aloque disciplinas aos professores, laboratórios e horários</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <FaCalendarPlus style={{marginRight: '0.5rem'}} />
              Nova Alocação
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Semestre</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.semestre}
                  onChange={(e) => setFormData({...formData, semestre: e.target.value})}
                  placeholder="Ex: 2024/1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Disciplina</label>
                <select
                  className="form-input"
                  value={formData.disciplinaId}
                  onChange={(e) => setFormData({...formData, disciplinaId: e.target.value})}
                  required
                >
                  <option value="">Selecione uma disciplina</option>
                  {disciplinas.map(disc => (
                    <option key={disc._id} value={disc._id}>{disc.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Professor</label>
                <select
                  className="form-input"
                  value={formData.professorId}
                  onChange={(e) => setFormData({...formData, professorId: e.target.value})}
                  required
                >
                  <option value="">Selecione um professor</option>
                  {professores.map(prof => (
                    <option key={prof._id} value={prof._id}>{prof.nome}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Laboratório</label>
                <select
                  className="form-input"
                  value={formData.laboratorioId}
                  onChange={(e) => setFormData({...formData, laboratorioId: e.target.value})}
                  required
                >
                  <option value="">Selecione um laboratório</option>
                  {laboratorios.map(lab => (
                    <option key={lab._id} value={lab._id}>{lab.nome}</option>
                  ))}
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
              
              {formData.diaSemana && (
                <div className="form-group">
                  <label className="form-label">
                    <FaClock style={{marginRight: '0.5rem'}} />
                    Blocos de Horário
                  </label>
                  {blocosFiltered.length === 0 ? (
                    <div style={{padding: '1rem', background: 'var(--gray-100)', borderRadius: 'var(--border-radius-sm)', color: 'var(--gray-600)'}}>
                      Nenhum bloco disponível para {formData.diaSemana}
                    </div>
                  ) : (
                    <div className="checkbox-group">
                      {blocosFiltered.map(bloco => (
                        <div key={bloco._id} className="checkbox-item">
                          <input
                            type="checkbox"
                            className="checkbox"
                            id={`bloco-${bloco._id}`}
                            checked={formData.blocos.includes(bloco._id)}
                            onChange={() => handleBlocoChange(bloco._id)}
                          />
                          <label htmlFor={`bloco-${bloco._id}`} className="form-label">
                            {bloco.inicio} - {bloco.fim}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div className="form-group">
                  <label className="form-label">Data Início</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Data Fim</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="action-buttons">
                <button type="submit" className="btn btn-primary">
                  <FaCalendarPlus />
                  Alocar Aula
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="table-card">
          <div className="table-header">
            <h2 className="table-title">Aulas Alocadas</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
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
                    <td><strong>{aula.semestre}</strong></td>
                    <td>{aula.disciplinaId?.nome}</td>
                    <td>{aula.professorId?.nome}</td>
                    <td>{aula.laboratorioId?.nome}</td>
                    <td>{aula.diaSemana}</td>
                    <td>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem'}}>
                        {aula.blocos?.map((bloco, index) => (
                          <span key={index} style={{
                            background: 'var(--gray-100)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            {bloco.inicio}-{bloco.fim}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(aula._id)}
                        title="Excluir alocação"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {aulas.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                      Nenhuma aula alocada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {aulas.length > 0 && (
        <div className="card" style={{marginTop: '2rem', background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(56, 161, 105, 0.1))', border: '1px solid rgba(72, 187, 120, 0.2)'}}>
          <div className="card-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)'}}>
              <FaExclamationTriangle />
              <strong>Dica:</strong> O sistema automaticamente verifica conflitos de horário entre professores e laboratórios.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlocacaoPage;