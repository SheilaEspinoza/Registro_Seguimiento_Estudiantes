import { useEffect, useState } from "react";
import type { Tarea } from "../types/Estudiante";


import CalendarioInicio from "../components/CalendarioInicio";
import Recordatorios from "../components/Recordatorios";
import "../App.css";

interface InicioProps {
  recordatorios: Tarea[];
  setRecordatorios: React.Dispatch<React.SetStateAction<Tarea[]>>;
}

const Inicio: React.FC<InicioProps> = ({ recordatorios, setRecordatorios }) => {
  const [saludo, setSaludo] = useState("");
  const [horaActual, setHoraActual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const nuevaHora = new Date();
      setHoraActual(nuevaHora);
      actualizarSaludo(nuevaHora);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const actualizarSaludo = (hora: Date) => {
    const horaDelDia = hora.getHours();
    if (horaDelDia >= 0 && horaDelDia < 12) {
      setSaludo("¡Buenos días!");
    } else if (horaDelDia >= 12 && horaDelDia < 18) {
      setSaludo("¡Buenas tardes!");
    } else {
      setSaludo("¡Buenas noches!");
    }
  };

  const obtenerImagen = () => {
    const hora = horaActual.getHours();
    if (hora >= 0 && hora < 12) {
      return "/img/dia.jpg";
    } else if (hora >= 12 && hora < 18) {
      return "/img/dia.jpg";
    } else {
      return "/img/dia.jpg";
    }
  };

  const formatoHora = horaActual.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <div
        style={{
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(201, 201, 201, 0.1)",
        }}
      >

      <div className="card mb-3 bienvenida-card espaciado-superior">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={obtenerImagen()} className="card-img" alt="Imagen_hora" />
          </div>

          <div className="col-md-8 d-flex flex-column justify-content-between">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h3 className="card-title">
                  ¡Bienvenido al Sistema de Registro de Estudiantes!
                </h3>
                <p className="card-text">{saludo}</p>
              </div>

              <div className="text-end">
                <h2>
                  <p className="hora-grande">{formatoHora}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <CalendarioInicio />
        </div>
        <div className="col-md-6">
          <Recordatorios
          recordatorios={recordatorios}
          setRecordatorios={setRecordatorios}
        />
        </div>
      </div>
   </div>
    </>
  );
};

export default Inicio;
