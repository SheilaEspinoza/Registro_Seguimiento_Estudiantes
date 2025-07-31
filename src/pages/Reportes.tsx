import { useEffect, useState, useRef } from "react";
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

  // Para modal de información
  const modalInfoRef = useRef<HTMLDivElement>(null);
  const [modalInfoInstance, setModalInfoInstance] = useState<any>(null);
  const [estudianteInfo, setEstudianteInfo] = useState<Estudiante | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/estudiantes")
      .then((res) => res.json())
      .then((data) => setEstudiantes(data))
      .catch((error) => console.error("Error al cargar estudiantes:", error));
  }, []);

  useEffect(() => {
    if (modalInfoRef.current) {
      const instance = new window.bootstrap.Modal(modalInfoRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setModalInfoInstance(instance);
    }
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

  const abrirModalDeCredencial = (est: Estudiante) => {
    setEstudianteInfo(est);
    modalInfoInstance?.show();
  };

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

      <TablaEstudiantes
        estudiantes={estudiantesFiltrados}
        onOrdenar={ordenarPor}
        columnaOrden={columnaOrden}
        ascendente={ascendente}
        onEliminar={(cedula) => {
          setEstudiantes(estudiantes.filter((e) => e.cedula !== cedula));
        }}
        modo="solo-info"
        onVerInfo={abrirModalDeCredencial}
        onEditar={() => {}}
      />

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

      {/* Modal Información */}
      <div
        className="modal fade"
        id="modalInfoEstudiante"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalInfoRef}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable modal-ajustado">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Información del Estudiante</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modalInfoInstance?.hide()}
              ></button>
            </div>
            <div className="modal-body">
              {estudianteInfo ? (
                <>
                  <div className="text-center mb-3">
                    <img
                      src={
                        estudianteInfo.foto
                          ? `http://localhost:3001/uploads/${estudianteInfo.foto}`
                          : "/img/null.jpg"
                      }
                      alt="Foto Estudiante"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Cédula:</strong> {estudianteInfo.cedula}
                    </li>
                    <li className="list-group-item">
                      <strong>Nombre:</strong> {estudianteInfo.nombre}{" "}
                      {estudianteInfo.apellido}
                    </li>
                    <li className="list-group-item">
                      <strong>Correo:</strong> {estudianteInfo.correo}
                    </li>
                    <li className="list-group-item">
                      <strong>Carrera:</strong> {estudianteInfo.carrera}
                    </li>
                    <li className="list-group-item">
                      <strong>Nivel:</strong> {estudianteInfo.nivel}
                    </li>
                    <li className="list-group-item">
                      <strong>País:</strong> {estudianteInfo.pais}
                    </li>
                    <li className="list-group-item">
                      <strong>Ciudad:</strong> {estudianteInfo.ciudad}
                    </li>
                    <li className="list-group-item">
                      <strong>Dirección:</strong> {estudianteInfo.direccion}
                    </li>
                    <li className="list-group-item">
                      <strong>Teléfono:</strong> {estudianteInfo.telefono}
                    </li>
                  </ul>
                </>
              ) : (
                <p>No hay información para mostrar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
