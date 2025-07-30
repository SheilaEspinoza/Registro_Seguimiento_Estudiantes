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
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalInstance, setModalInstance] = useState<any>(null);

  useEffect(() => {
    if (modalRef.current) {
      const instance = new window.bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        document.querySelector(".modal-backdrop")?.remove();
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");
      });
      setModalInstance(instance);
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

  const handleDelete = (cedula: string) => {
    setEstudiantes((prev) => prev.filter((e) => e.cedula !== cedula));
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const total = estudiantes.length;

  const porCarrera: Record<string, number> = {};
  estudiantes.forEach((e) => {
    porCarrera[e.carrera] = (porCarrera[e.carrera] || 0) + 1;
  });

  const estudiantesFiltrados = filtroCedula
    ? estudiantes.filter((e) => e.cedula === filtroCedula)
    : estudiantes;

  return (
    <>
      <div className="container my-4 p-4 bg-white rounded shadow">
        <h1 className="mb-4">Seguimiento de Estudiantes</h1>

        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <div className="input-group">
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
              className="btn btn-primary"
              onClick={() => modalInstance?.show()}
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

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <TablaEstudiantes
            estudiantes={estudiantesFiltrados}
            onEliminar={handleDelete}
          />
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="modalNuevoRegistro"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Estudiante</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modalInstance?.hide()}
              ></button>
            </div>
            <div className="modal-body">
              <FormularioEstudiante
                onRegistroExitoso={() => {
                  fetchEstudiantes();
                  modalInstance?.hide();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Estudiantes;
