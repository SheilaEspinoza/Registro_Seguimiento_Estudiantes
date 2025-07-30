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
            <th style={{ width: "40%" }} onClick={() => onOrdenar?.("nombre")}>
              Nombre
            </th>
            <th
              style={{ width: "40%" }}
              onClick={() => onOrdenar?.("apellido")}
            >
              Apellido
            </th>
            <th style={{ width: "40%" }}>Carrera</th>
            <th style={{ width: "20%" }} onClick={() => onOrdenar?.("nivel")}>
              Nivel
            </th>
            <th style={{ width: "50%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex justify-content-center">
                  {est.cedula}
                </div>
              </td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>{est.carrera}</td>
              <td>
                <div className="d-flex justify-content-center">{est.nivel}</div>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Acciones
                    estudiante={est}
                    cedula={est.cedula}
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    onVerInfo={onVerInfo}
                    modo={modo}
                    permitirOrden={permitirOrden}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEstudiantes;
