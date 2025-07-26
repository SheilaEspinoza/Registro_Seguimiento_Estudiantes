interface Props {
  total: number;
  porCarrera: Record<string, number>;
}

function Estadisticas({ total, porCarrera }: Props) {
  return (
    <div className="mt-4">
      <div className="alert alert-info">
        Total estudiantes: <strong>{total}</strong>
      </div>

      <h6>Estudiantes por carrera</h6>
      <ul className="list-group">
        {Object.entries(porCarrera).map(([carrera, cantidad]) => (
          <li key={carrera} className="list-group-item d-flex justify-content-between">
            <span>{carrera}</span>
            <span className="badge bg-primary rounded-pill">{cantidad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Estadisticas;

