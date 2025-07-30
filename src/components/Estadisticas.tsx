interface Props {
  total: number;
  porCarrera: Record<string, number>;
}

function Estadisticas({ total, porCarrera }: Props) {
  return (
    <div className="row mb-4">
      {/* Columna 1: Total */}
      <div className="col-md-6">
        <div className="estadistica-total text-center">
        Total estudiantes: <strong>{total}</strong>
        </div>
      </div>

       {/* Columna 2: Por carrera */}
      <div className="col-md-6">
        <h6 className="text-center">Estudiantes por carrera</h6>
        <ul className="list-group">
          {Object.entries(porCarrera).map(([carrera, cantidad]) => (
            <li
              key={carrera}
              className="estadistica-item d-flex justify-content-between align-items-center"
            >
              <span>{carrera}</span>
              <span className="badge bg-primary rounded-pill">{cantidad}</span>
            </li>
          ))}
       </ul>
      </div>
    </div>
  );
}

export default Estadisticas;

