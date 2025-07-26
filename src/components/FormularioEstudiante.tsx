import React, { useState } from "react";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  onAgregar: (estudiante: Estudiante) => void;
}

function FormularioEstudiante({ onAgregar }: Props) {
  const [activeTab, setActiveTab] = useState("personales");
  
  const [foto, setFoto] = useState<File | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");

  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telf, setTelf] = useState("");

  
  const [carrera, setCarrera] = useState("");
  const [nivel, setNivel] = useState(1);

  //campos para limpiar - se llama en boton limpiar
  const limpiarCampos = () => {
  setNombre("");
  setApellido("");
  setCedula("");
  setCorreo("");
  setFoto(null);
  setCiudad("");
  setDireccion("");
  setTelf("");
  setCarrera("");
  setNivel(1);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregar({ nombre, apellido, cedula, carrera, nivel });
    setFoto(null);
    setNombre("");
    setApellido("");
    setCedula("");
    setCorreo("");

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
            className={`nav-link ${activeTab === "academicos" ? "active" : ""}`}
            onClick={() => setActiveTab("academicos")}
          >
            Datos académicos
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
      </ul>

      <form onSubmit={handleSubmit}>
      {activeTab === "personales" && (
        <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Foto</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Cédula</label>
              <input className="form-control form-control-sm" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label ">Nombres</label>
              <input className="form-control form-control-sm" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellidos</label>
              <input className="form-control form-control-sm" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo</label>
              <input className="form-control form-control-sm" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
          </div>
        )}

         {activeTab === "academicos" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Carrera</label>
              <select
                className="form-select form-select-sm"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              >
                <option value="">Seleccione una carrera</option>
                <option value="Computación">Computación</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nivel</label>
              <input 
                type="number" 
                className="form-control form-control-sm" 
                value={nivel} 
                onChange={(e) => setNivel(Number(e.target.value))} 
              />
            </div>
          </div>
        )}

        {activeTab === "ubicacion" && (
          <div className="row">
           <div className="col-md-6 mb-3">
              <label className="form-label">Ciudad</label>
              <input className="form-control form-control-sm" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Dirección</label>
              <input className="form-control form-control-sm" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input className="form-control form-control-sm" value={telf} onChange={(e) => setTelf(e.target.value)} />
            </div>

            {/*Botones para enviar, limpiar */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Agregar Registro</button>
              <button type="button" className="btn btn-secondary" onClick={limpiarCampos}>Limpiar</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default FormularioEstudiante;
