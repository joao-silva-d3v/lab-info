import { useState, useEffect } from 'react';
import { FaFilter, FaCalendarWeek, FaFlask, FaChalkboardTeacher, FaGraduationCap, FaClock } from 'react-icons/fa';
import { createCrudService } from '../services/api';

const aulaService = createCrudService('/aulas');
const laboratorioService = createCrudService('/laboratorios');
const professorService = createCrudService('/professores');
const cursoService = createCrudService('/cursos');

function ConsultaHorarioPage() {
  const [aulas, setAulas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [filtroLab, setFiltroLab] = useState('');
  const [filtroProf, setFiltroProf] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');

  useEffect(() => {
    loadAulas();
    loadLaboratorios();
    loadProfessores();
    loadCursos();
  }, []);

  const loadAulas = async () => {
    try {
      const response = await aulaService.getAll();
      setAulas(response.data);
    } catch (error) {
      console.error('Error loading aulas:', error);
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

  const loadProfessores = async () => {
    try {
      const response = await professorService.getAll();
      setProfessores(response.data);
    } catch (error) {
      console.error('Error loading professores:', error);
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

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Criar lista única de blocos baseada em início-fim
  const blocosUnicos = [...new Set(
    aulas.flatMap(aula => 
      aula.blocos?.map(bloco => `${bloco.inicio}-${bloco.fim}`) || []
    )
  )].sort();

  const findAulas = (dia, horario) => {
    return aulas.filter(aula => {
      if (aula.diaSemana !== dia) return false;
      
      const temHorario = aula.blocos?.some(bloco => 
        `${bloco.inicio}-${bloco.fim}` === horario
      );
      
      if (!temHorario) return false;

      // Aplicar filtros
      if (filtroLab && aula.laboratorioId?._id !== filtroLab) return false;
      if (filtroProf && aula.professorId?._id !== filtroProf) return false;
      if (filtroCurso && aula.cursoId?._id !== filtroCurso) return false;

      return true;
    });
  };

  const clearFilters = () => {
    setFiltroLab('');
    setFiltroProf('');
    setFiltroCurso('');
  };

  const hasActiveFilters = filtroLab || filtroProf || filtroCurso;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Consulta de Horários</h1>
        <p className="page-subtitle">Visualize a grade de horários das aulas com filtros dinâmicos</p>
      </div>
      
      <div className="card" style={{marginBottom: '2rem'}}>
        <div className="card-header">
          <h2 className="card-title">
            <FaFilter style={{marginRight: '0.5rem'}} />
            Filtros de Consulta
          </h2>
        </div>
        <div className="card-body">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1rem'}}>
            <div className="form-group">
              <label className="form-label">
                <FaFlask style={{marginRight: '0.5rem'}} />
                Laboratório
              </label>
              <select
                className="form-input"
                value={filtroLab}
                onChange={(e) => setFiltroLab(e.target.value)}
              >
                <option value="">Todos os laboratórios</option>
                {laboratorios.map(lab => (
                  <option key={lab._id} value={lab._id}>{lab.nome}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaChalkboardTeacher style={{marginRight: '0.5rem'}} />
                Professor
              </label>
              <select
                className="form-input"
                value={filtroProf}
                onChange={(e) => setFiltroProf(e.target.value)}
              >
                <option value="">Todos os professores</option>
                {professores.map(prof => (
                  <option key={prof._id} value={prof._id}>{prof.nome}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaGraduationCap style={{marginRight: '0.5rem'}} />
                Curso
              </label>
              <select
                className="form-input"
                value={filtroCurso}
                onChange={(e) => setFiltroCurso(e.target.value)}
              >
                <option value="">Todos os cursos</option>
                {cursos.map(curso => (
                  <option key={curso._id} value={curso._id}>{curso.nome}</option>
                ))}
              </select>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <span style={{color: 'var(--gray-600)', fontSize: '0.875rem'}}>
                Filtros ativos: {[filtroLab && 'Laboratório', filtroProf && 'Professor', filtroCurso && 'Curso'].filter(Boolean).join(', ')}
              </span>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={clearFilters}
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <FaCalendarWeek style={{marginRight: '0.5rem'}} />
            Grade de Horários
          </h2>
        </div>
        <div className="card-body" style={{padding: 0, overflow: 'auto'}}>
          <table className="grade-table">
            <thead>
              <tr>
                <th style={{minWidth: '120px'}}>
                  <FaClock style={{marginRight: '0.5rem'}} />
                  Horário
                </th>
                {diasSemana.map(dia => (
                  <th key={dia} style={{minWidth: '180px'}}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blocosUnicos.length === 0 ? (
                <tr>
                  <td colSpan={diasSemana.length + 1} style={{textAlign: 'center', padding: '3rem', color: 'var(--gray-500)'}}>
                    Nenhuma aula encontrada
                  </td>
                </tr>
              ) : (
                blocosUnicos.map(horario => (
                  <tr key={horario}>
                    <td style={{fontWeight: 'bold', background: 'var(--gray-50)'}}>{horario}</td>
                    {diasSemana.map(dia => {
                      const aulasNoCelula = findAulas(dia, horario);
                      return (
                        <td key={`${dia}-${horario}`} className={aulasNoCelula.length > 0 ? 'aula-cell' : ''}>
                          {aulasNoCelula.map(aula => (
                            <div key={aula._id} style={{
                              marginBottom: '0.75rem',
                              padding: '0.5rem',
                              background: 'rgba(255, 255, 255, 0.8)',
                              borderRadius: '6px',
                              border: '1px solid rgba(102, 126, 234, 0.2)'
                            }}>
                              <div style={{fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.25rem'}}>
                                {aula.disciplinaId?.nome}
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: '0.25rem'}}>
                                👨‍🏫 {aula.professorId?.nome}
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: '0.25rem'}}>
                                🧪 {aula.laboratorioId?.nome}
                              </div>
                              <div style={{fontSize: '0.75rem', color: 'var(--gray-500)'}}>
                                {aula.semestre}
                              </div>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConsultaHorarioPage;