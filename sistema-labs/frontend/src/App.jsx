import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import InstituicaoPage from './pages/InstituicaoPage';
import CursoPage from './pages/CursoPage';
import ProfessorPage from './pages/ProfessorPage';
import DisciplinaPage from './pages/DisciplinaPage';
import LaboratorioPage from './pages/LaboratorioPage';
import BlocoPage from './pages/BlocoPage';
import AlocacaoPage from './pages/AlocacaoPage';
import ConsultaHorarioPage from './pages/ConsultaHorarioPage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><NavLink to="/instituicoes">Instituições</NavLink></li>
          <li><NavLink to="/cursos">Cursos</NavLink></li>
          <li><NavLink to="/professores">Professores</NavLink></li>
          <li><NavLink to="/disciplinas">Disciplinas</NavLink></li>
          <li><NavLink to="/laboratorios">Laboratórios</NavLink></li>
          <li><NavLink to="/blocos">Blocos</NavLink></li>
          <li><NavLink to="/alocacao">Alocação</NavLink></li>
          <li><NavLink to="/consulta">Consulta Horário</NavLink></li>
        </ul>
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/instituicoes" element={<InstituicaoPage />} />
          <Route path="/cursos" element={<CursoPage />} />
          <Route path="/professores" element={<ProfessorPage />} />
          <Route path="/disciplinas" element={<DisciplinaPage />} />
          <Route path="/laboratorios" element={<LaboratorioPage />} />
          <Route path="/blocos" element={<BlocoPage />} />
          <Route path="/alocacao" element={<AlocacaoPage />} />
          <Route path="/consulta" element={<ConsultaHorarioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;