import React, { useState } from "react";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  onAgregar: (estudiante: Estudiante) => void;
}

function FormularioEstudiante({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [nivel, setNivel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregar({ nombre, carrera, nivel });
    setNombre("");
    setCarrera("");
    setNivel(1);
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title">Registrar estudiante</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Carrera</label>
          <input className="form-control" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Nivel</label>
          <input type="number" className="form-control" value={nivel} onChange={(e) => setNivel(Number(e.target.value))} />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
}

export default FormularioEstudiante;
