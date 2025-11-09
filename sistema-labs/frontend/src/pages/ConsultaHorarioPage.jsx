import { useState, useEffect } from 'react';
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

  return (
    <div>
      <h1>Consulta de Horários</h1>
      
      <div className="form-section" style={{marginBottom: '2rem'}}>
        <h3>Filtros</h3>
        <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
          <div>
            <label>Laboratório:</label>
            <select
              value={filtroLab}
              onChange={(e) => setFiltroLab(e.target.value)}
            >
              <option value="">Todos</option>
              {laboratorios.map(lab => (
                <option key={lab._id} value={lab._id}>{lab.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Professor:</label>
            <select
              value={filtroProf}
              onChange={(e) => setFiltroProf(e.target.value)}
            >
              <option value="">Todos</option>
              {professores.map(prof => (
                <option key={prof._id} value={prof._id}>{prof.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Curso:</label>
            <select
              value={filtroCurso}
              onChange={(e) => setFiltroCurso(e.target.value)}
            >
              <option value="">Todos</option>
              {cursos.map(curso => (
                <option key={curso._id} value={curso._id}>{curso.nome}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="grade-table">
          <thead>
            <tr>
              <th>Horário</th>
              {diasSemana.map(dia => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blocosUnicos.map(horario => (
              <tr key={horario}>
                <td><strong>{horario}</strong></td>
                {diasSemana.map(dia => {
                  const aulasNoCelula = findAulas(dia, horario);
                  return (
                    <td key={`${dia}-${horario}`} className={aulasNoCelula.length > 0 ? 'aula-cell' : ''}>
                      {aulasNoCelula.map(aula => (
                        <div key={aula._id} style={{marginBottom: '0.5rem'}}>
                          <div><strong>{aula.disciplinaId?.nome}</strong></div>
                          <div>{aula.professorId?.nome}</div>
                          <div>{aula.laboratorioId?.nome}</div>
                          <div><small>{aula.semestre}</small></div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultaHorarioPage;