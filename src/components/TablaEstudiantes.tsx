import Acciones from "./Acciones";
import type { Estudiante } from "../types/Estudiante";

interface Props {
  estudiantes: Estudiante[];
  onEliminar: (cedula: string) => void;
}

function TablaEstudiantes({ estudiantes, onEliminar }: Props) {
  return (
  <div className="d-flex justify-content-center">
    <table
    className="table table-bordered"
    style={{ tableLayout: "fixed", width: "90%" }} 
     >
        <thead>
        <tr>
          <th style={{ width: "30%" }}>Cédula</th>
          <th style={{ width: "40%" }}>Nombre</th>
          <th style={{ width: "40%" }}>Apellido</th>
          <th style={{ width: "40%" }}>Carrera</th>
          <th style={{ width: "20%" }}>Nivel</th>
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
                <div className="d-flex justify-content-center">              
                  {est.nivel}
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Acciones
                   estudiante={est}
                   cedula={est.cedula}
                   onEliminar={onEliminar}
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
