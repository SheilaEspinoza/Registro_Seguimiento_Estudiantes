import { useEffect, useState } from "react";
import "../App.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  LabelList,
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

  //Filtro Niveles y Carrera
  const [nivelSeleccionado, setNivelSeleccionado] = useState<string>("Todos");
  const [carreraSeleccionada, setCarreraSeleccionada] =
    useState<string>("Todas");

  const [mostrarModalGrafico, setMostrarModalGrafico] = useState(false);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState<
    "nivel" | "carrera" | null
  >(null);

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
          valor.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    )
    .filter((est) =>
      nivelSeleccionado === "Todos"
        ? true
        : est.nivel.toString() === nivelSeleccionado
    )
    .filter((est) =>
      carreraSeleccionada === "Todas"
        ? true
        : est.carrera === carreraSeleccionada
    )
    .sort((a, b) => {
      if (!columnaOrden) return 0;
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

  const nivelesDisponibles = Array.from(
    new Set(estudiantes.map((est) => est.nivel.toString()))
  ).sort((a, b) => parseInt(a) - parseInt(b));

  const carrerasDisponibles = Array.from(
    new Set(estudiantes.map((est) => est.carrera))
  ).sort((a, b) => a.localeCompare(b));

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

  const imprimirGrafico = () => {
    const contenido = document.getElementById("contenido-grafico");
    if (contenido) {
      const ventana = window.open("", "Imprimir", "width=800,height=600");
      if (ventana) {
        ventana.document.write("<html><head><title>Imprimir Gráfico</title>");
        ventana.document.write("</head><body >");
        ventana.document.write(contenido.innerHTML);
        ventana.document.write("</body></html>");
        ventana.document.close();
        ventana.print();
      }
    }
  };

  const exportarComoPNG = async () => {
    const elemento = document.getElementById("contenido-grafico");
    if (elemento) {
      const canvas = await html2canvas(elemento);
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "grafico.png";
      link.click();
    }
  };

  const exportarComoPDF = async () => {
    const elemento = document.getElementById("contenido-grafico");
    if (elemento) {
      const canvas = await html2canvas(elemento);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("grafico.pdf");
    }
  };

  return (
    <div className="expandir-components">
      <div className="container mt-3" style={{ maxWidth: "150%" }}>
        <h2 className="text-center mb-8">Reporte de Estudiantes</h2>

        {/* Campo de búsqueda */}
        <div className="d-flex justify-content-center">
          <div className="col-md-4" style={{ padding: "15px" }}>
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
          <div className="d-flex justify-content-center align-items-center mt-2 mb-3 gap-4 flex-wrap">
            {/* Filtro por nivel */}
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0">Filtrar por nivel:</label>
              <select
                className="form-select"
                style={{ width: "180px" }}
                value={nivelSeleccionado}
                onChange={(e) => setNivelSeleccionado(e.target.value)}
              >
                <option value="Todos">Todos los niveles</option>
                {nivelesDisponibles.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    Nivel {nivel}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por carrera */}
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0">Filtrar por carrera:</label>
              <select
                className="form-select"
                style={{ width: "200px" }}
                value={carreraSeleccionada}
                onChange={(e) => setCarreraSeleccionada(e.target.value)}
              >
                <option value="Todas">Todas las carreras</option>
                {carrerasDisponibles.map((carrera) => (
                  <option key={carrera} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </select>
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
            <button
              className="btn btn-outline-primary btn-sm mt-2 d-block mx-auto"
              onClick={() => {
                setGraficoSeleccionado("carrera");
                setMostrarModalGrafico(true);
              }}
            >
              Ver Detalle
            </button>
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
            <button
              className="btn btn-outline-primary btn-sm mt-2 d-block mx-auto"
              onClick={() => {
                setGraficoSeleccionado("nivel");
                setMostrarModalGrafico(true);
              }}
            >
              Ver Detalle
            </button>
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
      {mostrarModalGrafico && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Gráfico Detallado:{" "}
                  {graficoSeleccionado === "carrera"
                    ? "Estudiantes por Carrera"
                    : "Estudiantes por Nivel"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModalGrafico(false)}
                ></button>
              </div>
              <div className="modal-body" id="contenido-grafico">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={
                      graficoSeleccionado === "carrera"
                        ? datosGrafico
                        : datosGraficoNivel
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey={
                        graficoSeleccionado === "carrera" ? "carrera" : "nivel"
                      }
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="cantidad"
                      fill={
                        graficoSeleccionado === "carrera"
                          ? "#8884d8"
                          : "#d8e05bff"
                      }
                    >
                      <LabelList dataKey="cantidad" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-outline-info"
                  onClick={exportarComoPNG}
                >
                  <i className="bi bi-image me-2"></i> PNG
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={exportarComoPDF}
                >
                  <i className="bi bi-file-earmark-pdf me-2"></i> PDF
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarModalGrafico(false)}
                >
                  Cerrar
                </button>
                <button className="btn btn-success" onClick={imprimirGrafico}>
                  <i className="bi bi-printer me-2"></i> Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reportes;
