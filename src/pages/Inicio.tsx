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
      return "/img/tarde.jpg";
    } else {
      return "/img/noche.jpg";
    }
  };

  const formatoHora = horaActual.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="expandir-components">
        <div className="card bienvenida-card espaciado-superior">
          <div className="row g-0">
           <div className="col-md-4">
             <img src={obtenerImagen()} className="card-img bienvenida-img" alt="Imagen_hora" />
           </div>

            <div className="col-md-8 d-flex">
              <div className="card-body d-flex justify-content-between align-items-center w-100">
                <div>
                  <h3 className="card-title">
                   ¡Bienvenido al Sistema de Información Académico Universitario!
                  </h3>
                  <p className="card-text saludo-text">{saludo}</p>
                </div>

                <div className="text-end">
                  <p className="hora-grande">{formatoHora}</p>
                </div>
             </div>
           </div>
         </div>
        </div>

       <div className="row">
        <div className="col-md-6">
          <CalendarioInicio />
        </div>
        <div className="col-md-12 col-lg-6">
          <Recordatorios
          recordatorios={recordatorios}
          setRecordatorios={setRecordatorios}
        />
        </div>
      </div>
  </div>

  );
};

export default Inicio;
