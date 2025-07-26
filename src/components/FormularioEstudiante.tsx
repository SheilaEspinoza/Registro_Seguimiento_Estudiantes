import React, { useState } from "react";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  onAgregar: (estudiante: Estudiante) => void;
}

function FormularioEstudiante({ onAgregar }: Props) {
  const [activeTab, setActiveTab] = useState("personales");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");

  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telf, setTelf] = useState("");

  
  const [carrera, setCarrera] = useState("");
  const [nivel, setNivel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregar({ nombre, apellido, cedula, carrera, nivel });
    setNombre("");
    setApellido("");
    setCedula("");

    setCiudad("");
    setDireccion("");
    setTelf("");

    setCarrera("");
    setNivel(1);
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title">Registrar estudiante</h5>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "personales" ? "active" : ""}`}
            onClick={() => setActiveTab("personales")}
          >
            Datos personales
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "ubicacion" ? "active" : ""}`}
            onClick={() => setActiveTab("ubicacion")}
          >
            Datos de ubicación
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "academicos" ? "active" : ""}`}
            onClick={() => setActiveTab("academicos")}
          >
            Datos académicos
          </button>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
      {activeTab === "personales" && (
          <>
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Cédula</label>
              <input className="form-control" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            </div>
          </>
        )}

         {activeTab === "academicos" && (
          <>
            <div className="mb-3">
              <label className="form-label">Carrera</label>
              <input className="form-control" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Nivel</label>
              <input 
                type="number" 
                className="form-control" 
                value={nivel} 
                onChange={(e) => setNivel(Number(e.target.value))} 
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar Registro
            </button>
          </>
        )}

        {activeTab === "ubicacion" && (
          <>
           <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input className="form-control" value={telf} onChange={(e) => setTelf(e.target.value)} />
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default FormularioEstudiante;
