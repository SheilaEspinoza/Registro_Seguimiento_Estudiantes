import { useState } from "react";
import "../App.css";
import type { Estudiante } from "../types/Estudiante";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const estudiantes = [
  {
    cedula: "1234567890",
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    pais: "Ecuador",
    foto: null,
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombre: "María",
    apellido: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
    pais: "Ecuador",
    foto: null,
  },
  {
    cedula: "1234567890",
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    pais: "Ecuador",
    foto: null,
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombre: "María",
    apellido: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
    pais: "Ecuador",
    foto: null,
  },
];

const Reportes = () => {
  const [busqueda, setBusqueda] = useState<string>("");
  const [columnaOrden, setColumnaOrden] = useState<keyof Estudiante | null>(
    null
  );
  const [ascendente, setAscendente] = useState<boolean>(true);

  const ordenarPor = (col: keyof Estudiante) => {
    if (col === columnaOrden) {
      setAscendente(!ascendente);
    } else {
      setColumnaOrden(col);
      setAscendente(true);
    }
  };

  const estudiantesFiltrados = [...estudiantes]
    .filter((est) =>
      Object.values(est).some(
        (valor) =>
          valor != null &&
          valor.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!columnaOrden) return 0;
      const valA = a[columnaOrden]?.toString().toLowerCase() || "";
      const valB = b[columnaOrden]?.toString().toLowerCase() || "";
      return ascendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const resumenPorCarrera = estudiantes.reduce(
    (acc: { [key: string]: number }, est) => {
      acc[est.carrera] = (acc[est.carrera] || 0) + 1;
      return acc;
    },
    {}
  );

  const datosGrafico = Object.entries(resumenPorCarrera).map(
    ([carrera, cantidad]) => ({
      carrera,
      cantidad,
    })
  );

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(201, 201, 201, 0.1)",
      }}
    >
      <div>
        <span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Logo_UCSG.svg"
            alt="logoucsg"
            style={{
              marginTop: "20px",
              width: "150px",
              display: "flex",
              margin: "0 auto",
            }}
          />
          <h1
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: "#962F33",
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Reportes Estudiantiles
          </h1>
        </span>
      </div>

      {/* Barra buscar por cédula */}
      <div className="col-md-10 mx-auto">
        <div className="input-group shadow-sm rounded-3">
          <span
            className="input-group-text bg-white border-end-0"
            style={{ marginTop: "10px", borderRadius: "0.5rem 0 0 0.5rem" }}
            id="buscar-addon"
          >
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="search"
            className="form-control border-start-0 busqueda-input"
            placeholder="Buscar por nombre, cédula, carrera..."
            aria-label="Buscar"
            aria-describedby="buscar-addon"
            style={{ marginTop: "10px" }}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de estudiantes */}
      <div
        style={{
          maxHeight: "450px",
          overflowY: "auto",
          minHeight: "300px",
          overflowX: "auto",
        }}
      >
        <table
          className="table w-full table-auto text-left tabla-estudiantes table-bordered hover"
          style={{
            tableLayout: "fixed",
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Foto</th>
              <th
                onClick={() => ordenarPor("nombre")}
                style={{ cursor: "pointer" }}
              >
                Nombres{" "}
                <span
                  style={{
                    color: columnaOrden === "nombre" ? "#000" : "#ccc",
                  }}
                >
                  {columnaOrden === "nombre" ? (ascendente ? "↑" : "↓") : "↕"}
                </span>
              </th>
              <th
                onClick={() => ordenarPor("apellido")}
                style={{ cursor: "pointer" }}
              >
                Apellidos{" "}
                <span
                  style={{
                    color: columnaOrden === "apellido" ? "#000" : "#ccc",
                  }}
                >
                  {columnaOrden === "apellido" ? (ascendente ? "↑" : "↓") : "↕"}
                </span>
              </th>
              <th>Correo</th>
              <th>Carrera</th>
              <th
                onClick={() => ordenarPor("nivel")}
                style={{ cursor: "pointer" }}
              >
                Nivel{" "}
                <span
                  style={{
                    color: columnaOrden === "nivel" ? "#000" : "#ccc",
                  }}
                >
                  {columnaOrden === "nivel" ? (ascendente ? "↑" : "↓") : "↕"}
                </span>
              </th>
              <th>Pais</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody className="celda">
            {estudiantesFiltrados.length > 0 ? (
              estudiantesFiltrados.map((est, index) => (
                <tr key={index}>
                  <td>{est.cedula}</td>
                  <td>{est.foto}</td>
                  <td>{est.nombre}</td>
                  <td>{est.apellido}</td>
                  <td>{est.correo}</td>
                  <td>{est.carrera}</td>
                  <td>{est.nivel}</td>
                  <td>{est.pais}</td>
                  <td>{est.ciudad}</td>
                  <td>{est.direccion}</td>
                  <td>{est.telefono}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} align="center">
                  No se encontraron estudiantes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Gráfico de barras */}
      <h2 style={{ marginTop: "40px" }}>Estudiantes por Carrera</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="carrera" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#6e1d21ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reportes;
