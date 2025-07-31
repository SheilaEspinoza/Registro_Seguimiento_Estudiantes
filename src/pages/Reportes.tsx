import { useEffect, useState } from "react";
import "../App.css";

// }Importo el componente de tabla que muestra los estudiantes
import TablaEstudiantes from "../components/TablaEstudiantes";
import type { Estudiante } from "../types/Estudiante";
//Importo componentes de Recharts para generar los graficos
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

//Estados del componente
function Reportes() {
  //Lista de estudiantes
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  //Busqueda general
  const [busqueda, setBusqueda] = useState<string>("");

  // Columna seleccionada para ordenar
  const [columnaOrden, setColumnaOrden] = useState<keyof Estudiante | null>(
    null
  );
  //Ordenar por manera ascendente o desc
  const [ascendente, setAscendente] = useState<boolean>(true);

  //Cargamos datos de la base
  useEffect(() => {
    fetch("http://localhost:3001/api/estudiantes")
      .then((res) => res.json())
      .then((data) => setEstudiantes(data)) // Guarda los datos en el estado
      .catch((error) => console.error("Error al cargar estudiantes:", error));
  }, []);

  //Busqueda por Filtro
  const estudiantesFiltrados = [...estudiantes]
    .filter((est) =>
      Object.values(est).some(
        (valor) =>
          valor != null &&
          valor.toString().toLowerCase().includes(busqueda.toLowerCase()) //Busqueda general
      )
    )
    //Ordena
    .sort((a, b) => {
      // Si no hay columna seleccionada, no ordenar
      if (!columnaOrden) return 0;

      // Comparación alfabética para ordenar
      const valA = a[columnaOrden]?.toString().toLowerCase() || "";
      const valB = b[columnaOrden]?.toString().toLowerCase() || "";
      return ascendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  // Cambia la columna por la cual se ordena, y alterna entre asc/desc
  const ordenarPor = (col: keyof Estudiante) => {
    if (col === columnaOrden) {
      setAscendente(!ascendente);
    } else {
      setColumnaOrden(col);
      setAscendente(true);
    }
  };

  // Agrupo la cantidad de estudiantes por nivel
  const resumenPorNivel = estudiantes.reduce(
    (acc: { [key: string]: number }, est) => {
      const nivelStr = est.nivel.toString();
      acc[nivelStr] = (acc[nivelStr] || 0) + 1;
      return acc;
    },
    {}
  );

  // Formateo para usar en el graf
  const datosGraficoNivel = Object.entries(resumenPorNivel).map(
    ([nivel, cantidad]) => ({
      nivel,
      cantidad,
    })
  );

  // Resumen para el graf
  const resumenPorCarrera = estudiantes.reduce(
    (acc: { [key: string]: number }, est) => {
      acc[est.carrera] = (acc[est.carrera] || 0) + 1;
      return acc;
    },
    {}
  );

  //Formateo para usar en el graf
  const datosGrafico = Object.entries(resumenPorCarrera).map(
    ([carrera, cantidad]) => ({
      carrera,
      cantidad,
    })
  );

  return (
    <div className="expandir-components">
      <div className="container mt-3" style={{ maxWidth: "150%" }}>
        <h2 className="text-center mb-8">Reporte de Estudiantes</h2>

        {/* Campo de búsqueda */}
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

        {/* Tabla con datos , tuve q crear una condiocion en accion para q solo me muestre el icon de Ver Informacion y 
        otra condicion en la tabla de estudiantes para poder ver mas campos de la tabla */}
        <TablaEstudiantes
          estudiantes={estudiantesFiltrados}
          onOrdenar={true ? ordenarPor : undefined}
          columnaOrden={columnaOrden}
          ascendente={ascendente}
          onEliminar={(cedula) => {
            setEstudiantes(estudiantes.filter((e) => e.cedula !== cedula));
          }}
          modo="solo-info" //Muestra solo el boton de ver mas info
          modoReporte="completo" //Muestra todos los datos que agg
          onEditar={(estudiante) => {
            console.log("Editar estudiante:", estudiante);
          }}
        />

        {/* Gráficos en columnas , use grid para q sea responsivo*/}

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
