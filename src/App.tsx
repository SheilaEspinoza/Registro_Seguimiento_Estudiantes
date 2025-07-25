import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Layout from "./components/Layout"; // Por ahora no se usa aqui
import Header from './components/Header';
import Inicio from "./pages/Inicio";
import Estudiantes from "./pages/Estudiantes";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

function App() {
  return (
    <Router>
      <div className="sb-nav-fixed">
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/estudiantes" element={<Estudiantes />} />
                  <Route path="/reportes" element={<Reportes />} />
                  <Route path="/configuracion" element={<Configuracion />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


