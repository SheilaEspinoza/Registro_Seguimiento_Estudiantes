import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from "framer-motion";

import 'react-calendar/dist/Calendar.css';

function CalendarioInicio() {
  const [fecha, setFecha] = useState(new Date());

  const manejarCambio = (value: any) => {
    setFecha(value);
  };

  return (
  <div className="d-flex justify-content-center mt-4">
    <motion.div
      className="card p-3 shadow-sm"
      style={{ backgroundColor: '#f8f9fa' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h5 className="mb-3 text-center">Calendario</h5>
      <Calendar
        onChange={manejarCambio}
        value={fecha}
      />
    </motion.div>
  </div>
);

}

export default CalendarioInicio;