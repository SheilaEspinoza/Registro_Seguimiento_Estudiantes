import "../App.css";

const Reportes = () => {
  return (
    <div className="reportes">
      <h1>Reportes de Estudiantes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí puedes agregar filas simuladas o dejarlo vacío */}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
