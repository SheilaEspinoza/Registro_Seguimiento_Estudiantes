import React, { useState, useEffect } from "react";
import type { Estudiante } from "../types/Estudiante";
import * as bootstrap from "bootstrap";

interface Props {
  cedula: string;
  onEliminar: (cedula: string) => void;
  estudiante: Estudiante;
  onEditar: (estudiante: Estudiante) => void;   
  onVerInfo: (estudiante: Estudiante) => void;  
}

const Acciones: React.FC<Props> = ({ cedula, onEliminar, estudiante, onEditar, onVerInfo }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    triggers.forEach(el => new bootstrap.Tooltip(el as HTMLElement, { container: "body" }));
  }, []);

  const eliminarEstudiante = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/api/estudiantes/${cedula}`, {
        method: "DELETE",
      });



      if (resp.ok) {
        onEliminar(cedula);
      } else {
        alert("Error al eliminar estudiante");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar estudiante");
    }
  };

  const confirmarEliminacion = () => {
    eliminarEstudiante();
    setMostrarConfirmacion(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-success btn-sm mx-1"
        data-bs-toggle="tooltip"
        title="Editar"
        onClick={() => onEditar(estudiante)}
      >
        <i className="bi bi-pencil-square"></i>
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm mx-1"
        data-bs-toggle="tooltip"
        title="Eliminar"
        onClick={() => setMostrarConfirmacion(true)}
      >
        <i className="bi bi-trash"></i>
      </button>

      <button
        type="button"
        className="btn btn-outline-warning btn-sm mx-1"
        data-bs-toggle="tooltip"
        title="Ver información"
        onClick={() => onVerInfo(estudiante)}
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
};

export default Acciones;
