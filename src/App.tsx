import { useState, useEffect } from "react";
import type { Tarea } from "./types/Estudiante";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Estudiantes from "./pages/Estudiantes";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

function App() {
  const [recordatorios, setRecordatorios] = useState<Tarea[]>([]);
  useEffect(() => {
    const datos = localStorage.getItem("recordatorios");
    if (datos) {
      setRecordatorios(JSON.parse(datos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
  }, [recordatorios]);
  return ( 
    <Router>
      <div className="sb-nav-fixed">
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <div id="layoutSidenav_content">
            <main className="main-content">
              <div className="container-fluid px-4">
                <Routes>
                  <Route
                  path="/"
                  element={
                    <Inicio
                     recordatorios={recordatorios}
                     setRecordatorios={setRecordatorios}
                    />
                  }
                  />
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