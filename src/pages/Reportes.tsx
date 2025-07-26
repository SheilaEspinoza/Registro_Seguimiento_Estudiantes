import "../App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const estudiantes = [
  { nombre: "Juan", promedio: 8.5 },
  { nombre: "Ana", promedio: 9.0 },
  { nombre: "Luis", promedio: 7.8 },
  { nombre: "María", promedio: 8.9 },
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
          <Bar dataKey="promedio" fill="#3b161eff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reportes;
