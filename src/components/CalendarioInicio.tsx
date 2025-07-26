import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarioInicio() {
  const [fecha, setFecha] = useState(new Date());

  const manejarCambio = (value: any) => {
    setFecha(value);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card p-3 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
        <h5 className="mb-3 text-center">Calendario</h5>
        <Calendar
          onChange={manejarCambio}
          value={fecha}
        />
      </div>
    </div>
  );
}

export default CalendarioInicio;