import { useState, useEffect } from "react";
import axios from "axios";
import FormularioEstudiante from "../components/FormularioEstudiante";
import TablaEstudiantes from "../components/TablaEstudiantes";
import Estadisticas from "../components/Estadisticas";
import type { Estudiante } from "../types/Estudiante";
import '../App.css';


function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [filtroCedula, setFiltroCedula] = useState("");

  async function fetchEstudiantes() {
  try {
    const resp = await axios.get("http://localhost:3001/api/estudiantes"); 
    setEstudiantes(resp.data); //si no presento resp - no sale tabla
  } catch (error) {
    console.error("No pude traer la lista:", error);
  }
}

    useEffect(() => {
  fetchEstudiantes();
  }, []);

  const total = estudiantes.length;

  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
  porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });
  const estudiantesFiltrados = filtroCedula
  ? estudiantes.filter((e) => e.cedula === filtroCedula) : estudiantes;

  return (
    <div className="container mt-5" style={{ paddingTop: "230px" }}>
      <h1 className="mb-4">Seguimiento de Estudiantes</h1>

      <div className="row align-items-center mb-4">
       {/* Barra buscar por cedula */}
         <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text" id="buscar-addon">
                 <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por cédula..."
                aria-label="Buscar"
                aria-describedby="buscar-addon"
                value={filtroCedula}
                onChange={(e) => setFiltroCedula(e.target.value)}
              />
           </div>
         </div>

      {/* Boton derecho para mostrar modal */}
      <div className="col-md-4 text-end mt-2 mt-md-0">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalNuevoRegistro"
        >
          <i className="bi bi-person-plus me-2"></i>
          Nuevo Registro
        </button>
      </div>
    </div>

      {/* Modal abierto */}
      <div
        className="modal fade"
        id="modalNuevoRegistro"
        tabIndex={-1}
        aria-labelledby="modalNuevoRegistroLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalNuevoRegistroLabel">
                Nuevo Estudiante
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <FormularioEstudiante onRegistroExitoso={fetchEstudiantes} />
            </div>
          </div>
        </div>
      </div>

      {/*Seccion "total estudiantes" y "por carrera" */}
      <div className="row mt-4">
        <div className="col-md-6">
          <Estadisticas total={total} porCarrera={porCarrera} />
        </div>
      </div>

      {/*Seccion tabla con registros creados */}
      <TablaEstudiantes estudiantes={estudiantesFiltrados} />
    </div>
  );
}

export default Estudiantes;
