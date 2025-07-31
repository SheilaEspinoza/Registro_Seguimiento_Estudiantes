import React from "react";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  estudiante: Estudiante;
}

const CredencialEstudiante: React.FC<Props> = ({ estudiante }) => {
  return (
    <div
      className="card"
      style={{
        width: "320px",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="text-center mb-4">
        <img
          src={
            estudiante.foto
              ? `http://localhost:3001/uploads/${estudiante.foto}`
              : "/img/null.jpg"
          }
          alt="Foto Estudiante"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid #007bff",
          }}
        />
      </div>

      <h5
        className="text-center mb-3"
        style={{ fontWeight: "700", color: "#007bff" }}
      >
        {estudiante.nombre} {estudiante.apellido}
      </h5>

      <ul className="list-group list-group-flush" style={{ fontSize: "14px" }}>
        <li className="list-group-item">
          <strong>Cédula:</strong> {estudiante.cedula}
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
  );
};

export default CredencialEstudiante;
