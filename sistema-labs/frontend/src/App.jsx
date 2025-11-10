import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { 
  FaBuilding, 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaBook, 
  FaFlask, 
  FaClock, 
  FaCalendarAlt, 
  FaSearch 
} from 'react-icons/fa';
import InstituicaoPage from './pages/InstituicaoPage';
import CursoPage from './pages/CursoPage';
import ProfessorPage from './pages/ProfessorPage';
import DisciplinaPage from './pages/DisciplinaPage';
import LaboratorioPage from './pages/LaboratorioPage';
import BlocoPage from './pages/BlocoPage';
import AlocacaoPage from './pages/AlocacaoPage';
import ConsultaHorarioPage from './pages/ConsultaHorarioPage';

function App() {
  const navItems = [
    { path: '/instituicoes', label: 'Instituições', icon: FaBuilding },
    { path: '/cursos', label: 'Cursos', icon: FaGraduationCap },
    { path: '/professores', label: 'Professores', icon: FaChalkboardTeacher },
    { path: '/disciplinas', label: 'Disciplinas', icon: FaBook },
    { path: '/laboratorios', label: 'Laboratórios', icon: FaFlask },
    { path: '/blocos', label: 'Blocos de Horário', icon: FaClock },
    { path: '/alocacao', label: 'Alocação de Aulas', icon: FaCalendarAlt },
    { path: '/consulta', label: 'Consulta Horário', icon: FaSearch },
  ];

  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Lab System</h1>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(({ path, label, icon: Icon }) => (
              <div key={path} className="nav-item">
                <NavLink to={path} className="nav-link">
                  <Icon className="nav-icon" />
                  <span>{label}</span>
                </NavLink>
              </div>
            ))}
          </nav>
        </aside>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<InstituicaoPage />} />
            <Route path="/instituicoes" element={<InstituicaoPage />} />
            <Route path="/cursos" element={<CursoPage />} />
            <Route path="/professores" element={<ProfessorPage />} />
            <Route path="/disciplinas" element={<DisciplinaPage />} />
            <Route path="/laboratorios" element={<LaboratorioPage />} />
            <Route path="/blocos" element={<BlocoPage />} />
            <Route path="/alocacao" element={<AlocacaoPage />} />
            <Route path="/consulta" element={<ConsultaHorarioPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;