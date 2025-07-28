import { useState } from "react";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  cedula: string;
  onEliminar: (cedula: string) => void;
  estudiante: Estudiante;
}

function Acciones({ cedula, onEliminar, estudiante }: Props) {
     const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const eliminarEstudiante = async () => {
    try {
      const response = await fetch(`http://localhost:3000/estudiantes/${cedula}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onEliminar(estudiante.cedula); 
      } else {
        console.error("No se pudo eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
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
        className="btn btn-outline-success btn-sm me-1"
        //funcion editar
      >
        Editar
      </button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm me-1"
        onClick={() => setMostrarConfirmacion(true)}
      >
        Borrar
      </button>
      <button
        type="button"
        className="btn btn-outline-warning btn-sm"
        // funcion ver informacion
      >
        Información
      </button>

      {mostrarConfirmacion && (
        <div className="alert alert-danger mt-2 p-2">
          <p>
            ¿Seguro que deseas eliminar a <strong>{estudiante.nombre}</strong>?
          </p>
          <button
            onClick={confirmarEliminacion}
            className="btn btn-danger btn-sm me-2"
          >
            Sí
          </button>
          <button
            onClick={() => setMostrarConfirmacion(false)}
            className="btn btn-secondary btn-sm"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Acciones;
