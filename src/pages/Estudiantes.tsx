import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FormularioEstudiante from "../components/FormularioEstudiante";
import TablaEstudiantes from "../components/TablaEstudiantes";
import Estadisticas from "../components/Estadisticas";
import type { Estudiante } from "../types/Estudiante";
import "../App.css";

declare global {
  interface Window {
    bootstrap: any;
  }
}

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [filtroCedula, setFiltroCedula] = useState("");
  const modalNuevoRef = useRef<HTMLDivElement>(null);
  const modalEditarRef = useRef<HTMLDivElement>(null);

  const [modalNuevoInstance, setModalNuevoInstance] = useState<any>(null);
  const [modalEditarInstance, setModalEditarInstance] = useState<any>(null);

  const [estudianteEditar, setEstudianteEditar] = useState<Estudiante | null>(
    null
  );

  useEffect(() => {
    if (modalNuevoRef.current) {
      const instance = new window.bootstrap.Modal(modalNuevoRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setModalNuevoInstance(instance);
    }
    if (modalEditarRef.current) {
      const instance = new window.bootstrap.Modal(modalEditarRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setModalEditarInstance(instance);
    }
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/api/estudiantes");
      setEstudiantes(resp.data);
    } catch (error) {
      console.error("No pude traer la lista:", error);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleDelete = (cedula: string) => {
    setEstudiantes((prev) => prev.filter((e) => e.cedula !== cedula));
  };

  const handleEditar = (estudiante: Estudiante) => {
    setEstudianteEditar(estudiante);
    modalEditarInstance?.show();
  };

  const total = estudiantes.length;
  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
    porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });

  const estudiantesFiltrados = filtroCedula
    ? estudiantes.filter((e) => e.cedula.includes(filtroCedula))
    : estudiantes;

  return (
    <>
      <div className="expandir-components">
        <h1 className="mb-4">Registro y Seguimiento de Estudiantes</h1>

        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <div className="input-group search-estilo rounded">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por cédula..."
                value={filtroCedula}
                onChange={(e) => setFiltroCedula(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4 text-end mt-2 mt-md-0">
            <button
              type="button"
              className="btn-morado"
              onClick={() => modalNuevoInstance?.show()}
            >
              <i className="bi bi-person-plus me-2"></i>
              Crear nuevo registro
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <Estadisticas total={total} porCarrera={porCarrera} />
          </div>
        </div>

        <TablaEstudiantes
          estudiantes={estudiantesFiltrados}
          onEliminar={handleDelete}
          onEditar={handleEditar}
          modo="completo"
          permitirOrden={false}
        />
      </div>

      {/* Modal Nuevo */}
      <div
        className="modal fade"
        id="modalNuevoRegistro"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalNuevoRef}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Estudiante</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modalNuevoInstance?.hide()}
              ></button>
            </div>
            <div className="modal-body">
              <FormularioEstudiante
                onRegistroExitoso={() => {
                  fetchEstudiantes();
                  modalNuevoInstance?.hide();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      <div
        className="modal fade"
        id="modalEditarRegistro"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalEditarRef}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Estudiante</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modalEditarInstance?.hide()}
              ></button>
            </div>
            <div className="modal-body">
              {estudianteEditar && (
                <FormularioEstudiante
                  modoEdicion={true}
                  estudianteEditar={estudianteEditar}
                  onRegistroExitoso={() => {
                    fetchEstudiantes();
                    modalEditarInstance?.hide();
                    setEstudianteEditar(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Estudiantes;
