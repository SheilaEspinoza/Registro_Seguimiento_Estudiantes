import { useState, useEffect } from "react";
import type { Estudiante } from "../types/Estudiante";
import * as bootstrap from "bootstrap";

interface Props {
  cedula: string;
  onEliminar: (cedula: string) => void;
  estudiante: Estudiante;
}

const Acciones: React.FC<Props> = ({ cedula, onEliminar, estudiante }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    triggers.forEach(el => new bootstrap.Tooltip(el as HTMLElement, { container: "body" }));
  }, []);

  const eliminarEstudiante = async () => { /* ... */ };
  const confirmarEliminacion = () => {
    eliminarEstudiante();
    setMostrarConfirmacion(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-success btn-sm mx-3 me-1 d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        title="Editar"
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm mx-3 me-1 d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        title="Eliminar"
        onClick={() => setMostrarConfirmacion(true)}
      >
        <i className="bi bi-trash"></i>
      </button>
      <button
        type="button"
        className="btn btn-outline-warning btn-sm mx-3 d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        title="Ver información"
      >
        <i className="bi bi-person-vcard"></i>
      </button>

      {mostrarConfirmacion && (
        <div className="alert alert-danger mt-2 p-2">
          <p>¿Seguro que deseas eliminar a <strong>{estudiante.nombre}</strong>?</p>
          <button onClick={confirmarEliminacion} className="btn btn-danger btn-sm me-2">Sí</button>
          <button onClick={() => setMostrarConfirmacion(false)} className="btn btn-secondary btn-sm">No</button>
        </div>
      )}
    </div>
  );
}

export default Acciones;

