import { useState } from "react";
import FormularioEstudiante from "../components/FormularioEstudiante";
import TablaEstudiantes from "../components/TablaEstudiantes";
import Estadisticas from "../components/Estadisticas";
import type { Estudiante } from "../types/Estudiante";

function App() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const agregarEstudiante = (nuevo: Estudiante) => {
    setEstudiantes([...estudiantes, nuevo]);
  };

  const total = estudiantes.length;

  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
    porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Seguimiento de Estudiantes</h1>

      <div className="row">
        <div className="col-md-6">
          <FormularioEstudiante onAgregar={agregarEstudiante} />
        </div>
        <div className="col-md-6">
          <Estadisticas total={total} porCarrera={porCarrera} />
        </div>
      </div>

      <TablaEstudiantes estudiantes={estudiantes} />
    </div>
  );
}

export default App;
