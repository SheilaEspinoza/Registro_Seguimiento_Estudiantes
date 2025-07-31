import React, { useEffect, useRef, useState } from "react";
import type { Estudiante } from "../types/Estudiante";
import * as bootstrap from "bootstrap";

interface Props {
  cedula: string;
  onEliminar: (cedula: string) => void;
  estudiante: Estudiante;
  onEditar: (estudiante: Estudiante) => void;
  modo?: "completo" | "solo-info";
}

const Acciones: React.FC<Props> = ({
  cedula,
  onEliminar,
  estudiante,
  onEditar,
  modo = "completo",
}) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInstanceRef = useRef<bootstrap.Modal | null>(null);

  useEffect(() => {
    const triggers = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    triggers.forEach(
      (el) => new bootstrap.Tooltip(el as HTMLElement, { container: "body" })
    );
  }, []);

  const eliminarEstudiante = async () => {
    try {
      const resp = await fetch(
        `http://localhost:3001/api/estudiantes/${cedula}`,
        {
          method: "DELETE",
        }
      );

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

  const mostrarModalInfo = () => {
    if (modalRef.current) {
      modalInstanceRef.current = new bootstrap.Modal(modalRef.current);
      modalInstanceRef.current.show();
    }
  };

  return (
    <>
      <div>
        {modo === "completo" && (
          <>
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
          </>
        )}

        <button
          type="button"
          className="btn btn-outline-warning btn-sm mx-1"
          data-bs-toggle="tooltip"
          title="Ver información"
          onClick={mostrarModalInfo}
        >
          <i className="bi bi-person-vcard"></i>
        </button>

        {mostrarConfirmacion && modo === "completo" && (
          <div className="alert alert-danger mt-2 p-2">
            <p>
              ¿Seguro que deseas eliminar a <strong>{estudiante.nombre}</strong>
              ?
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

      <div
        className="modal fade"
        id={`modalInfoEstudiante-${cedula}`} // por si usas varios
        tabIndex={-1}
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Información del Estudiante</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modalInstanceRef.current?.hide()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <img
                  src={
                    estudiante.foto
                      ? `http://localhost:3001/uploads/${estudiante.foto}`
                      : "/img/null.jpg"
                  }
                  alt="Foto Estudiante"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Cédula:</strong> {estudiante.cedula}
                </li>
                <li className="list-group-item">
                  <strong>Nombre:</strong> {estudiante.nombre}{" "}
                  {estudiante.apellido}
                </li>
                <li className="list-group-item">
                  <strong>Correo:</strong> {estudiante.correo}
                </li>
                <li className="list-group-item">
                  <strong>Carrera:</strong> {estudiante.carrera}
                </li>
                <li className="list-group-item">
                  <strong>Nivel:</strong> {estudiante.nivel}
                </li>
                <li className="list-group-item">
                  <strong>País:</strong> {estudiante.pais}
                </li>
                <li className="list-group-item">
                  <strong>Ciudad:</strong> {estudiante.ciudad}
                </li>
                <li className="list-group-item">
                  <strong>Dirección:</strong> {estudiante.direccion}
                </li>
                <li className="list-group-item">
                  <strong>Teléfono:</strong> {estudiante.telefono}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acciones;
