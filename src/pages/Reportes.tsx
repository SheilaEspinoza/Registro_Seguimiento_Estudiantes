import { useState } from "react";
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
    correo: "clopez@gmail.com",
    telefono: "0998877665",
    ciudad: "Cuenca",
    direccion: "Calle Luna 321",
    carrera: "Ingeniería",
    nivel: "2",
  },
];

//crea un estado para manejar la búsqueda de estudiantes y la funcion setBusqueda para actualizar el estado
// Filtra los estudiantes según el texto de búsqueda y genera un resumen por carrera para el gráfico
const Reportes = () => {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar estudiantes según el texto de búsqueda
  //estudiantes.filter() recorre el array de estudiantes y verifica si alguno de los valores del objeto estudiante incluye el texto de búsqueda
  //Object.values(est) obtiene todos los valores del objeto estudiante y some() verifica si al menos uno de esos valores incluye el texto de búsqueda
  //toLowerCase() convierte el texto a minúsculas para hacer una búsqueda insensible a mayúsculas/minúsculas
  //includes() verifica si el valor contiene el texto de búsqueda
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
    <div
      className="p-4"
      style={{ maxWidth: "1200px", margin: "0 auto", alignContent: "center" }}
    >
      <h1>Reporte de Estudiantes</h1>

      <input
        type="text"
        placeholder="Buscar por nombre, cédula, carrera..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          outline: "none",
          marginTop: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          width: "500px",
          height: "40px",
          borderRadius: "15px",
          fontSize: "15px",
          fontFamily: "sans-serif",
          transition: " 0.3s ease-in-out",
          boxShadow: "0px 4px 8px rgba(223, 214, 214, 0.8)",
        }}
      />
      <table
        className="table table-striped table-bordered table-hover"
        style={{
          flexWrap: "wrap",
          alignContent: "space-between",
          width: "990px",
          marginTop: "5px",
          backgroundClip: "padding-box",
          border: "1px solid #afa8a8ad",
          borderRadius: "15px",
          backgroundColor: "#ffffffff",
        }}
      >
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Carrera</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesFiltrados.length > 0 ? (
            estudiantesFiltrados.map((est, index) => (
              <tr key={index}>
                <td>{est.cedula}</td>
                <td>{est.nombres}</td>
                <td>{est.apellidos}</td>
                <td>{est.correo}</td>
                <td>{est.telefono}</td>
                <td>{est.ciudad}</td>
                <td>{est.direccion}</td>
                <td>{est.carrera}</td>
                <td>{est.nivel}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} align="center">
                No se encontraron estudiantes.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
