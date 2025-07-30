import { useEffect, useState } from "react";
import "../App.css";
import TablaEstudiantes from "../components/TablaEstudiantes";
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

function Reportes() {
  // Estado para la lista de estudiantes (desde la base de datos)
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  // Estados para búsqueda, ordenamiento y filtros
  const [busqueda, setBusqueda] = useState<string>("");
  const [columnaOrden, setColumnaOrden] = useState<keyof Estudiante | null>(
    null
  );
  const [ascendente, setAscendente] = useState<boolean>(true);
  const [filtroCedula, setFiltroCedula] = useState("");

  // Cargar estudiantes desde la API al montar
  useEffect(() => {
    fetch("http://localhost:3001/api/estudiantes")
      .then((res) => res.json())
      .then((data) => setEstudiantes(data))
      .catch((error) => console.error("Error al cargar estudiantes:", error));
  }, []);

  // Ordenar y filtrar estudiantes
  const estudiantesFiltrados = [...estudiantes]
    .filter(
      (est) =>
        est.cedula.includes(filtroCedula) &&
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

  // Función para manejar el cambio de orden
  const ordenarPor = (col: keyof Estudiante) => {
    if (col === columnaOrden) {
      setAscendente(!ascendente);
    } else {
      setColumnaOrden(col);
      setAscendente(true);
    }
  };
  const abrirModalDeCredencial = (est: Estudiante) => {
    console.log("Ver info:", est); // temporalmente para pruebas
    // Aquí puedes abrir un modal o navegar a otra vista
  };

  // Resumen para el gráfico
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Reporte de Estudiantes</h2>

      {/* Inputs de búsqueda */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, apellido, etc."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
        />
      </div>

      {/* Tabla con datos */}
      <TablaEstudiantes
        estudiantes={estudiantesFiltrados}
        onOrdenar={true ? ordenarPor : undefined}
        columnaOrden={columnaOrden}
        ascendente={ascendente}
        onEliminar={(cedula) => {
          setEstudiantes(estudiantes.filter((e) => e.cedula !== cedula));
        }}
        modo="solo-info"
        onVerInfo={(e) => abrirModalDeCredencial(e)}
        onEditar={(estudiante) => {
          console.log("Editar estudiante:", estudiante);
        }}
      />

      {/* Gráfico por carrera */}
      <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
        <ResponsiveContainer>
          <BarChart data={datosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="carrera" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reportes;
