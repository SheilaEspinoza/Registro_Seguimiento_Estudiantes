import { useEffect, useState } from "react";

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

  const actualizarSaludo = (hora) => {
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
      return "/img/tarde.jpg";
    }
    else {
      return "/img/noche.jpg";
    } 
  };

  const formatoHora = horaActual.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formatoFecha = horaActual.toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card mb-3" style={{ maxWidth: "1000px" }}>
      <div className="row g-0">
        <div className="col-md-4">
            <img src={obtenerImagen()} className="card-img" alt="Imagen_segunDia" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Sistema de Gestión de Estudiantes</h5>
            <p className="card-text">{saludo}</p>
            <p className="card-text"><strong>Hora actual:</strong> {formatoHora}</p>
            <p className="card-text"><strong>Fecha:</strong> {formatoFecha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
