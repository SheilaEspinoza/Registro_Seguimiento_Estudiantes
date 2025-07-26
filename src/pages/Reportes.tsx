import "../App.css";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

// Example data for estudiantes
const estudiantes = [
  { nombre: "Juan", promedio: 85 },
  { nombre: "Ana", promedio: 92 },
  { nombre: "Luis", promedio: 78 },
  { nombre: "Maria", promedio: 88 },
];

const Reportes = () => {
  return (
    <div className="reportes">
      <h1>Reporte de Promedios</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={estudiantes}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="promedio" fill="#cea3acff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reportes;
