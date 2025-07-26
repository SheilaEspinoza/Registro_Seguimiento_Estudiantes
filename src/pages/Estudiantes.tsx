import { useState } from "react";
import { Modal } from "bootstrap";
import FormularioEstudiante from "../components/FormularioEstudiante";
import TablaEstudiantes from "../components/TablaEstudiantes";
import Estadisticas from "../components/Estadisticas";
import type { Estudiante } from "../types/Estudiante";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
const [filtroCedula, setFiltroCedula] = useState("");
  const agregarEstudiante = (nuevo: Estudiante) => {
    setEstudiantes([...estudiantes, nuevo]);
     

    try {
      const modal = document.getElementById("modalNuevoRegistro");
      if (modal) {
        const modalInstance = Modal.getOrCreateInstance(modal);
        modalInstance.hide();
      }
    } catch (error) {
      console.error("Error cerrando modal:", error);
    }

  };

  const total = estudiantes.length;

  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
    porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });
const estudiantesFiltrados = filtroCedula
  ? estudiantes.filter((e) => e.cedula === filtroCedula)
  : estudiantes;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Seguimiento de Estudiantes</h1>

      {/* Boton derecho para mostrar modal */}
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalNuevoRegistro"
        >
          Nuevo Registro
        </button>
      </div>
      {/* 🔍 Buscador por cédula */}
      <div className="input-group mb-4">
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
              <FormularioEstudiante onAgregar={agregarEstudiante} />
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
