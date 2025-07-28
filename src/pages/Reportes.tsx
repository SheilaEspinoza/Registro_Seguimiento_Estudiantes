import { useState } from "react";
import "../App.css";
//Importamos clases de recharts para crear el gráfico
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
    nombres: "Juan",
    apellidos: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombres: "María",
    apellidos: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
  },
  {
    cedula: "1122334455",
    nombres: "Carlos",
    apellidos: "Lopez",
    correo: "clopezz@gmail.com",
    telefono: "0998877665",
    ciudad: "Cuenca",
    direccion: "Calle Luna 321",
    carrera: "Ingeniería",
    nivel: "2",
  },
  {
    cedula: "1234567890",
    nombres: "Juan",
    apellidos: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombres: "María",
    apellidos: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
  },
  {
    cedula: "1122334455",
    nombres: "Carlos",
    apellidos: "Lopez",
    correo: "clopezz@gmail.com",
    telefono: "0998877665",
    ciudad: "Cuenca",
    direccion: "Calle Luna 321",
    carrera: "Ingeniería",
    nivel: "2",
  },
  {
    cedula: "1234567890",
    nombres: "Juan",
    apellidos: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombres: "María",
    apellidos: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
  },
  {
    cedula: "1122334455",
    nombres: "Carlos",
    apellidos: "Lopez",
    correo: "clopezz@gmail.com",
    telefono: "0998877665",
    ciudad: "Cuenca",
    direccion: "Calle Luna 321",
    carrera: "Ingeniería",
    nivel: "2",
  },
  {
    cedula: "1234567890",
    nombres: "Juan",
    apellidos: "Pérez",
    correo: "juanp@gmail.com",
    telefono: "0991234567",
    ciudad: "Quito",
    direccion: "Av. Siempre Viva 123",
    carrera: "Ingeniería",
    nivel: "3",
  },
  {
    cedula: "0987654321",
    nombres: "María",
    apellidos: "Gómez",
    correo: "maria.g@gmail.com",
    telefono: "0987654321",
    ciudad: "Guayaquil",
    direccion: "Calle Falsa 456",
    carrera: "Medicina",
    nivel: "2",
  },
  {
    cedula: "1122334455",
    nombres: "Carlos",
    apellidos: "Lopez",
    correo: "clopezz@gmail.com",
    telefono: "0998877665",
    ciudad: "Cuenca",
    direccion: "Calle Luna 321",
    carrera: "Ingeniería",
    nivel: "2",
  },
];

const Reportes = () => {
  const [busqueda, setBusqueda] = useState("");

  const estudiantesFiltrados = estudiantes.filter((est) =>
    Object.values(est).some((valor) =>
      valor.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  // Contar estudiantes por carrera para el gráfico
  const resumenPorCarrera = estudiantes.reduce<Record<string, number>>(
    (acc, est) => {
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
    <>
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
        </div>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#800606ff",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Reportes Estudiantiles
        </h1>
        <div>
          <input
            className="busqueda-input"
            type="text"
            placeholder="Buscar por nombre, cédula, carrera..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Carrera</th>
                <th>Nivel</th>
                <th>Pais</th>
                <th>Ciudad</th>
                <th>Direccion</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody className="celda">
              {estudiantesFiltrados.length > 0 ? (
                estudiantesFiltrados.map((est, index) => (
                  <tr key={index}>
                    <td>{est.cedula}</td>
                    <td>{est.nombres}</td>
                    <td>{est.apellidos}</td>
                    <td>{est.correo}</td>
                    <td>{est.carrera}</td>
                    <td>{est.nivel}</td>
                    <td>{/* Pais column, value missing in data */}</td>
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
    </>
  );
};

export default Reportes;
