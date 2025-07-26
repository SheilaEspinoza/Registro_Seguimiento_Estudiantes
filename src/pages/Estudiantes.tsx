import { useState } from "react";
import { Modal } from 'bootstrap';
import FormularioEstudiante from "../components/FormularioEstudiante";
import TablaEstudiantes from "../components/TablaEstudiantes";
import Estadisticas from "../components/Estadisticas";
import type { Estudiante } from "../types/Estudiante";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const agregarEstudiante = (nuevo: Estudiante) => {
    setEstudiantes([...estudiantes, nuevo]);

     const modal = document.getElementById("modalNuevoRegistro");
    if (modal) {
      const modalInstance = Modal.getInstance(modal);
      modalInstance?.hide();
    }
  };

  const total = estudiantes.length;

  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
    porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Seguimiento de Estudiantes</h1>

       {/* Boton derecho para mostrar modal */}
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modalNuevoRegistro"
      >
        Nuevo Registro
      </button>

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
      <TablaEstudiantes estudiantes={estudiantes} />
    </div>
  );
}

export default Estudiantes;
