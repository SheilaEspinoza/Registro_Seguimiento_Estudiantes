import Acciones from "./Acciones";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  estudiantes: Estudiante[];
  onEliminar: (cedula: string) => void;
  onEditar: (estudiante: Estudiante) => void;
  onVerInfo: (estudiante: Estudiante) => void;
  onOrdenar?: (columna: keyof Estudiante) => void;
  columnaOrden?: keyof Estudiante | null;
  ascendente?: boolean;
  permitirOrden?: boolean;
  modo?: "completo" | "solo-info";
}

function TablaEstudiantes({
  estudiantes,
  onEliminar,
  onEditar,
  onVerInfo,
  onOrdenar,
  columnaOrden,
  ascendente = false,
  permitirOrden = false,
  modo = "completo",
}: Props) {
  // Ordenar estudiantes si se permite
  const estudiantesOrdenados =
    permitirOrden && columnaOrden
      ? [...estudiantes].sort((a, b) => {
          const valorA = a[columnaOrden];
          const valorB = b[columnaOrden];

          if (typeof valorA === "string" && typeof valorB === "string") {
            return ascendente
              ? valorA.localeCompare(valorB)
              : valorB.localeCompare(valorA);
          }

          if (typeof valorA === "number" && typeof valorB === "number") {
            return ascendente ? valorA - valorB : valorB - valorA;
          }

          return 0;
        })
      : estudiantes;

  return (
    <div className="d-flex justify-content-center">
      <table
        className="table table-bordered"
        style={{ tableLayout: "fixed", width: "90%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Cédula</th>

            <th
              style={{ width: "40%" }}
              onClick={() => onOrdenar?.("nombre")}
              role="button"
              tabIndex={0}
            >
              Nombre{" "}
              <span>
                {columnaOrden === "nombre" ? (ascendente ? "↑" : "↓") : "↕"}
              </span>
            </th>

            <th
              style={{ width: "40%" }}
              onClick={() => onOrdenar?.("apellido")}
              role="button"
              tabIndex={0}
            >
              Apellido{" "}
              <span>
                {columnaOrden === "apellido" ? (ascendente ? "↑" : "↓") : "↕"}
              </span>
            </th>

            <th style={{ width: "40%" }}>Carrera</th>

            <th
              style={{ width: "20%" }}
              onClick={() => onOrdenar?.("nivel")}
              role="button"
              tabIndex={0}
            >
              Nivel{" "}
              <span>
                {columnaOrden === "nivel" ? (ascendente ? "↑" : "↓") : "↕"}
              </span>
            </th>

            <th style={{ width: "50%" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantesOrdenados.map((e) => (
            <tr key={e.cedula}>
              <td className="text-center">{e.cedula}</td>
              <td>{e.nombre}</td>
              <td>{e.apellido}</td>
              <td>{e.carrera}</td>
              <td className="text-center">{e.nivel}</td>
              <td className="text-center">
                <Acciones
                  estudiante={e}
                  cedula={e.cedula}
                  onEliminar={onEliminar}
                  onEditar={onEditar}
                  onVerInfo={onVerInfo}
                  modo={modo}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEstudiantes;
