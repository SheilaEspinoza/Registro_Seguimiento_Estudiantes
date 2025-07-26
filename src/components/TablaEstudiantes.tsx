import type { Estudiante } from "../types/Estudiante";

interface Props {
  estudiantes: Estudiante[];
}

function TablaEstudiantes({ estudiantes }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>

            <th>Carrera</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, index) => (
            <tr key={index}>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>{est.cedula}</td>
              <td>{est.carrera}</td>
              <td>{est.nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEstudiantes;
