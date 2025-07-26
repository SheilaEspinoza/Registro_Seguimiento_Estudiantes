import { useEffect, useState } from "react";
import CalendarioInicio from "../components/CalendarioInicio";
import '../App.css';


const Inicio = () => {
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
    } 
    else if (horaDelDia >= 12 && horaDelDia < 18) {
      setSaludo("¡Buenas tardes!");
    } 
    else {
      setSaludo("¡Buenas noches!");
    }
  };

  const obtenerImagen = () => {
    const hora = horaActual.getHours();
    if (hora >= 0  && hora < 12){
      return "/img/dia.jpg";
    } 
    else if (hora >= 12 && hora < 18){
      return "/img/dia.jpg";
    }
    else {
      return "/img/noche.jpg";
    } 
  };

  const formatoHora = horaActual.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, //formato 24h
    /*
    Formato 12 h
    hour: "2-digit",
    minute: "2-digit",*/
  });

  const formatoFecha = horaActual.toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
  <>
    <div className="card mb-3 bienvenida-card">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={obtenerImagen()} className="card-img" alt="Imagen_hora" />
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div className="card-body d-flex justify-content-between align-items-start">
            <div>
              <h3 className="card-title">Sistema de Gestión de Estudiantes</h3>
              <p className="card-text">{saludo}</p>
            </div>

            <div className="text-end">
              <h1><p className="hora-grande">{formatoHora}</p></h1>
              <p className="card-text">{formatoFecha}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="calendario-pequeno">
      <CalendarioInicio />
    </div>
  </>
  );
}

export default Inicio;
