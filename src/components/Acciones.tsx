import React, { useEffect, useRef, useState } from "react";
import type { Estudiante } from "../types/Estudiante";
import * as bootstrap from "bootstrap";

interface Props {
  cedula: string;
  onEliminar: (cedula: string) => void;
  estudiante: Estudiante;
  onEditar?: (estudiante: Estudiante) => void;
  modo?: "completo" | "solo-info";
  modoReporte?: "completo" | "basicos";
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

  const onVerInfo = () => {
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
          onClick={onVerInfo}
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
        <div className="modal-dialog modal-dialog-centered animate-fade-in">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-black">
                <h5 className="modal-title">Credencial del Estudiante</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => modalInstanceRef.current?.hide()}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  className="card mx-auto shadow"
                  style={{ maxWidth: "400px" }}
                >
                  <div className="card-body text-center">
                    <img
                      src={
                        estudiante.foto
                          ? `http://localhost:3001/uploads/${estudiante.foto}`
                          : "/img/null.jpg"
                      }
                      alt="Foto Estudiante"
                      className="img-fluid rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="card-title">
                      {estudiante.nombre} {estudiante.apellido}
                    </h5>
                    <p className="text-muted">
                      {estudiante.carrera} - Nivel {estudiante.nivel}
                    </p>
                    <hr />
                    <div className="text-start">
                      <p>
                        <strong>Cédula:</strong> {estudiante.cedula}
                      </p>
                      <p>
                        <strong>Correo:</strong> {estudiante.correo}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {estudiante.telefono}
                      </p>
                      <p>
                        <strong>Dirección:</strong> {estudiante.direccion}
                      </p>
                      <p>
                        <strong>Ciudad:</strong> {estudiante.ciudad},{" "}
                        {estudiante.pais}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acciones;
