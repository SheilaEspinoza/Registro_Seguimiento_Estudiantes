import Acciones from "./Acciones";
import type { Estudiante } from "../types/Estudiante";
import { BsChevronUp, BsChevronDown, BsChevronExpand } from "react-icons/bs";

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
        className="table-estudiantes"
        style={{ tableLayout: "fixed", width: "90%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Cédula</th>

            <th
              style={{
                width: "40%",
                cursor: onOrdenar ? "pointer" : "default",
              }}
              onClick={() => onOrdenar && onOrdenar("nombre")}
              role={onOrdenar ? "button" : undefined}
              tabIndex={onOrdenar ? 0 : undefined}
            >
              Nombre{" "}
              {onOrdenar && (
                <span>
                  {columnaOrden === "nombre" ? (
                    ascendente ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )
                  ) : (
                    <BsChevronExpand />
                  )}
                </span>
              )}
            </th>

            <th
              style={{
                width: "40%",
                cursor: onOrdenar ? "pointer" : "default",
              }}
              onClick={() => onOrdenar && onOrdenar("apellido")}
              role={onOrdenar ? "button" : undefined}
              tabIndex={onOrdenar ? 0 : undefined}
            >
              Apellido{" "}
              {onOrdenar && (
                <span>
                  {columnaOrden === "apellido" ? (
                    ascendente ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )
                  ) : (
                    <BsChevronExpand />
                  )}
                </span>
              )}
            </th>

            <th style={{ width: "40%" }}>Carrera</th>

            <th
              style={{
                width: "20%",
                cursor: onOrdenar ? "pointer" : "default",
              }}
              onClick={() => onOrdenar && onOrdenar("nivel")}
              role={onOrdenar ? "button" : undefined}
              tabIndex={onOrdenar ? 0 : undefined}
            >
              Nivel{" "}
              {onOrdenar && (
                <span>
                  {columnaOrden === "nivel" ? (
                    ascendente ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )
                  ) : (
                    <BsChevronExpand />
                  )}
                </span>
              )}
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
