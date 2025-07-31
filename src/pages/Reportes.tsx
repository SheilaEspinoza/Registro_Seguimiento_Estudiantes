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
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const [busqueda, setBusqueda] = useState<string>("");
  const [columnaOrden, setColumnaOrden] = useState<keyof Estudiante | null>(
    null
  );
  const [ascendente, setAscendente] = useState<boolean>(true);
  const [filtroCedula, setFiltroCedula] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/estudiantes")
      .then((res) => res.json())
      .then((data) => setEstudiantes(data))
      .catch((error) => console.error("Error al cargar estudiantes:", error));
  }, []);

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

  const ordenarPor = (col: keyof Estudiante) => {
    if (col === columnaOrden) {
      setAscendente(!ascendente);
    } else {
      setColumnaOrden(col);
      setAscendente(true);
    }
  };

  const resumenPorNivel = estudiantes.reduce(
    (acc: { [key: string]: number }, est) => {
      const nivelStr = est.nivel.toString();
      acc[nivelStr] = (acc[nivelStr] || 0) + 1;
      return acc;
    },
    {}
  );

  const datosGraficoNivel = Object.entries(resumenPorNivel).map(
    ([nivel, cantidad]) => ({
      nivel,
      cantidad,
    })
  );

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
    <div className="expandir-components">
      <div className="container mt-3">
        <h2 className="text-center mb-8">Reporte de Estudiantes</h2>
        <div className="d-flex justify-content-center">
          <div className="col-md-5" style={{ padding: "15px" }}>
            <div className="input-group search-estilo rounded">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por nombre, apellido, etc."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {/* Gráfico por carrera */}
          <div style={{ height: 300 }}>
            <h5 className="text-center mb-3">Estudiantes por Carrera</h5>
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

          {/* Gráfico por nivel */}
          <div style={{ height: 300 }}>
            <h5 className="text-center mb-3">Estudiantes por Nivel</h5>
            <ResponsiveContainer>
              <BarChart data={datosGraficoNivel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nivel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#d8e05bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
